import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import zod from "zod"
import bcrypt from 'bcrypt'
import prisma from "@repo/myDB/clients";
import { use } from "react";
const signInschema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const NEXTAUTH = {
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: 'Email', type: "text", placeholder: "enter your email" },
            password: {
                label: "Password", type: "password", placeholder: "Enter your password"
            }
        },
        async authorize(credentials: any) {
            const { success } = signInschema.safeParse(credentials);
            if (!success){
                console.error("ZOD FAILED");
                 return null;}
            const hasedPass = await bcrypt.hash(credentials.password, 10) //HASHING THE PASSWORD
            try {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    }
                })
                console.log(user)
                if (user) {
 // Compare plain password with stored hash
 const passwordValidation = await bcrypt.compare(credentials.password, user.password);                    if (passwordValidation) {
                        return {
                            id: user.id.toString(),
                            email: user.email
                        }
                    }
                    console.error("PASSWORD MISMATCh")
                    return null
                }
                else {
                    const res = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hasedPass
                        }
                    })
                    return {
                        id: res.id.toString(),
                        email: res.email
                    }
                }
            }
            catch (e) {
                console.error("ERROR")
                return null
            }

        }
    })],
    callbacks: {
        signIn: ({ user }) => {
            if (user.email == "kutta.com") return false;
            return true;
        }
        ,
        jwt: ({ token, user }) => {
            token.userId = token.sub
            // console.log(token)
            return token
        },
        session: ({ session, token, user }: any) => {
            if (session && session.user) {
                session.user.id = token.userId;
            }
            return session
        }
    }
    ,
    // pages: {
    //     signIn: '/signin'      //DEFAULT PAGE TO RENDER ON SCREEN DURING NEXTAUTH
    // },
    secret: process.env.NEXTAUTH_SECRET || "secret"    //SECRET JWT FROM .env file
}
