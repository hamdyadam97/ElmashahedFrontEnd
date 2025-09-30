// components/CTASection.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-gradient text-white section-padding">
      <div className="max-w-4xl mx-auto container-padding text-center visual-hierarchy">
        <h2 className="heading-lg mb-6">
          🚀 {t('cta_title', 'جاهز لبدء رحلتك معنا؟')}
        </h2>
        <p className="text-xl mb-12 opacity-90 leading-relaxed">
          {t('cta_subtitle', 'انضم إلى آلاف المستخدمين الراضين واكتشف عالماً جديداً من الخدمات المتميزة')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="btn-secondary text-lg px-10 py-4">
            <i className="fas fa-play ml-2"></i>
            {t('cta_demo_button', 'شاهد العرض التوضيحي')}
          </button>
          <button className="btn-primary text-lg px-10 py-4">
            <i className="fas fa-rocket ml-2"></i>
            {t('cta_start_button', 'ابدأ مجاناً الآن')}
          </button>
        </div>

        {/* Enhanced Social Proof */}
        <div className="mt-12 text-center opacity-80">
          <p className="text-sm mb-4">
            {t('cta_social_proof', 'ينضم إلينا يومياً أكثر من 100 مستخدم جديد')}
          </p>
          <div className="flex justify-center items-center space-x-4 space-x-reverse">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-white rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-blue-200 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-green-200 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-purple-200 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-pink-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                +50K
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
