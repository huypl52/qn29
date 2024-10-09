export enum DLang {
  cn = "cn", // = "Tiếng Trung",
  en = "en", // = "Tiếng Anh",
  vi = "vi", // = "Tiếng Việt",
  zh = "zh",
  lo = "lo",
  km = "km",
}

export const DLangMap = {
  cn: "Tiếng Trung",
  en: "Tiếng Anh",
  vi: "Tiếng Việt",
  zh: "Tiếng Trung",
  lo: "Lào",
  km: "Khmer",
};

// import translations from "../../i18n.json";
// export const DLang: { [k: string]: string } = translations;

export const toastMsg = {
  success: "Operation successful",
  error: "An error occurred",
  warning: "Please be cautious",
  info: "Additional information",
};
