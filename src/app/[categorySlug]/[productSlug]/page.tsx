import {
  BreadCrumbs,
  Button,
  FormattedPrice,
  ProductCardLayout,
  ProductGridLayout,
  ProductRating,
  ProductImage,
  SectionContainer,
} from "tp-kit/components";
import { NextPageProps } from "../../../types";
import { Metadata } from "next";
import {
  ProductAttribute,
  ProductAttributesTable,
} from "../../../components/product-attributes-table";
import prisma from "../../../utils/prisma";
import { notFound } from "next/navigation";


type Props = {
  categorySlug: string;
  productSlug: string;
};

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {not: slug}
            }
          }
        }
      }
    },
    where: {
      slug: slug
    }
  })
  return product;
}

export async function generateMetadata({
                                         params,
                                         searchParams,
                                       }: NextPageProps<Props>): Promise<Metadata> {
  const product = await getProduct(params.productSlug)

  if (!product) return {}
  return {
    title: product.name,
    description:
        product.desc ??
        `Succombez pour notre ${product.name} et commandez-le sur notre site !`,
  };
}

const productAttributes: ProductAttribute[] = [
  { label: "Intensité", rating: 3 },
  { label: "Volupté", rating: 2 },
  { label: "Amertume", rating: 1 },
  { label: "Onctuosité", rating: 4 },
  { label: "Instagramabilité", rating: 5 },
];

export default async function ProductPage({ params }: NextPageProps<Props>) {
  const product = await getProduct(params.productSlug)

  if (!product) notFound()
  return (
      <SectionContainer wrapperClassName="max-w-5xl">
        <BreadCrumbs
            className="my-8"
            items={[
              {
                label: "Accueil",
                url: "/",
              },
              {
                label: product.category.name,
                url: `/${product.category.slug}`,
              },
              {
                label: product.name,
                url: `/${product.path}`,
              },
            ]}
        />

        {/* Produit */}
        <section className="flex flex-col md:flex-row justify-center gap-8">
          {/* Product Image */}
          <div className="relative">
            <ProductImage
                {...product}
                priority
                className="rounded-lg sticky top-12 object-cover sm:aspect-video md:aspect-auto w-full md:w-[300px]"
            />
          </div>

          {/* Product body */}
          <div className="flex-1">
            <div className="prose prose-lg">
              {/* Product Name */}
              <h1>{product.name}</h1>

              {/* Product Rating */}
              <ProductRating value={4} size={18} />

              {/* Desc */}
              <p>{product.desc}</p>

              {/* Prix et ajout au panier */}
              <div className="flex justify-between items-center gap-8">
                <p className="!my-0 text-xl">
                  <FormattedPrice price={product.price} />
                </p>
                <Button variant={"primary"}>Ajouter au panier</Button>
              </div>
            </div>

            {/* Products attribute */}
            <ProductAttributesTable className="mt-6" data={productAttributes} />
          </div>
        </section>

        {/* Related products */}
        <section>
          <div className="mt-24">
            <div className="prose prose-lg mb-8">
              <h2>Vous aimerez aussi</h2>
            </div>

            <ProductGridLayout products={product.category.products}>
              {(product) => (
                  <ProductCardLayout
                      product={product}
                      button={
                        <Button variant="ghost" className="flex-1 !py-4">
                          Ajouter au panier
                        </Button>
                      }
                  />
              )}
            </ProductGridLayout>
          </div>
        </section>
        {/* /Related products */}
      </SectionContainer>
  );
}