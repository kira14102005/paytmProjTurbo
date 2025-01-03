import { PrismaClient } from "@repo/myDB/clients";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const NEXTAUTH =  NextAuth({
    providers : [CredentialsProvider({
        name : "Email", 
        credentials :{
            email : {label : 'Email', type : "text" , placeholder : "enter your email"},
            password : {label : "Password" , type : "password" ,placeholder : "Enter your password"
            }
        },
        async authorize(credentials : any){
            console.log(credentials)
           try{ const prisma  = new PrismaClient();

            const user = await prisma.user.findFirst({
                where : {
                    email : credentials.email,
                    password : credentials.password,
                }
            })
            if(user){
                return {
                    id : user.id.toString(),
                    name : user.name,
                    email  : user.email
                }
            }
            else{
                return {
                    id : "1",
                    name : "BOGUS",
                    email : "yshdhdnkkdsd"
                }
            }
        }
        catch(e){
            return {
                id : "1" ,
                name : "BOGUS",
                email : "yshdhdnkkdsd"
            }
        }
           
        }
    })],
    callbacks :{
        signIn :({user})=>{
            if(user.email ==  "kutta.com")return false;
            return true;
        }
        ,
        jwt : ({token ,user}) =>{
            token.userId = token.sub
            console.log(token)
            return token
        },
        session : ({session , token ,user}:any)=>{
            if(session && session.user){
                session.user.id = token.userId;
            }
            return session
        }
    }
    ,
    // pages :{
    //     signIn : '/signin'      //DEFAULT PAGE TO RENDER ON SCREEN DURING NEXTAUTH
    // }
     secret : process.env.NEXTAUTH_SECRET      //SECRET JWT FROM .env file
})
