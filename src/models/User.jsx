export let userModel = (user) => {
  if (user.access !== undefined) {
    localStorage.setItem("access", user.access);
  }
  return {
    id:user.id,
    full_name: user.full_name,
    email: user.email,
    identity_number: user.identity_number,
    branch: user.branch,
    refresh: user.refresh,
    access: user.access,
    is_active: user.is_active,
    is_superuser:user.is_Superuser,
    is_staff:user.is_staff
    
  };
};