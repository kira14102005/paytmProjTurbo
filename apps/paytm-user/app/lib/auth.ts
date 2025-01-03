import { PrismaClient } from "@repo/myDB/clients";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../db";
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
            console.log(credentials)
            try {


                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password,
                    }
                })
                console.log(user)
                if (user) {
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                }
                else {
                    return {
                        id: "bad1",
                        name: "BOGUS",
                        email: "yshdhdnkkdsd"
                    }
                }
            }
            catch (e) {
                console.log("ERRORvyhh")
                return {
                    id: "bad1",
                    name: "BOGUS",
                    email: "yshdhdnkkdsd"
                }
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
    pages: {
        signIn: '/signin'      //DEFAULT PAGE TO RENDER ON SCREEN DURING NEXTAUTH
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"    //SECRET JWT FROM .env file
}
