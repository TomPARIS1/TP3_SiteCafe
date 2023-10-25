import { create } from "zustand";
import { type ProductData } from "tp-kit/types";
import { type ProductLineData, type CartData } from "../types";
import { useState } from "react";
import { wait } from "tp-kit/utils/wait";

export const useCart = create<CartData>(() => ({
  lines: [],
  count: 0,
}));

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 *
 * @param product
 */
export const addLine = async (product: ProductData) => {
  const {lines} = useCart.getState();

  // Cherche à récupérer la quantité d'une ligne si déjà présente dans le panier
  const i = lines.findIndex((l) => l.product.id === product.id);
  const qty = (lines[i]?.qty ?? 0) + 1;

  // Ajoute la nouvelle ligne si elle n'existe pas
  if (i < 0) {
    lines.push({ product, qty });
  }
  // Modifie la quantité de la ligne existante
  else {
    lines[i].qty = qty;
  }

  await wait(250);

  useCart.setState({ lines: [...lines], count: lines.length });
}

/**
 * Modifie une ligne produit du panier
 *
 * @param line
 */
export const updateLine = (line: ProductLineData) =>
  useCart.setState(({ lines }) => {
    const i = lines.findIndex((l) => l.product.id === line.product.id);
    if (i < 0)
      throw new Error(
        `Il n'y a pas de ligne dans le panier pour le produit ${line.product.id}`
      );

    lines[i].qty = line.qty;

    return { lines: [...lines] };
  });

/**
 * Supprime la ligne produit du panier
 *
 * @param productId
 * @returns
 */
export const removeLine = (productId: number) =>
  useCart.setState(({ lines }) => {
    const i = lines.findIndex((l) => l.product.id === productId);
    if (i < 0)
      throw new Error(
        `Il n'y a pas de ligne dans le panier pour le produit ${productId}`
      );

    delete lines[i];

    // Object.values() permet de supprimer les entrées `empty` (si on laisse le delete seul) ou `undefined` (si on avait utilisé [...lines])
    const updatedLines = Object.values(lines);

    return { lines: updatedLines, count: updatedLines.length };
  });

/**
 * Calcul le total du panier 
 * 
 * @param lines 
 * @returns 
 */
export const computeCartTotal = (lines: ProductLineData[]): number => {
  if (lines.length === 0) return 0;

  return lines.map((l) => l.product.price * l.qty).reduce((a, b) => a + b);
}
