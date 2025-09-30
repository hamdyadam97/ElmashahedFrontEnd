// components/Categories.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t('categories_title', 'فئات الخدمات المتميزة')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('categories_subtitle', 'اكتشف مجموعة شاملة من الخدمات المصممة خصيصاً لتلبية احتياجاتك')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* البيع والشراء */}
          <div className="card-hover service-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="relative z-10">
              <div className="text-5xl mb-6">🛍️</div>
              <h3 className="text-2xl font-bold mb-4">{t('category_marketplace_title', 'البيع والشراء')}</h3>
              <p className="opacity-90 mb-6 leading-relaxed">
                {t('category_marketplace_desc', 'منصة آمنة ومضمونة لبيع وشراء جميع المنتجات مع ضمان الجودة')}
              </p>
              <div className="flex items-center text-sm opacity-80">
                <i className="fas fa-shield-alt ms-2"></i>
                <span>{t('category_marketplace_feature', 'حماية كاملة للمشترين')}</span>
              </div>
            </div>
          </div>

          {/* الاستشارات المهنية */}
          <div className="card-hover service-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="relative z-10">
              <div className="text-5xl mb-6">👩‍⚕️</div>
              <h3 className="text-2xl font-bold mb-4">{t('category_consult_title', 'الاستشارات المهنية')}</h3>
              <p className="opacity-90 mb-6 leading-relaxed">
                {t('category_consult_desc', 'احصل على استشارات مهنية من خبراء متخصصين في جميع المجالات')}
              </p>
              <div className="flex items-center text-sm opacity-80">
                <i className="fas fa-certificate ms-2"></i>
                <span>{t('category_consult_feature', 'خبراء معتمدون')}</span>
              </div>
            </div>
          </div>

          {/* العقارات */}
          <div className="card-hover service-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="relative z-10">
              <div className="text-5xl mb-6">🏡</div>
              <h3 className="text-2xl font-bold mb-4">{t('category_realestate_title', 'العقارات')}</h3>
              <p className="opacity-90 mb-6 leading-relaxed">
                {t('category_realestate_desc', 'بيع وإيجار العقارات بسهولة مع أدوات بحث متقدمة')}
              </p>
              <div className="flex items-center text-sm opacity-80">
                <i className="fas fa-map-marker-alt ms-2"></i>
                <span>{t('category_realestate_feature', 'مواقع متميزة')}</span>
              </div>
            </div>
          </div>

          {/* التعلم والتطوير */}
          <div className="card-hover service-card" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <div className="relative z-10">
              <div className="text-5xl mb-6">📚</div>
              <h3 className="text-2xl font-bold mb-4">{t('category_learning_title', 'التعلم والتطوير')}</h3>
              <p className="opacity-90 mb-6 leading-relaxed">
                {t('category_learning_desc', 'دورات تعليمية ومهارات جديدة من أفضل المدربين')}
              </p>
              <div className="flex items-center text-sm opacity-80">
                <i className="fas fa-graduation-cap ms-2"></i>
                <span>{t('category_learning_feature', 'شهادات معتمدة')}</span>
              </div>
            </div>
          </div>

          {/* الشحن ومقارنة الأسعار */}
          <div className="card-hover service-card md:col-span-2" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#2d3748' }}>
            <div className="relative z-10">
              <div className="text-5xl mb-6">🚚</div>
              <h3 className="text-2xl font-bold mb-4">{t('category_shipping_title', 'الشحن ومقارنة الأسعار')}</h3>
              <p className="opacity-90 mb-6 leading-relaxed">
                {t('category_shipping_desc', 'خدمات الشحن السريع مع مقارنة أفضل الأسعار من عدة شركات شحن')}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm opacity-80">
                <div className="flex items-center">
                  <i className="fas fa-clock ms-2"></i>
                  <span>{t('category_shipping_speed', 'توصيل سريع')}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-dollar-sign ms-2"></i>
                  <span>{t('category_shipping_price', 'أفضل الأسعار')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;