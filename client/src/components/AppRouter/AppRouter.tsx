import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import { useAppSelector } from "../../hooks/hooks";
import ActivitiesPage from "../../pages/ActivitiesPage/ActivitiesPage";
import AdminPage from "../../pages/AdminPage/AdminPage";
import AnalyticPage from "../../pages/AnalyticPage/AnalyticPage";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MarketPage from "../../pages/MarketPage/MarketPage";
import PersonalPage from "../../pages/PersonalPage/PersonalPage";
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage";
import { LoadingStatuses, ROLES_IDS } from "../../types/enums";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const AppRouter = () => {
  const { user, fethcUserStatus } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isLoading={fethcUserStatus === LoadingStatuses.LOADING}
              isSuccess={user !== null}
              onSuccessRedirectPath="/"
            />
          }
        >
          <Route path={ROUTES.login.url} element={<LoginPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isLoading={fethcUserStatus === LoadingStatuses.LOADING}
              isSuccess={user !== null}
              onFailRedirectPath={ROUTES.login.url}
            />
          }
        >
          <Route
            element={
              <ProtectedRoute
                isLoading={false}
                isSuccess={user?.roleId === ROLES_IDS.ADMIN}
                onFailRedirectPath="/"
              />
            }
          >
            <Route path={ROUTES.admin.url} element={<AdminPage />} />
          </Route>
          <Route path={ROUTES.home.url} element={<HomePage />} />
          <Route path={ROUTES.activities.url} element={<ActivitiesPage />} />
          <Route path={ROUTES.analytic.url} element={<AnalyticPage />} />
          <Route path={ROUTES.market.url} element={<MarketPage />} />
          <Route path={ROUTES.personal.url} element={<PersonalPage />} />
          <Route
            path={ROUTES.transactions.url}
            element={<TransactionsPage />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
