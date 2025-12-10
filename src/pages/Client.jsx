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
  console.log(diplomas, 'ssssssssssssssssssss')
  const initialValues = {
    first_name: "",
    second_name: "",
    third_name: "",
    fourth_name: "",
    identity_number: "",
    phone_number: "",
    email: "",
    sector: "",
    area: "",
    institute: "",
    diploma_id: "",
  };

const validationSchema = Yup.object({
  first_name: Yup.string()
    .min(3, "يجب أن يكون 3 أحرف على الأقل")
    .required("مطلوب"),

  second_name: Yup.string()
    .min(3, "يجب أن يكون 3 أحرف على الأقل")
    .required("مطلوب"),

  third_name: Yup.string()
    .min(3, "يجب أن يكون 3 أحرف على الأقل")
    .required("مطلوب"),

  fourth_name: Yup.string()
    .min(3, "يجب أن يكون 3 أحرف على الأقل")
    .required("مطلوب"),

  identity_number: Yup.string()
    .matches(/^\d{10}$/, "رقم الهوية يجب أن يكون 10 أرقام")
    .required("مطلوب"),

  phone_number: Yup.string()
    .matches(/^[+]?[\d\s-()]{10,15}$/, "رقم الهاتف غير صحيح")
    .required("مطلوب"),

  email: Yup.string()
    .email("بريد إلكتروني غير صالح")
    .required("مطلوب"),

  sector: Yup.string().required("مطلوب"),
  area: Yup.string().required("مطلوب"),
  institute: Yup.string().required("مطلوب"),
  diploma_id: Yup.string().required("اختيار الدبلوم مطلوب"),
});




  const handleSubmit = (values, { resetForm }) => {
    const name = `${values.first_name} ${values.second_name} ${values.third_name} ${values.fourth_name}`;
    const dataToSend = {
      ...values,
      name,         // إضافة الاسم الكامل
    };
    dispatch(createClient(dataToSend))
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الاؤل <span className="text-red-500">*</span></label>
                    <Field
                      name="first_name"
                      type="text"
                      placeholder="أدخل الاسم الاؤل"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الاب  <span className="text-red-500">*</span></label>
                    <Field
                      name="second_name"
                      type="text"
                      placeholder="أدخل الاسم الثانى"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="second_name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الجد  <span className="text-red-500">*</span></label>
                    <Field
                      name="third_name"
                      type="text"
                      placeholder="أدخل الاسم الثالث"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="third_name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">اسم العائلة  <span className="text-red-500">*</span></label>
                    <Field
                      name="fourth_name"
                      type="text"
                      placeholder="أدخل الاسم الرابع"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="fourth_name" component="div" className="text-red-500 text-sm mt-1" />
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الجوال  <span className="text-red-500">*</span></label>
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
                      <option value=""> اختر قطاع</option>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">المدينة <span className="text-red-500">*</span></label>
                   
                       <div className="form-group">
                    <Field
                      name="area"
                      type="text"
                      placeholder="أدخل اسم  المدينة"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="area" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      المعهد <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="institute"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">اختر المعهد</option>
                      <option value="1">معهد الفاو المتقدم العالي للتدريب</option>
                      <option value="2">معهد آفاق التطور العالي للتدريب</option>
                      <option value="3">معهد المورد الوافي العالي للتدريب</option>
                      <option value="4">المعهد الأهلي العالي للتدريب</option>
                      <option value="5">معهد القمة الدائمة العالي للتدريب</option>
                      <option value="6">معهد الفاو التخصصي العالي للتدريب</option>
                    </Field>
                    <ErrorMessage name="institute" component="div" className="text-red-500 text-sm mt-1" />
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


                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        الشهادات والدبلومات
                      </h2>

                      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                        {diplomas.map((diploma) => {
                          const selected = values.diploma_id === diploma.id;

                          return (
                            <div key={diploma.id} className="p-3 border rounded mb-2">

                              {/* اختيار الدبلوم */}
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name="diploma_id"
                                  value={diploma.id}
                                  checked={selected}
                                  onChange={() => {
                                    setFieldValue("diploma_id", diploma.id);

                                    // تعيين selectedType لو نوع ثابت
                                    if (diploma.type !== "hybrid") {
                                      setFieldValue("selectedType", diploma.type);
                                    } else {
                                      setFieldValue("selectedType", "");
                                    }
                                  }}
                                  className="mr-2"
                                />
                                {diploma.name}
                              </label>

                              {/* لو Hybrid → يظهر اختيار النوع */}
                              {selected && diploma.type === "hybrid" && (
                                <Field
                                  as="select"
                                  name="selectedType"
                                  className="mt-2 border px-2 py-1 rounded"
                                >
                                  <option value="">اختر النوع</option>
                                  <option value="hadiri">حضوري</option>
                                  <option value="online">أونلاين</option>
                                </Field>
                              )}

                              {/* لو ثابت النوع */}
                              {selected && diploma.type !== "hybrid" && (
                                <p className="text-sm mt-1">
                                  نوع التنفيذ:
                                  <strong>{diploma.type === "offline" ? " حضوري" : " أونلاين"}</strong>
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>





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
