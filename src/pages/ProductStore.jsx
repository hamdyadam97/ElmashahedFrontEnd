// pages/ProductStore.jsx

import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../redux/slice/Product';
import { useTranslation } from "react-i18next";
const ProductStore = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('name');
  const [saleType, setSaleType] = useState('all');
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { t, i18n } = useTranslation();
  const { categories = [], loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Reset products on filter change
  useEffect(() => {
    setPage(1);
    setAllProducts([]);
    setHasMore(true);
  }, [searchTerm, category, maxPrice, sortBy, saleType]);

  useEffect(() => {
    dispatch(fetchProducts({ searchTerm, category, maxPrice, sortBy, saleType, page }))
      .unwrap()
      .then((data) => {
        setAllProducts((prev) => [...prev, ...data.productList]);
        if (!data.next) setHasMore(false);
      });
  }, [dispatch, searchTerm, category, maxPrice, sortBy, saleType, page]);

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  if (loading && page === 1) {
    return <div className="text-center py-16 text-lg font-bold text-purple-600">   {t("...Loading products")}</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Filters
        onSaleTypeChange={setSaleType}
        onSearch={setSearchTerm}
        onCategoryChange={setCategory}
        onPriceChange={setMaxPrice}
        onSortChange={setSortBy}
        maxPrice={maxPrice}
        categories={categories}
      />
      <ProductGrid products={allProducts} />

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
             {t("loadMore")}
             
          </button>
        </div>
      )}
    </main>
  );
};


export default ProductStore;
