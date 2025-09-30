import { useEffect, useState } from "react";

const ImageGallery = ({ images, onShowVideo }) => {
  const [mainImage, setMainImage] = useState('');

  // ✅ لما images تتغير، اختار أول صورة كـ mainImage
  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  return (
    <div>
      <img
        src={mainImage}
        alt="main"
        className="w-full h-96 object-cover rounded-lg mb-4"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
        }}
      />
      <div className="grid grid-cols-4 gap-2 image-gallery">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setMainImage(img)}
            className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
              mainImage === img ? "border-blue-500" : "border-transparent hover:border-blue-500"
            }`}
            alt={`img-${i}`}
          />
        ))}

        <div
          onClick={onShowVideo}
          className="w-full h-20 bg-gray-200 rounded cursor-pointer border-2 border-transparent hover:border-blue-500 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
