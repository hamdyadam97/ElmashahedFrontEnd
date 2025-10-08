import { useState, useEffect } from "react";
import { reportDetail } from "../redux/slice/Client";
import { useDispatch } from "react-redux";

// export default function DetailedClientReport({ filters }) {
//   const [report, setReport] = useState([]);
// const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(reportDetail(filters))
//       .unwrap()
//       .then((data) => {
//         console.log(data,'gggggggggggggggggg')
//         setReport(data); 
//       })
//       .catch(err => console.error(err));
//   }, [filters]);


//   if (!report.length) return <div>لا توجد بيانات.</div>;

//   return (
//     <div>
//       <h2>تقرير العملاء المفصل</h2>
//       {report.map(client => (
//         <div key={client.id} className="border p-4 mb-4 rounded shadow">
//           <h3>{client.name} ({client.identity_number})</h3>
//           <p>الهاتف: {client.phone_number} | الإيميل: {client.email}</p>
//           <p>الفرع: {client.area} | القطاع: {client.sector}</p>
//           <p>أضيف بواسطة: {client.added_by}</p>
//           <h4>الدبلومات المسجلة:</h4>
      
               

//                 <p>أضيف بواسطة: {client.diploma.name }</p>
             
          
//         </div>
//       ))}
//     </div>
//   );
// }




const sectorTranslations = {
  industry: "صناعة",
  finance: "مالية",
  education: "تعليم",
  tech: "تقنية",
};

const areaTranslations = {
  tabuk: "تبوك",
  eastern: "الشرقية",
  asir: "عسير",
  north_border: "الحدود الشمالية",
};

const DetailedClientReport = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    client_name: "",
    sector: "",
    area: "",
    diploma: "",
  });
  const [loading, setLoading] = useState(false);
const dispatch = useDispatch();


  const fetchData = async () => {
  setLoading(true);
  try {
    // call API with dispatch
    const data = await dispatch(reportDetail(filters)).unwrap();
    setData(data);
  } catch (err) {
    console.error(err);
    setData([]); // في حالة الخطأ نفضي البيانات
  } finally {
    setLoading(false);
  }
};
 
  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      client_name: "",
      sector: "",
      area: "",
      diploma: "",
    });
  };

  const exportToCSV = () => {
    const headers = [
      "اسم العميل",
      "رقم الهوية",
      "الهاتف",
      "البريد الإلكتروني",
      "القطاع",
      "المنطقة",
      "الدبلوم",
      "تاريخ الدبلوم",
      "أضيف بواسطة",
    ];
    const csvContent = [
      headers.join(","),
      ...data.map((record) =>
        [
          record.client_name,
          record.identity_number,
          record.phone_number,
          record.email,
          sectorTranslations[record.sector] || record.sector,
          areaTranslations[record.area] || record.area,
          record.diploma_name,
          new Date(record.diploma_date).toLocaleDateString("ar-SA"),
          record.added_by_name,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `تقرير_العملاء_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const printReport = () => window.print();

  const totalRecords = data.length;
  const uniqueClients = new Set(data.map((r) => r.client_id)).size;
  const uniqueDiplomas = new Set(data.map((r) => r.diploma_id)).size;
  const uniqueSectors = new Set(data.map((r) => r.sector)).size;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 تقارير العملاء والدبلومات</h1>
        <div className="flex gap-3">
          <button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            📥 تصدير CSV
          </button>
          <button onClick={printReport} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            🖨️ طباعة
          </button>
        </div>
      </header>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-purple-500 text-white p-6 rounded-xl">
          <p className="text-white/80 text-sm">إجمالي السجلات</p>
          <p className="text-2xl font-bold">{totalRecords}</p>
        </div>
        <div className="bg-emerald-500 text-white p-6 rounded-xl">
          <p className="text-white/80 text-sm">العملاء الفريدون</p>
          <p className="text-2xl font-bold">{uniqueClients}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-xl">
          <p className="text-white/80 text-sm">الدبلومات المختلفة</p>
          <p className="text-2xl font-bold">{uniqueDiplomas}</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-xl">
          <p className="text-white/80 text-sm">القطاعات</p>
          <p className="text-2xl font-bold">{uniqueSectors}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          name="client_name"
          placeholder="اسم العميل"
          value={filters.client_name}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <select name="sector" value={filters.sector} onChange={handleFilterChange} className="border p-2 rounded">
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
        <select name="area" value={filters.area} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">جميع المناطق</option>
          <option value="tabuk">تبوك</option>
          <option value="eastern">الشرقية</option>
          <option value="asir">عسير</option>
          <option value="north_border">الحدود الشمالية</option>
        </select>
        <input
          name="diploma"
          placeholder="الدبلوم"
          value={filters.diploma}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <button onClick={clearFilters} className="bg-gray-500 text-white px-4 py-2 rounded mt-2 md:mt-0">مسح الفلاتر</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>العميل</th>
              <th>رقم الهوية</th>
              <th>الهاتف</th>
              <th>البريد الإلكتروني</th>
              <th>القطاع</th>
              <th>المنطقة</th>
              <th>الدبلوم</th>
              <th>تاريخ الدبلوم</th>
              <th>أضيف بواسطة</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" className="text-center p-4">جاري التحميل...</td></tr>
            ) : (
              data.map((record) => (
                <tr key={`${record.client_id}-${record.diploma_id}`}>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.client_name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.identity_number}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.phone_number}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.email}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sectorTranslations[record.sector] || record.sector}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{areaTranslations[record.area] || record.area}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.diploma.name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.diploma.added_at).toLocaleDateString("ar-SA")}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.diploma.added_by_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedClientReport;

