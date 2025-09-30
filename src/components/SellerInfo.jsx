import React from "react";

const SellerInfo = ({ currentLang, seller }) => {
  if (!seller) return null;

  const t = {
    ar: {
      title: "معلومات البائع",
      verified: "بائع موثق ✓",
      rating: `⭐ ${seller.rating || '4.8'} (${seller.review_count || '2341'} تقييم)`,
      sold: `📦 ${seller.products_sold || '+5000'} منتج مباع`,
      member: `🕒 عضو منذ ${seller.date_joined || '2019'}`,
      description: seller.bio || "لا يوجد وصف.",
      visit: "زيارة المتجر",
      contact: "تواصل مع البائع",
      follow: "متابعة المتجر",
      statsTitle: "إحصائيات البائع",
      stat1: "تقييمات إيجابية",
      stat2: "متوسط الرد",
      stat3: "وقت الشحن",
      stat4: "معدل التسليم",
    },
    en: {
      title: "Seller Information",
      verified: "Verified Seller ✓",
      rating: `⭐ ${seller.rating || '4.8'} (${seller.review_count || '2341'} reviews)`,
      sold: `📦 ${seller.products_sold || '+5000'} products sold`,
      member: `🕒 Member since ${seller.date_joined || '2019'}`,
      description: seller.bio || "No description available.",
      visit: "Visit Store",
      contact: "Contact Seller",
      follow: "Follow Store",
      statsTitle: "Seller Statistics",
      stat1: "Positive Reviews",
      stat2: "Avg Response Time",
      stat3: "Shipping Time",
      stat4: "Delivery Rate",
    },
  }[currentLang || "ar"];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">{t.title}</h3>

      <div className="flex items-start gap-4">
        {/* Badge */}
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
  {seller.image ? (
    <img
      src={seller.image}
      alt={seller.full_name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white font-bold text-xl bg-blue-600 w-full h-full flex items-center justify-center rounded-full">
      {seller.full_name?.slice(0, 2).toUpperCase()}
    </span>
  )}
</div>


        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-lg font-semibold">{seller.full_name}</h4>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              {t.verified}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span>{t.rating}</span>
            <span>{t.sold}</span>
            <span>{t.member}</span>
          </div>

          <p className="text-gray-600 mb-4">{t.description}</p>

          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t.visit}
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
              {t.contact}
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
              {t.follow}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold mb-3">{t.statsTitle}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{seller.positive_reviews || '98%'}</div>
            <div className="text-sm text-gray-600">{t.stat1}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{seller.avg_response || '24 ساعة'}</div>
            <div className="text-sm text-gray-600">{t.stat2}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{seller.shipping_time || '1-2 يوم'}</div>
            <div className="text-sm text-gray-600">{t.stat3}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{seller.delivery_rate || '99.5%'}</div>
            <div className="text-sm text-gray-600">{t.stat4}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
