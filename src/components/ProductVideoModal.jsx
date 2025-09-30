const ProductVideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">فيديو المنتج</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">فيديو توضيحي للمنتج</p>
        </div>
      </div>
    </div>
  );
};

export default ProductVideoModal;
