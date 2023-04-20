import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

// 创建用户
export const createUser = async (input: Prisma.UserCreateInput) => {
    let data = await prisma.user.create({
        data: input
    })

    return data
}

// 更新用户
export const updateUser = async (where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) => {
    let result = await prisma.user.update({
        where,
        data,
    })

    return result
}

// findUniqueUser 根据unique字段查找用户
export const findUniqueUser = async (where: Prisma.UserWhereUniqueInput) => {
    let data = await prisma.user.findUnique({
        where
    })

    return data
}
