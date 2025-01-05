import { PrismaClient } from "@prisma/client"



async function main() {
    const prisma  = new PrismaClient()
    const r= await prisma.user.create({
        data : {
            number :  "1111111111",
            password  : "harshit"
        }
    })
    console.log(r)
}
main()