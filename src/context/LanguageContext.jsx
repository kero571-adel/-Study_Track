import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    dashboard: "Dashboard",
    addCourse: "Add Course",
    progress: "Progress",
    tasks: "Tasks",
    games: "Games",
    logout: "Logout",
    toggleLang: "عربي",
    studyTrack: "📚 StudyTrack",
  },
  ar: {
    dashboard: "لوحة التحكم",
    addCourse: "إضافة دورة",
    progress: "التقدم",
    tasks: "المهام",
    games: "الألعاب",
    logout: "تسجيل خروج",
    toggleLang: "English",
    studyTrack: "📚 مسار الدراسة",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
