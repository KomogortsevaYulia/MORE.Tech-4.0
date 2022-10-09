import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ActivitiesPage from "../../pages/ActivitiesPage/ActivitiesPage";
import AdminPage from "../../pages/AdminPage/AdminPage";
import AnalyticPage from "../../pages/AnalyticPage/AnalyticPage";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MarketPage from "../../pages/MarketPage/MarketPage";
import PersonalPage from "../../pages/PersonalPage/PersonalPage";
import TransactionsPage from "../../pages/TransactionsPage/TransactionsPage";
import EmployesPage from "../../pages/EmployesPage/EmployesPage";
import WheelPage from "../../pages/WheelPage/WheelPage";
import { fetchUserBalance } from "../../store/userSlice/userSlice";
import { LoadingStatuses, ROLES_IDS } from "../../types/enums";
import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { user, fethcUserStatus } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    if (user && !user.balance) {
      dispatch(fetchUserBalance(user.publicKey));
    }
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
          <Route element={<Navbar />}>
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
            <Route path={ROUTES.wheel.url} element={<WheelPage />} />
            <Route path={ROUTES.employee.url} element={<EmployesPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
