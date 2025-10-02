export let diolomaModelRel = (diploma) => {
  return {
    id:diploma.diploma.id,
    name: diploma.diploma.name,
    date: diploma.date,
    added_by_name: diploma.added_by_name,
    added_by: diploma.added_by,
   
  };
};


export let diolomaModel = (diploma) => {
  return {
    id:diploma.id,
    name: diploma.name,
    date: diploma.date,
   
  };
};

export let clientModel = (client) => {
  return {
    id: client.client_id,
    name: client.name,
    identity_number: client.identity_number,
    phone_number: client.phone_number,
    email: client.email,
    sector: client.sector,
    area: client.area,
    diploma:diolomaModel(client.diploma),
    added_by_name: client.added_by_name,
    added_by: client.added_by,
    
  };
};

export const diplomaModelRel = (d) => {
  return {
    id: d.diploma.id,
    name: d.diploma.name,
    date: d.added_at,               // لو عايز تحط تاريخ الإضافة
    added_by_name: d.added_by,      // الاسم من الـ API
    added_by_id: d.added_by_id,     // ID المستخدم
  };
};

  export const clientCreateModel = (client) => {
  return {
    id: client.id,
    name: client.name,
    identity_number: client.identity_number,
    phone_number: client.phone_number,
    email: client.email,
    sector: client.sector,
    area: client.area,
    diplomas: Array.isArray(client.diplomas)
      ? client.diplomas.map(d => diplomaModelRel(d))
      : [], // لو مفيش دبلومات يرجع array فاضي
  };
};

export const diplomaModel = (item) => {
    return {
        id: item.diploma_id,
        name: item.diploma_name,
        date: item.diploma_date,
        added_by_name: item.added_by_name,
        added_at: item.added_at
    };
};


export const clientDiplomaModelReport = (item) => {
    return {
        client_id: item.client_id,
        client_name: item.client_name,
        identity_number: item.identity_number,
        phone_number: item.phone_number,
        email: item.email,
        sector: item.sector,
        area: item.area,
        diploma: diplomaModel(item)
    };
};
