import { useState, useEffect } from "react";
import { reportDetail } from "../redux/slice/Client";
import { useDispatch } from "react-redux";

export default function DetailedClientReport({ filters }) {
  const [report, setReport] = useState([]);
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reportDetail(filters))
      .unwrap()
      .then((data) => {
        setReport(data); // data دي array من العملاء مع دبلوماتهم
      })
      .catch(err => console.error(err));
  }, [filters]);


  if (!report.length) return <div>لا توجد بيانات.</div>;

  return (
    <div>
      <h2>تقرير العملاء المفصل</h2>
      {report.map(client => (
        <div key={client.id} className="border p-4 mb-4 rounded shadow">
          <h3>{client.name} ({client.identity_number})</h3>
          <p>الهاتف: {client.phone_number} | الإيميل: {client.email}</p>
          <p>الفرع: {client.area} | القطاع: {client.sector}</p>
          <p>أضيف بواسطة: {client.added_by}</p>
          <h4>الدبلومات المسجلة:</h4>
          {client.diplomas.length ? (
            <ul>
              {client.diplomas.map(d => (
                <li key={d.id}>{d.name} - {d.date}</li>
              ))}
            </ul>
          ) : (
            <p>لا توجد دبلومات</p>
          )}
        </div>
      ))}
    </div>
  );
}
