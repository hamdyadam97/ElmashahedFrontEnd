const Breadcrumb = ({ currentLang }) => {
  const t = {
    ar: ["الرئيسية", "الإلكترونيات", "هاتف ذكي متطور"],
    en: ["Home", "Electronics", "Advanced Smartphone"]
  }[currentLang];

  return (
    <nav className="text-sm text-gray-600">
      <a href="#" className="hover:text-blue-600">{t[0]}</a> /{" "}
      <a href="#" className="hover:text-blue-600">{t[1]}</a> /{" "}
      <span className="text-gray-800">{t[2]}</span>
    </nav>
  );
};

export default Breadcrumb;
