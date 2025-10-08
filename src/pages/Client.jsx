import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiplomas } from '../redux/slice/Diploma';
import { createClient } from "../redux/slice/Client";
import { useNavigate } from "react-router-dom";
// بيانات الدبلومات كمثال

const ClientForm = () => {
  const { diplomas = [], loading = false, error = null } =
    useSelector((state) => state.diploma || {});
  const dispatch = useDispatch();
  const navigate = useNavigate(); // تعريف navigate
  useEffect(() => {
    dispatch(fetchDiplomas());
  }, [dispatch]);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    name: "",
    identity_number: "",
    phone_number: "",
    email: "",
    sector: "",
    area: "",
    diplomas_ids: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    identity_number: Yup.string()
      .matches(/^\d{10}$/, "رقم الهوية يجب أن يكون 10 أرقام")
      .required("مطلوب"),
    phone_number: Yup.string()
      .matches(/^[+]?[\d\s-()]{10,15}$/, "رقم الهاتف غير صحيح")
      .required("مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
    sector: Yup.string().required("مطلوب"),
    area: Yup.string().required("مطلوب"),
  });



  const handleSubmit = (values, { resetForm }) => {
    dispatch(createClient(values))
      .unwrap()
      .then((data) => {
        setSuccess(true);       // إظهار رسالة النجاح
        resetForm();
        setTimeout(() => {
          setSuccess(false);    // إخفاء الرسالة
          navigate("/newclient", { state: { createdClient: data } });  // التوجيه بعد 5 ثواني
        }, 5000);
      })
      .catch((err) => {
        console.log("حدث خطأ عند إضافة المشهد:", err);
      });
  };

  return (
    <div className="gradient-bg min-h-screen py-8 px-4 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">إضافة مشهد جديد</h1>
          <p className="text-gray-600 text-lg">املأ البيانات التالية لإضافة مشهد جديد إلى النظام</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  المعلومات الشخصية
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="أدخل الاسم الكامل"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهوية <span className="text-red-500">*</span></label>
                    <Field
                      name="identity_number"
                      type="text"
                      placeholder="أدخل رقم الهوية (10 أرقام)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="identity_number" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
                    <Field
                      name="phone_number"
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني <span className="text-red-500">*</span></label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="أدخل البريد الإلكتروني"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">معلومات الموقع والعمل</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">القطاع <span className="text-red-500">*</span></label>
                    <Field
                      as="select"
                      name="sector"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                    <option value="">جميع القطاعات</option>
<option value="mod">وزارة الدفاع</option>
<option value="moi">وزارة الداخلية</option>
<option value="emergency_forces">قوات الطوارئ الخاصة</option>
<option value="security_forces">قوات أمن المنشآت</option>
<option value="passports">الإدارة العامة للجوازات</option>
<option value="industrial_security">الهيئة العليا لأمن الصناعي</option>
<option value="royal_guard">الحرس الملكي السعودي</option>
<option value="national_guard">وزارة الحرس الوطني</option>
<option value="civil_defense">الدفاع المدني</option>
<option value="special_security_forces">قوات الأمن الخاصة</option>
<option value="drug_control">المديرية العامة لمكافحة المخدرات</option>
<option value="prisons">المديرية العامة للسجون</option>
<option value="aramco">أرامكو السعودية</option>
<option value="environmental_security">القوات الخاصة للأمن البيئي</option>
                    </Field>
                    <ErrorMessage name="sector" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">المنطقة <span className="text-red-500">*</span></label>
                    <Field
                      as="select"
                      name="area"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">اختر المنطقة</option>
                      <option value="riyadh">الرياض</option>
                      <option value="makkah">مكة المكرمة</option>
                      <option value="madinah">المدينة المنورة</option>
                      <option value="qassim">القصيم</option>
                      <option value="eastern">المنطقة الشرقية</option>
                      <option value="asir">عسير</option>
                      <option value="tabuk">تبوك</option>
                      <option value="hail">حائل</option>
                      <option value="north_border">الحدود الشمالية</option>
                      <option value="jazan">جازان</option>
                      <option value="najran">نجران</option>
                      <option value="baha">الباحة</option>
                      <option value="jouf">الجوف</option>
                    </Field>
                    <ErrorMessage name="area" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>

              {/* Diplomas */}
              {loading ? (
                <p>...جاري تحميل الدبلومات</p>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">الشهادات والدبلومات</h2>
                  <div className="border border-gray-300 rounded-lg p-4 multi-select bg-gray-50">
                    

                    
                      <FieldArray name="diplomas_ids">
                        {({ push, remove, form }) => (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {diplomas.map((diploma) => {
                              const isChecked = form.values.diplomas_ids.includes(diploma.id);
                              return (
                                <label key={diploma.id} className="flex items-center p-3 bg-white rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                                  <input
                                    type="checkbox"
                                    className="ml-3 text-blue-600 focus:ring-blue-500"
                                    checked={isChecked}
                                    onChange={() => {
                                      if (isChecked) {
                                        remove(form.values.diplomas_ids.indexOf(diploma.id));
                                      } else {
                                        push(diploma.id);
                                      }
                                    }}
                                  />
                                  <span className="text-gray-700">{diploma.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </FieldArray>
                    
                    {values.diplomas_ids.length > 0 && (
                      <p className="mt-2 text-gray-600">
                        تم اختيار {values.diplomas_ids.length} دبلومات
                      </p>
                    )}
                  </div>
                </div>

              )}
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
                >
                  إضافة المشهد
                </button>
                <button
                  type="reset"
                  className="flex-1 bg-gray-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  إعادة تعيين
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {success && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <div>
               <h3 className="font-semibold">تم إضافة المشهد بنجاح!</h3>
                <p className="text-sm">سيتم التوجيه تلقائياً بعد 5 ثواني...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientForm;
