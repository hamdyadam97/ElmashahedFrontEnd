import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { t, i18n } = useTranslation(); // ناخد اللغة من هنا مباشرة
  const lang = i18n.language;

  const title = lang === "ar" ? product.title_ar : product.title_en;
  const description = lang === "ar" ? product.description_ar : product.description_en;
  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

      {/* التقييم */}
      {/* <div className="flex items-center mb-4">
        <div className="flex text-yellow-400 ml-2">⭐⭐⭐⭐⭐</div>
        <span className="text-gray-600">{lang === "ar" ? "(127 تقييم)" : "(127 Reviews)"}</span>
      </div> */}

      {/* السعر */}
      <div className="mb-6">
        <span className="text-3xl font-bold text-blue-600">
          {product.price}{t("ryal")}
        </span>
      </div>

      <div className="mb-6">
        <span className="text-3l">
          {description}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">{t("color")}</h3>
        <div className="flex gap-2">
          {product.color === "red" && (
            <button className="w-8 h-8 bg-red-600 rounded-full border-2 border-gray-300"></button>
          )}

          {product.color === "black" && (
            <button className="w-8 h-8 bg-black rounded-full border-2 border-blue-500"></button>
          )}

          {product.color === "green" && (
            <button className="w-8 h-8 bg-green-600 rounded-full border-2 border-gray-300"></button>
          )}
        </div>
      </div>

      {/* الكمية */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          {lang === "ar" ? "الكمية:" : "Quantity:"}
        </label>
        <div className="flex items-center gap-2">
          <button onClick={handleDecrease} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">-</button>
          <span className="px-4 py-1 border border-gray-300 rounded">{quantity}</span>
          <button onClick={handleIncrease} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">+</button>
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
          {lang === "ar" ? "إضافة للسلة" : "Add to Cart"}
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">❤️</button>
      </div>

      {/* معلومات إضافية */}
      {/* <div className="text-sm text-gray-600">
        <p className="mb-2">
          ✅ {lang === "ar" ? "شحن مجاني للطلبات أكثر من 200 ريال" : "Free shipping for orders over 200 SAR"}
        </p>
        <p className="mb-2">
          🚚 {lang === "ar" ? "التوصيل خلال 2-3 أيام عمل" : "Delivery within 2-3 business days"}
        </p>
        <p>
          ↩️ {lang === "ar" ? "إمكانية الإرجاع خلال 30 يوم" : "30-day return policy"}
        </p>
      </div> */}
    </div>
  );
};

export default ProductInfo;
