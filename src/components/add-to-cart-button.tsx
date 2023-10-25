"use client";

import { FC, memo, useCallback, useState } from "react";
import { Button, type ButtonProps } from "tp-kit/components";
import { type ProductData } from "tp-kit/types";
import { addLine } from "../hooks/use-cart";
import { Loader } from '@mantine/core';

type Props = Pick<ButtonProps, 'variant' | 'fullWidth'> & { 
  product: ProductData;
};

const AddToCartButton: FC<Props> = memo(function ({ product, variant = 'ghost', fullWidth= true }) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleAddToCart = useCallback(async () => {
    setLoading(true);
    await addLine(product);
    setLoading(false);
  }, [product]);

  return (
    <Button variant={variant} fullWidth={fullWidth} onClick={handleAddToCart} disabled={isLoading} className="flex justify-center items-center gap-2">
      Ajouter au panier {isLoading && <Loader className="stroke-brand" size={18} />}
    </Button>
  );
});

AddToCartButton.displayName = "AddToCartButton";
export { AddToCartButton };
