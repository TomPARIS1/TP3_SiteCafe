"use client";
import {FC, memo, useEffect, useMemo, useState} from "react";
import {ProductFilters} from "./product-filters";
import {ProductsCategoryData} from "tp-kit/types";
import {ProductCardLayout, ProductGridLayout} from "tp-kit/components";
import {ProductFiltersResult} from "../types";
import {filterProducts} from "../utils/filter-products";
import Link from "next/link";
import {AddToCartButton} from "./add-to-cart-button";

type Props = {
    categories: ProductsCategoryData[];
    showFilters?: boolean
};

const ProductList: FC<Props> = memo(function ({categories, showFilters = false}) {
    const [filters, setFilters] = useState<ProductFiltersResult | undefined>();
    const [filteredCategories, setFilteredCategories] = useState<ProductsCategoryData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);

            const params = new URLSearchParams();
            if (filters) {
                if (filters.search) {
                    params.set('search', filters.search);
                }
                if (filters.categoriesSlugs.length > 0) {
                    filters.categoriesSlugs.forEach(cat => params.append('cat', cat));
                }
            }

            try {
                const response = await fetch(`/api/product-filters?${params.toString()}`);
                const data = await response.json();
                setFilteredCategories(data.categories);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredData();
    }, [filters]);

    return (
        <div className="flex flex-row gap-8">
            {/* Filters */}
            {showFilters && <div className="w-full max-w-[270px]">
                <ProductFilters categories={categories} onChange={setFilters}/>
            </div>}

            {/* Grille Produit */}
            <div className="flex-1 space-y-24">
                {filteredCategories.map((cat) => (
                    <section key={cat.id}>
                        <h2 className="text-lg font-semibold mb-8 tracking-tight">
                            <Link href={`/${cat.slug}`} className="link">{cat.name} ({cat.products.length})</Link>
                        </h2>

                        <ProductGridLayout products={cat.products}>
                            {(product) => (
                                <ProductCardLayout
                                    product={product}
                                    button={<AddToCartButton product={product}/>}
                                />
                            )}
                        </ProductGridLayout>
                    </section>
                ))}
            </div>
        </div>
    );
});

ProductList.displayName = "ProductList";
export {ProductList};
