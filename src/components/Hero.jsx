// components/Hero.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🌟 {t('hero_title', 'مرحباً بك في Super Platform')}
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t('hero_subtitle', 'المنصة الشاملة متعددة الخدمات لكل ما تحتاجه! تجربة مستخدم استثنائية مع تصميم عصري وأداء متميز')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-secondary text-lg px-8 py-4">
              <i className="fas fa-rocket ms-2"></i>
              {t('explore_services', 'استكشف الخدمات')}
            </button>
            <button className="btn-primary text-lg px-8 py-4">
              <i className="fas fa-user-plus ms-2"></i>
              {t('join_now', 'انضم الآن مجاناً')}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
          <div className="text-center">
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-sm">{t('active_users', 'مستخدم نشط')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">99.9%</div>
            <div className="text-sm">{t('uptime', 'وقت التشغيل')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm">{t('support', 'دعم فني')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.9★</div>
            <div className="text-sm">{t('rating', 'تقييم المستخدمين')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
