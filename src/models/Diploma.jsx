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


