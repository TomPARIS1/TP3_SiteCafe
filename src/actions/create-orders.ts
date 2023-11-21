"use server"

import { clearCart } from "../hooks/use-cart";
import { ProductLineData } from "../types";
import prisma from "../utils/prisma";

export async function createOrder(lines : ProductLineData[]) {

    let total = 0;
    lines.forEach((line) => total += line.qty * line.product.price)

    if (lines.length > 0) {
        let result = await prisma.order.create({
            data : {
                createdAt: new Date(),
                lines: {
                    create: lines.map((line) => {
                        return {
                            productId: line.product.id,
                            subtotal: line.product.price*line.qty
                        }
                    })
                },
                total: total
            }
        });

    }
}