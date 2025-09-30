// components/WhyChooseUs.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto container-padding visual-hierarchy">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-800 mb-6">
            {t("why_choose_title", "لماذا نحن الخيار الأفضل؟")}
          </h2>
          <p className="text-xl text-gray-600">
            {t("why_choose_subtitle", "مميزات تجعلنا الرقم واحد في المنطقة")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* بطاقة 1 */}
          <div
            className="card-hover bg-white p-8 rounded-2xl shadow-lg border border-gray-100 cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-layer-group text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">
              {t("why_choose_feature_1_title", "منصة شاملة ومتكاملة")}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t(
                "why_choose_feature_1_desc",
                "جميع الخدمات التي تحتاجها في مكان واحد مع واجهة موحدة وسهلة الاستخدام"
              )}
            </p>
            <div className="mt-4 flex items-center text-blue-600 font-medium">
              <span>{t("why_choose_feature_1_action", "اكتشف المزيد")}</span>
              <i className="fas fa-arrow-left mr-2"></i>
            </div>
          </div>

          {/* بطاقة 2 */}
          <div
            className="card-hover bg-white p-8 rounded-2xl shadow-lg border border-gray-100 cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">
              {t("why_choose_feature_2_title", "مدفوعات آمنة ومضمونة")}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t(
                "why_choose_feature_2_desc",
                "حماية كاملة لمعاملاتك المالية مع تشفير عالي المستوى وضمان استرداد الأموال"
              )}
            </p>
            <div className="mt-4 flex items-center text-green-600 font-medium">
              <span>{t("why_choose_feature_2_action", "تعرف على الأمان")}</span>
              <i className="fas fa-arrow-left mr-2"></i>
            </div>
          </div>

          {/* بطاقة 3 */}
          <div
            className="card-hover bg-white p-8 rounded-2xl shadow-lg border border-gray-100 cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-users text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">
              {t("why_choose_feature_3_title", "مقدمو خدمات موثوقون")}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t(
                "why_choose_feature_3_desc",
                "شركاء معتمدون وموثوقون مع تقييمات حقيقية من المستخدمين"
              )}
            </p>
            <div className="mt-4 flex items-center text-purple-600 font-medium">
              <span>{t("why_choose_feature_3_action", "تصفح الشركاء")}</span>
              <i className="fas fa-arrow-left mr-2"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
