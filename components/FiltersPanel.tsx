import { FilterState } from '../types/restaurant';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { useState } from 'react';

// 根據 mockRestaurants.ts 的內容
const CATEGORY_OPTIONS = ['中式', '日式', '義式', '美式', '泰式', '韓式', '越南', '印度'];
const PRICE_OPTIONS = ['$', '$$', '$$$'];

interface Props {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FiltersPanel({ filters, onFilterChange, onApply, onReset }: Props) {
  
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (price: string) => {
    const newPrices = filters.priceRanges.includes(price)
      ? filters.priceRanges.filter((p) => p !== price)
      : [...filters.priceRanges, price];
    onFilterChange({ ...filters, priceRanges: newPrices });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="text-lg font-semibold w-full text-left">
          分類
        </CollapsibleTrigger>
        <CollapsibleContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {CATEGORY_OPTIONS.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={`cat-${category}`} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="text-lg font-semibold w-full text-left">
          價位
        </CollapsibleTrigger>
        <CollapsibleContent className="flex gap-4 pt-4">
          {PRICE_OPTIONS.map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${price}`}
                checked={filters.priceRanges.includes(price)}
                onCheckedChange={() => handlePriceChange(price)}
              />
              <label htmlFor={`price-${price}`} className="text-sm">
                {price}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="flex gap-4 pt-4">
        <Button onClick={onApply} className="flex-1 bg-[#E89BA8] hover:bg-[#D88A98]">
          套用篩選
        </Button>
        <Button onClick={onReset} variant="outline" className="flex-1">
          重設
        </Button>
      </div>
    </div>
  );
}
