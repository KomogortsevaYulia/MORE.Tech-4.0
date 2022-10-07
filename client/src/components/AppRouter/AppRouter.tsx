import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import { useAppSelector } from "../../hooks/hooks";
import ActivitiesPage from "../../pages/ActivitiesPage/ActivitiesPage";
import AnalyticPage from "../../pages/AnalyticPage/AnalyticPage";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MarketPage from "../../pages/MarketPage/MarketPage";
import PersonalPage from "../../pages/PersonalPage/PersonalPage";
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage";

const AppRouter = () => {
  const { user } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Routes>
      <Route path={ROUTES.home.url} element={<HomePage />} />
      <Route path={ROUTES.login.url} element={<LoginPage />} />
      <Route path={ROUTES.activities.url} element={<ActivitiesPage />} />
      <Route path={ROUTES.analytic.url} element={<AnalyticPage />} />
      <Route path={ROUTES.market.url} element={<MarketPage />} />
      <Route path={ROUTES.personal.url} element={<PersonalPage />} />
      <Route path={ROUTES.transactions.url} element={<TransactionsPage />} />
    </Routes>
  );
};

export default AppRouter;
