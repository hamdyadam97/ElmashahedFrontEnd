import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../redux/slice/Product";
import Breadcrumb from "../components/Breadcrumb";
import ImageGallery from "../components/ImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductTabs from "../components/ProductTabs";
import SellerInfo from "../components/SellerInfo";
import ProductVideoModal from "../components/ProductVideoModal";
import ChatBox from "../components/ChatBox";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [currentLang, setCurrentLang] = useState("ar");
  const [showVideo, setShowVideo] = useState(false);

  const { productDetail: product, loading, error } = useSelector((state) => state.product);
  const storedUser = JSON.parse(localStorage.getItem("user"))
console.log(storedUser.id)

  useEffect(() => {
    if (slug) dispatch(fetchProductDetail({ slug }));
  }, [dispatch, slug]);
const images = product?.media?.map((m) => m.file) || [];

  // ✅ حالة التحميل
  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-bold text-purple-600">
        {currentLang === "ar" ? "جاري تحميل المنتج..." : "Loading product..."}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-bold">
        {currentLang === "ar" ? "حدث خطأ أثناء تحميل المنتج" : "Failed to load product"}
        <br />
        {error}
      </div>
    );
  }

  // ✅ الحالة الطبيعية
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Breadcrumb currentLang={currentLang} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ImageGallery images={images} onShowVideo={() => setShowVideo(true)} />
        <ProductInfo product={product} currentLang={currentLang} />
      </div>

      <ProductTabs product={product} currentLang={currentLang} />
      <SellerInfo seller={product?.seller} currentLang={currentLang} />
      <ChatBox senderId={storedUser?.id} receiverId={product.seller.id} />
      <ProductVideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
};

export default ProductDetail;
