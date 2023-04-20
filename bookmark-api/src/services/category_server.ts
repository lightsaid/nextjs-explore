import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

// 创建分类
export const createCategory = async (input: Prisma.CategoryCreateInput) => {
    let data = await prisma.category.create({
        data: input
    })

    return data
}

// 更新分类
export const updateCategory = async (where: Prisma.CategoryWhereUniqueInput, data: Prisma.CategoryUpdateInput) => {
    let result = await prisma.category.update({
        where, 
        data,
    })

    return result
}

// 删除分类
export const deleteCategory = async (id: number) => {
    let category = await prisma.category.delete({
        where: {id: id}
    })
    return category
}

// 获取所有分类，根据用户名Id
export const getCategories = async (uid: number) => {
    let list = await prisma.category.findMany({where: {userId: uid}, orderBy: {updatedAt: "desc"}})
    return list
}
