import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.productCategory.deleteMany({})
    await prisma.product.deleteMany({})

    PRODUCTS_CATEGORY_DATA.map(async (productCateg) => {
        const categ = await prisma.productCategory.create({
            data: {
                id: productCateg.id,
                slug: productCateg.slug,
                name: productCateg.name
            }
        })


        productCateg.products.map(async (product) => {
            const productP = await prisma.product.create({
                data: {
                    id: product.id,
                    slug: product.slug,
                    path: product.path,
                    name: product.name,
                    desc: product.desc,
                    img: product.img,
                    price: product.price,
                    categoryId: productCateg.id,
                }
            })
        })
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })