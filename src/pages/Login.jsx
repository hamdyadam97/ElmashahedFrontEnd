import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../redux/slice/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const initialValues = {
    identifier: "",
    password: ""
  };




  const validationSchema = Yup.object({
    identifier: Yup.string()
      .required("مطلوب")
      .test(
        "email-or-id",
        "يجب إدخال بريد إلكتروني صحيح أو رقم هوية صالح",
        (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const idRegex = /^[1]\d{9}$/;  // رقم هوية سعودي يبدأ بـ 1 أو 2 ويحتوي 10 أرقام
          return emailRegex.test(value) || idRegex.test(value);
        }
      ),
  });





  const { login } = useAuth();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const userData = await dispatch(loginUser(values)).unwrap();
      login(userData); // هنا تحدث الـ Context
      navigate("/");
      resetForm();
    } catch (err) {
      console.log("خطأ في تسجيل الدخول:", err);
    } finally {
      setSubmitting(false);
    }
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
              <h2 className="text-3xl font-bold mb-4">مرحباً بك</h2>
              <p className="text-lg opacity-90">سجّل دخولك للمتابعة</p>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">تسجيل الدخول</h3>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-4">
                  {/* Identity Number */}
                  <div>
                    <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                      او البريد  رقم الهوية
                    </label>
                    <Field
                      name="identifier"
                      type="text"
                      placeholder="أدخل البريد الإلكتروني أو رقم الهوية"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name="identifier" component="div" className="text-red-500 text-sm mt-1" />

                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      كلمة المرور
                    </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Submit */}
                  <button type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    {loading ? "جاري الدخول..." : "تسجيل الدخول"}
                  </button>

                  {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                  {user && <p className="text-green-600 mt-4 text-center">تم تسجيل الدخول بنجاح!</p>}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
