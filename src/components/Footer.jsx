// components/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-blue-400 mb-6 flex items-center">
              <i className="fas fa-star mr-3"></i>
              {t('footer_brand_name', 'المنصة الرائدة')}
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t(
                'footer_description',
                'المنصة المتكاملة التي تجمع كل خدماتك مع أعلى معايير الجودة والأمان'
              )}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="#"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">{t('footer_about_title', 'عن المنصة')}</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_about_links.about_us', 'من نحن')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_about_links.our_vision', 'رؤيتنا')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_about_links.blog', 'المدونة')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_about_links.news', 'الأخبار')}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">{t('footer_services_title', 'الخدمات')}</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_services_links.marketplace', 'البيع والشراء')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_services_links.consultations', 'الاستشارات')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_services_links.real_estate', 'العقارات')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_services_links.learning', 'التعلم والتطوير')}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">{t('footer_support_title', 'الدعم')}</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_support_links.contact_us', 'اتصل بنا')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_support_links.technical_support', 'الدعم الفني')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_support_links.faq', 'الأسئلة الشائعة')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_support_links.submit_complaint', 'تقديم شكوى')}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">{t('footer_legal_title', 'القانونية')}</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_legal_links.privacy_policy', 'سياسة الخصوصية')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_legal_links.terms_conditions', 'الشروط والأحكام')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_legal_links.refund_policy', 'سياسة الاسترداد')}
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                {t('footer_legal_links.user_agreement', 'اتفاقية المستخدم')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            {t('footer_copyright', '© 2024 المنصة الرائدة. جميع الحقوق محفوظة.')}
          </p>
          <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-400">
            {[
              t('footer_badges.0', '🔒 موقع آمن ومشفر'),
              t('footer_badges.1', '🏆 معتمد دولياً'),
              t('footer_badges.2', '⚡ أداء فائق'),
            ].map((badge, idx) => (
              <span key={idx}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
