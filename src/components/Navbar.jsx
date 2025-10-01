// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slice/Auth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // منع تمرير الصفحة عند فتح الموبايل مينو
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user"); // مسح الـ localStorage
    navigate("/login"); // إعادة التوجيه لتسجيل الدخول
  };

  return (
    <>
      <nav className="navbar shadow-lg sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* الشعار */}
            <div className="flex items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                <i className="fas fa-star mr-3 text-blue-600"></i>
                مشاهد
              </div>
            </div>

            {/* قائمة الديسكتوب */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              {!user && (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2"
                >
                  تسجيل الدخول
                </Link>
              )}

              {user && (
                <>
                  <span className="text-blue-600 font-medium">
                    👋 مرحباً، {user.full_name}
                  </span>

                     <Link to="/client" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    إضافة عميل
                  </Link>
                  <Link to="/clientpage" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    قائمة العملاء
                  </Link>
                  <Link to="/detail" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    تقارير العملاء
                  </Link>

                  {user.is_superuser && (
                    <Link
                      to="/signup"
                      className="btn-primary me-4"
                    >
                      إنشاء حساب
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium cursor-pointer"
                  >
                    تسجيل الخروج
                  </button>
                </>
              )}
            </div>

            {/* زر الموبايل */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* قائمة الموبايل */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col gap-6 animate-fade-in-up">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 text-2xl"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {!user && (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600"
            >
              تسجيل الدخول
            </Link>
          )}

          {user && (
            <>
              <span className="text-blue-600 font-medium">
                👋 مرحباً، {user.full_name}
              </span>
   <Link to="/client" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    إضافة عميل
                  </Link>
                  <Link to="/clientpage" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    قائمة العملاء
                  </Link>
                  <Link to="/detail" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                    تقارير العملاء
                  </Link>
              {user.is_superuser && (
                <Link
                  to="/signup"
                  className="btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  إنشاء حساب
                </Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-red-600 font-medium cursor-pointer"
              >
                تسجيل الخروج
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
