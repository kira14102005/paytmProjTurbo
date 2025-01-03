"use server"
import { PrismaClient } from "@repo/myDB/clients";
const prisma = new PrismaClient();

export async function registerUser(data) {
  const { name, email, password } = data;
  return await prisma.user.create({
    data: { name, email, password },
  });
}
