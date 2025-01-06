// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import zod from "zod"
// import bcrypt from 'bcrypt'
// import prisma from "@repo/myprisma/clients";
// const signInschema = zod.object({
//     number: zod.string().length(10),
//     password: zod.string().min(6)
// })

// export const NEXTAUTH = {
//     providers: [CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//             number: { label: 'Phone number', type: "text", placeholder: "Enter your number" },
//             password: {
//                 label: "Password", type: "password", placeholder: "Enter your password"
//             }
//         },
//         async authorize(credentials: any) {
//             const zodres = signInschema.safeParse(credentials);
//             if (!zodres.success) {
//                 console.error("ZOD FAILED");
//                 // console.log(JSON.stringify(zodres))
//                 return null;
//             }
//             const hasedPass = await bcrypt.hash(credentials.password, 10) //HASHING THE PASSWORD
//             console.log(hasedPass)

//             const user = await prisma.user.findFirst({
//                 where: {
//                     number: credentials.number,
//                 }
//             })
//             console.log(user)
//             if (user) {
//                 // Compare plain password with stored hash
//                 const passwordValidation = await bcrypt.compare(credentials.password, user.password);
//                 if (passwordValidation) {
//                     return {
//                         id: user.id.toString(),
//                         name: user.name,
//                         number: user.number
//                     }
//                 }
//                 console.error("PASSWORD MISMATCh")
//                 return null
//             }
//             try {
//                 const res = await prisma.user.create({
//                     data: {
//                         number: credentials.number,
//                         password: hasedPass
//                     }
//                 })
//                 return {
//                     id: res.id.toString(),
//                     name: res.name || null,
//                     number: res.number
//                 }
//             }

//             catch (e) {
//                 console.error("ERROR")
//                 console.log(e)
//                 return null
//             }

//         }
//     })],
//     callbacks: {
//         // signIn: ({ user }) => {
//         //     if (user.number == "kutta.com") return false;
//         //     return true;
//         // }
//         // ,
//         // jwt: ({ token, user }) => {
//         //     token.userId = token.sub
//         //     // console.log(token)
//         //     return token
//         // },
//         session: ({ session, token, user }: any) => {
//             if (session && session.user) {
//                 session.user.id = token.sub;
//                 session.user.name = token.name;
//             }
//             return session
//         }
//     }
//     ,
//     // pages: {
//     //     signIn: '/signin'      //DEFAULT PAGE TO RENDER ON SCREEN DURING NEXTAUTH
//     // },
//     // secret: process.env.NEXTAUTH_SECRET || "secret"    //SECRET JWT FROM .env file
// }

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import prisma from "@repo/myDB/clients";

export const NEXTAUTH = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await prisma.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await prisma.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  