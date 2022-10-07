import { ROLES_IDS } from "../types/enums";

export const ROUTES = {
  login: {
    name: "Авторизация",
    url: "/login",
    roleId: -1,
  },
  home: {
    name: "Главная",
    url: "/",
    roleId: 0,
  },
  personal: {
    name: "Личный кабинет",
    url: "/personal",
    roleId: 0,
  },
  market: {
    name: "Маркетплейс",
    url: "/market",
    roleId: 0,
  },
  activities: {
    name: "Активности",
    url: "/activities",
    roleId: 0,
  },
  transactions: {
    name: "Переводы",
    url: "/transactions",
    roleId: 0,
  },
  analytic: {
    name: "Аналитика",
    url: "/analytic",
    roleId: 0,
  },
  admin: {
    name: "Админ панель",
    url: "/admin",
    roleId: ROLES_IDS.ADMIN,
  },
};
