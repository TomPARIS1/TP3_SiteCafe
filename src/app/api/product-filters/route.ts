import { NextResponse, type NextRequest } from 'next/server'
import prisma from '../../../utils/prisma';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams?.get('search') as unknown as string
    const catego = searchParams?.getAll('cat') as unknown as string[]

    const params = {
        include: {
            products: {}
        },

        where :{

        }
    };

    if (search) {
        params.include.products = {
            where : {
                slug: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        }

    }

    if (catego) {
        if (catego.length>0) {
            params.where = {
                slug: {
                    in: catego
                }
            }
        }
    }

    const categ = (await prisma.productCategory.findMany(params)).filter(categ => categ.products.length!=0)

    const output = {
        "params": {
            "categoriesSlugs": catego,
            "search": search,
        },
        "categories": categ
    }
    return NextResponse.json(output);
}