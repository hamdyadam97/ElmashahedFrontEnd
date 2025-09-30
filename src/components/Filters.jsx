import React from 'react';
import { useTranslation } from "react-i18next";
const Filters = ({
  onSaleTypeChange,
  onSearch,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  maxPrice,
  categories = [],
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

      <div className="mb-6 relative">
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t("search")}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-3 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      {/* Sale Type */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">

          {t("SaleType")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onSaleTypeChange('all')}
            className="filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {t('All')}
          </button>
          <button
            onClick={() => onSaleTypeChange('sell')}
            className="filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {t('ForSale')}
          </button>
          <button
            onClick={() => onSaleTypeChange('rent')}
            className="filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {t('ForRent')}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.categoryTitle}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className="filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {t('All')}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className="filter-btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              {i18n.language === "ar" ? cat.name_ar : cat.name_en}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.priceTitle}</h3>
        <div className="flex items-center space-x-4 space-x-reverse">
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-gray-600 min-w-0">
            0 - {maxPrice}
          </span>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.sortTitle}</h3>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="name">{t("sortOptions.name")}</option>
          <option value="price-low">{t("sortOptions.priceLow")}</option>
          <option value="price-high">{t("sortOptions.priceHigh")}</option>
          <option value="rating">{t("sortOptions.rating")}</option>

        </select>
      </div>
    </div>
  );
};

export default Filters;
