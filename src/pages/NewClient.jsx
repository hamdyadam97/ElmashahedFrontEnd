import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const NewClientsPage = () => {
    // const dispatch = useDispatch();
    // const [clients, setClients] = useState([]);
    const newClient = useSelector((state) => state.client?.newClient);
    console.log(newClient, 'newcleeeeeeeeeee')

    // const loadClients = () => {


    //     dispatch(fetchClients())
    //         .unwrap()
    //         .then((data) => {

    //             setClients(Array.isArray(data) ? data : []);

    //         })
    //         .catch((err) => console.error(err));
    // };

    // useEffect(() => {
    //     loadClients();
    // });



    const handleDelete = (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
            setClients((prev) => prev.filter((c) => c.id !== id));
        }
    };

    return (
        <>
            {newClient ? (
                <div className="container mx-auto p-4" >
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

                            <tr key={newClient.id} className="hover:bg-gray-50">
                                <td className="border p-2">{newClient.name}</td>
                                <td className="border p-2">{newClient.identity_number}</td>
                                <td className="border p-2">{newClient.phone_number}</td>
                                <td className="border p-2">{newClient.email}</td>
                                <td className="border p-2">
                                    <span className={`px-2 py-1 rounded ${getSectorColor(newClient.sector)}`}>{newClient.sector}</span>
                                </td>
                                <td className="border p-2">{newClient.area}</td>
                                <td className="border p-2">
                                    {newClient.diploma?.map((d) => (
                                        <span
                                            key={d.id}
                                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-1"
                                        >
                                            {d.name}
                                        </span>
                                    ))}
                                </td>

                                <td className="border p-2 space-x-1">
                                    <button onClick={() => alert(newClient.name)} className="text-blue-600">
                                        عرض
                                    </button>
                                    <button onClick={() => handleDelete(newClient.id)} className="text-red-600">
                                        حذف
                                    </button>

                                    <div className="flex gap-2 mt-4">
                                        {newClient.diplomas?.map((d) => (
                                            <React.Fragment key={d.id}>
                                                <a
                                                    href={`http://localhost:8000/api/user/client/${newClient.id}/diploma/${d.id}/pdf/`}
                                                    target="_blank"
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                >
                                                    عرض {d.name}
                                                </a>
                                                <a
                                                    href={`http://localhost:8000/api/user/client/${newClient.id}/diploma/${d.id}/pdf/`}
                                                    download={`client_${newClient.id}_${d.id}.pdf`}
                                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                >
                                                    تحميل {d.name}
                                                </a>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div >
            ) : (
                <p>لا يوجد بيانات عميل جديدة</p>
            )}
        </>

    );
};

export default NewClientsPage;
