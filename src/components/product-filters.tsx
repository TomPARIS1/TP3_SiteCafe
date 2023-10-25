"use client";

import { FC, memo, useCallback } from "react";
import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "../types";
import { useForm } from "@mantine/form";
import { TextInput, Checkbox } from "@mantine/core";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "tp-kit/components";

type Props = {
  categories: ProductsCategoryData[];
  onChange: (values: ProductFiltersResult) => void;
};

const ProductFilters: FC<Props> = memo(function ({ categories, onChange }) {
  /**
   * Initializes the form with empty fields. Never let a field undefined to let react properly controls the inputs
   */
  const form = useForm<ProductFiltersResult>({
    initialValues: {
      search: "",
      categoriesSlugs: [],
    },
  });

  /**
   * Fired when form is submitted : send the form values to the parent component 
   */
  const handleSubmit = useCallback((values: ProductFiltersResult) => {
    onChange({
      categoriesSlugs: values.categoriesSlugs,
      search: values.search || undefined
    });
  }, [onChange]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-8 mt-16">
      {/* Search field */}
      <TextInput
        id="search-input"
        placeholder="Rechercher une boisson"
        icon={<MagnifyingGlass size={24} weight="duotone" className="text-brand" />}
        {...form.getInputProps("search")}
      />

      {/* Categories checkbox list */}
      <Checkbox.Group
        className="space-y-2"
        {...form.getInputProps("categoriesSlugs")}
      >
        {categories.map((cat) => (
          <Checkbox
            key={cat.id}
            id={cat.id.toString()}
            label={`${cat.name} (${cat.products.length})`}
            value={cat.slug}
          />
        ))}
      </Checkbox.Group>

      {/* Submit button */}
      <Button fullWidth type={"submit"}>
        Filtrer
      </Button>
    </form>
  );
});

ProductFilters.displayName = "ProductFilters";
export { ProductFilters };
