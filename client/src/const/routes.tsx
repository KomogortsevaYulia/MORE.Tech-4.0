import { ROLES_IDS } from "../types/enums";

import Diversity2Icon from "@mui/icons-material/Diversity2";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export const ROUTES = {
  login: {
    name: "Авторизация",
    url: "/login",
    roleId: -1,
    icon: <Diversity2Icon />,
  },
  home: {
    name: "Главная",
    url: "/",
    roleId: 0,
    icon: <HomeIcon />,
  },
  personal: {
    name: "Личный кабинет",
    url: "/personal",
    roleId: 0,
    icon: <PersonIcon />,
  },
  market: {
    name: "Маркетплейс",
    url: "/market",
    roleId: 0,
    icon: <StorefrontIcon />,
  },
  activities: {
    name: "Активности",
    url: "/activities",
    roleId: 0,
    icon: <Diversity2Icon />,
  },
  transactions: {
    name: "Переводы",
    url: "/transactions",
    roleId: 0,
    icon: <PaymentIcon />,
  },
  analytic: {
    name: "Аналитика",
    url: "/analytic",
    roleId: ROLES_IDS.ADMIN,
    icon: <EqualizerIcon />,
  },
  wheel: {
    name: "Колесо фортуны",
    url: "/wheel",
    roleId: 0,
    icon: <WhatshotIcon />,
  },
  admin: {
    name: "Админ панель",
    url: "/admin",
    roleId: ROLES_IDS.ADMIN,
    icon: <AdminPanelSettingsIcon />,
  },
  employee: {
    name: "Отделы",
    url: "/employee",
    roleId: 0,
    icon: <PeopleOutlineIcon />,
  },
};
