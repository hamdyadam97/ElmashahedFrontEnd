import { useState } from "react";

const tabs = ["description", "specs", "features", "reviews"];

const ProductTabs = ({ product, currentLang }) => {
  const [activeTab, setActiveTab] = useState("description");

  const translateTab = (tab) =>
    currentLang === "ar"
      ? {
          description: "الوصف التفصيلي",
          specs: "المواصفات التقنية",
          features: "المميزات",
          reviews: "التقييمات",
        }[tab]
      : {
          description: "Description",
          specs: "Specifications",
          features: "Features",
          reviews: "Reviews",
        }[tab];

  const isArabic = currentLang === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  const textAlign = isArabic ? "text-right" : "text-left";

  return (
    <div dir={direction} className="bg-white rounded-lg shadow-sm p-6 mb-8">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
            >
              {translateTab(tab)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className={`text-gray-700 ${textAlign}`}>
        {activeTab === "description" && (
          <p>{isArabic ? product.description_ar : product.description_en}</p>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.attributes_values?.map((attr, idx) => (
              <div key={idx} className="border p-3 rounded bg-gray-50">
                <strong className="block text-sm text-gray-800">
                  {isArabic ? attr.attribute_name_ar || attr.attribute_name : attr.attribute_name}
                </strong>
                <span className="text-sm text-gray-600">{attr.value}</span>
              </div>
            ))}
            {(!product.attributes_values || product.attributes_values.length === 0) && (
              <p>{isArabic ? "لا توجد مواصفات حالياً." : "No specifications available."}</p>
            )}
          </div>
        )}

        {activeTab === "features" && (
          <p>{isArabic ? product.features_ar : product.features_en}</p>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {product.reviews?.length > 0 ? (
              product.reviews.map((rev, idx) => (
                <div key={idx} className="p-4 border rounded bg-white shadow-sm">
                  <p className="font-semibold">{rev.user}</p>
                  <p className="text-yellow-500">{"⭐".repeat(rev.rating)}</p>
                  <p>{rev.comment}</p>
                </div>
              ))
            ) : (
              <p>{isArabic ? "لا توجد تقييمات بعد." : "No reviews yet."}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
