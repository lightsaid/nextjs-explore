import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

// 创建书签
export const createBookmark = async (input: Prisma.BookmarkCreateInput) => {
    let data = await prisma.bookmark.create({
        data: input
    })

    return data
}

// 更新书签
export const updateBookmark= async (where: Prisma.BookmarkWhereUniqueInput, data: Prisma.BookmarkUpdateInput) => {
    let result = await prisma.bookmark.update({
        where, 
        data,
    })

    return result
}

// 删除书签
export const deleteBookmark= async (id: number) => {
    let bookmark = await prisma.bookmark.delete({
        where: {id: id}
    })
    return bookmark
}

// 获取书签，根据用分类Id
export const getBookmarks = async (categoryId: number) => {
    let list = await prisma.bookmark.findMany({where: {categoryId: categoryId}, orderBy: {updatedAt: "desc"}})
    return list
}
