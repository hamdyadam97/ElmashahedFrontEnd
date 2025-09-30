import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../redux/slice/Auth";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [profilePreview, setProfilePreview] = useState(null);

  const initialValues = {
    full_name: "",
    email: "",
    identity_number: "",
    branch: "",
    profilePicture: null,
    password:""
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("مطلوب"),
    email: Yup.string().email("بريد غير صالح").required("مطلوب"),
    identity_number: Yup.string()
      .matches(/^[12]\d{9}$/, "رقم الهوية غير صالح")
      .required("مطلوب"),
    branch: Yup.string().required("مطلوب"),
    profilePicture: Yup.mixed().required("مطلوب"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("profilePicture", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    dispatch(signupUser(formData));

    resetForm();
    setProfilePreview(null);
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Left side */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
            <div className="text-center text-white">
              <svg className="w-32 h-32 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H11V21H5V19H7V17H5V15H9V13H5V11H7V9H5V7H13V9H21ZM15 15V13H17V11H19V13H21V15H19V17H17V15H15ZM13 17H15V19H13V17Z" />
              </svg>
              <h2 className="text-3xl font-bold mb-4">انضم لمجتمعنا</h2>
              <p className="text-lg opacity-90">أنشئ حسابك وابدأ رحلتك معنا اليوم!</p>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">إنشاء حساب</h3>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form className="space-y-4">
                    {/* Profile Picture */}
                    <div className="text-center mb-6">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden mx-auto">
                          {profilePreview ? (
                            <img src={profilePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          )}
                        </div>
                        <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                          </svg>
                        </label>
                        <input
                          type="file"
                          id="profilePicture"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                        />
                      </div>
                      <ErrorMessage name="profilePicture" component="div" className="text-red-500 text-sm mt-1" />
                      <p className="text-sm text-gray-500 mt-2">ارفع صورة الملف الشخصي</p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                      <Field name="full_name" type="text" placeholder="أدخل اسمك الكامل"
                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                      <ErrorMessage name="full_name" component="div" className="text-red-500 text-sm mt-1"/>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                      <Field name="email" type="email" placeholder="أدخل بريدك الإلكتروني"
                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
                    </div>

                    {/* Identity Number */}
                    <div>
                      <label htmlFor="identity_number" className="block text-sm font-medium text-gray-700 mb-1">رقم الهوية</label>
                      <Field name="identity_number" type="text" placeholder="أدخل رقم الهوية"
                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                      <ErrorMessage name="identity_number" component="div" className="text-red-500 text-sm mt-1"/>
                    </div>



                    {/* Branch */}
                    <div>
                      <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">الفرع</label>
                      <Field as="select" name="branch"
                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
                        <option value="">اختر فرعك</option>
                         <option value="">اختر فرعك</option>
  <option value="riyadh">فرع الرياض</option>
  <option value="jeddah">فرع جدة</option>
  <option value="dammam">فرع الدمام</option>
                      </Field>
                      <ErrorMessage name="branch" component="div" className="text-red-500 text-sm mt-1"/>
                    </div>

                     {/* Full Name */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1"> البسورد</label>
                      <Field name="password" type="text" placeholder="أدخل  الباسورد"
                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
                    </div>

                    {/* Submit */}
                    <button type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
                    </button>

                    {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                    {success && <p className="text-green-600 mt-4 text-center">تم إنشاء الحساب بنجاح!</p>}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
