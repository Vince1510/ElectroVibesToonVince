import React from "react";
import Filter from "../components/Filter";

const FilterPanel = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedSpecs,
  setSelectedSpecs,
  handleSortChange,
}) => {
  return (
    <Filter
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      selectedBrands={selectedBrands}
      setSelectedBrands={setSelectedBrands}
      selectedSpecs={selectedSpecs}
      setSelectedSpecs={setSelectedSpecs}
      handleSortChange={handleSortChange}
    />
  );
};

export default FilterPanel;