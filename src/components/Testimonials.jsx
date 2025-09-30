// components/Testimonials.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const testimonials = [
  {
    initial: "أ",
    nameKey: "testimonial_1_name",
    roleKey: "testimonial_1_role",
    rating: 5,
    commentKey: "testimonial_1_comment",
    bgGradient: "from-blue-500 to-blue-600",
  },
  {
    initial: "ف",
    nameKey: "testimonial_2_name",
    roleKey: "testimonial_2_role",
    rating: 5,
    commentKey: "testimonial_2_comment",
    bgGradient: "from-pink-500 to-pink-600",
  },
  {
    initial: "م",
    nameKey: "testimonial_3_name",
    roleKey: "testimonial_3_role",
    rating: 5,
    commentKey: "testimonial_3_comment",
    bgGradient: "from-green-500 to-green-600",
  },
  {
    initial: "س",
    nameKey: "testimonial_4_name",
    roleKey: "testimonial_4_role",
    rating: 5,
    commentKey: "testimonial_4_comment",
    bgGradient: "from-purple-500 to-purple-600",
  },
];

const Testimonials = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 visual-hierarchy">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t("testimonials_title", "ماذا يقول عملاؤنا؟")}
          </h2>
          <p className="text-xl text-gray-600">
            {t("testimonials_subtitle", "آراء حقيقية من مستخدمين راضين")}
          </p>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          grabCursor={true}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          {testimonials.map(
            ({ initial, nameKey, roleKey, rating, commentKey, bgGradient }, idx) => (
              <SwiperSlide
                key={idx}
                style={{ width: "384px" }} // min-w-96
                className="testimonial-card bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${bgGradient} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {initial}
                  </div>
                  <div className="mr-4">
                    <div className="font-bold text-gray-800">{t(nameKey)}</div>
                    <div className="text-sm text-gray-500">{t(roleKey)}</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-xl mb-4">{'⭐️'.repeat(rating)}</div>
                <p className="text-gray-700 leading-relaxed">"{t(commentKey)}"</p>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
