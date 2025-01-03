"use server"

import prisma from "@repo/myDB/clients";


export async function registerUser(data) {
  const { name, email, password } = data;
  return await prisma.user.create({
    data: { name, email, password },
  });
}
