import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchClients } from "../redux/slice/Client";

const getSectorColor = (sector) => {
  const colors = {
    "حكومي": "bg-blue-100 text-blue-800",
    "خاص": "bg-green-100 text-green-800",
    "تعليمي": "bg-purple-100 text-purple-800",
    "صحي": "bg-red-100 text-red-800",
    "تقني": "bg-yellow-100 text-yellow-800",
  };
  return colors[sector] || "bg-gray-100 text-gray-800";
};

const ClientsPage = () => {
  const dispatch = useDispatch();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // جلب البيانات من الـ API عند كل تغيير في الفلاتر أو الصفحة
  const loadClients = () => {
    const filters = {
      search: searchTerm,
      sector: sectorFilter,
      area: areaFilter,
      page: currentPage,
      per_page: itemsPerPage,
    };

    dispatch(fetchClients(filters))
      .unwrap()
      .then((data) => {

        setClients(Array.isArray(data) ? data : []);
        setTotalItems(data.count || data.length);

      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadClients();
  }, [searchTerm, sectorFilter, areaFilter, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="بحث..."
          value={searchTerm}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchTerm(e.target.value);
          }}
          className="border px-4 py-2 rounded"
        />
        <select
          value={sectorFilter}
          onChange={(e) => {
            setCurrentPage(1);
            setSectorFilter(e.target.value);
          }}
          className="border px-4 py-2 rounded"
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
        </select>
        <select
          value={areaFilter}
          onChange={(e) => {
            setCurrentPage(1);
            setAreaFilter(e.target.value);
          }}
          className="border px-4 py-2 rounded"
        >
          <option value="">جميع المناطق</option>
          <option value="riyadh">الرياض</option>
          <option value="makkah">مكة</option>
          <option value="madinah">المدينة المنورة</option>


          <option value="qassim">القصيم</option>
          <option value="eastern">المنطقة الشرقية</option>
          <option value="asir">عسير</option>
          <option value="tabuk"> تبوك</option>
          <option value="hail">حائل</option>

          <option value="north_border"> الحدود الشمالية</option>
          <option value="jazan">جازان</option>
          <option value="najran">نجران</option>
          <option value="baha"> الباحة</option>
          <option value="jouf">الجوف</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">الاسم</th>
            <th className="border p-2">رقم الهوية</th>
            <th className="border p-2">الهاتف</th>
            <th className="border p-2">البريد</th>
            <th className="border p-2">القطاع</th>
            <th className="border p-2">المنطقة</th>
            <th className="border p-2">الشهادات</th>
            <th className="border p-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="border p-2">{client.name}</td>
              <td className="border p-2">{client.identity_number}</td>
              <td className="border p-2">{client.phone_number}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">
                <span className={`px-2 py-1 rounded ${getSectorColor(client.sector)}`}>{client.sector}</span>
              </td>
              <td className="border p-2">{client.area}</td>
              <td className="border p-2"><span key={client.diploma.id} className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1">{client.diploma.name}</span>

              </td>
              <td className="border p-2 space-x-1">
                
                {/* <button onClick={() => handleDelete(client.id)} className="text-red-600">حذف</button> */}
                <div className="flex gap-2 mt-4">
                  <a
                    href={`http://localhost:8000/api/user/client/${client.id}/diploma/${client.diploma.id}/pdf/`}

                    target="_blank"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    عرض الملف
                  </a>
                  
                  <a
                    href={`http://localhost:8000/api/user/client/${client.id}/diploma/${client.diploma.id}/pdf/`}
                    download={`client_${client.id}.pdf`}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    تحميل الملف
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-3 py-1 border rounded">السابق</button>
        <span>صفحة {currentPage} من {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="px-3 py-1 border rounded">التالي</button>
      </div>
    </div>
  );
};

export default ClientsPage;
