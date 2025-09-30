import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ products, currentLang }) => {
  const navigate = useNavigate();
 const { t, i18n } = useTranslation();
  if (!products.length) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
         
           {t("NoProductsFound")}
        </h3>
        <p className="text-gray-500">
          {t("Trychangingyoursearchorfiltercriteria")}
          
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="products-grid">
      {products.map((product) => {
        const title = currentLang === 'ar' ? product.title_ar : product.title_en;
        const description = currentLang === 'ar' ? product.description_ar : product.description_en;
        const imageUrl = product.image || 'https://via.placeholder.com/300x200?text=No+Image';

        return (
          <div
            key={product.id}
            className="product-card bg-white rounded-xl shadow-lg overflow-hidden fade-in"
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-purple-600">
                  {product.price} {t("ryal")}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-gray-600 mr-1">{product.rating || 0}</span>
                </div>
              </div>

              {/* الزرين */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="w-1/2 bg-white border border-blue-600 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 transition-all"
                >
                 
                   {t("Details")}
                </button>
                <button
                  onClick={() => {
                   
                   
                  }}
                  className="w-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
           
                   {t("AddtoCart")}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
