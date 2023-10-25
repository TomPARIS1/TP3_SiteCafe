import { type ProductData, type ProductsCategoryData } from "tp-kit/types"

export type ProductFiltersResult = {
  categoriesSlugs : string[],
  search?: string,
};

export type NextPageProps<T = Record<string, string>> = {
  /**
   * The path parameters received 
   * e.g. : page/[slug] --> params.slug
   */
  params: T,
  /**
   * The HTTP query parameters received
   * e.g. : my-page?page=1&order=asc --> searchParams.page and searchParams.order
   */
  searchParams: { [key: string]: string | string[] | undefined }
};

export type ProductLineData = {
  product: ProductData,
  qty: number
};

export type CartData = {
  lines: ProductLineData[],
  count: number,
}