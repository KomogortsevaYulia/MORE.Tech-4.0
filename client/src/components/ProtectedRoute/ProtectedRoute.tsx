import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePreloader } from "../../hooks/usePreloader";
import { LoadingStatuses } from "../../types/enums";
import Loader from "../Loader/Loader";
import PageWrapper from "../PageWrapper/PageWrapper";

interface IProtectedRouteProps {
  isLoading: boolean;
  isSuccess: boolean;
  onFailRedirectPath?: string;
  onSuccessRedirectPath?: string;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isLoading,
  isSuccess,
  onFailRedirectPath,
  onSuccessRedirectPath,
}) => {
  const { isPreloaderShow } = usePreloader(isLoading);

  if (isLoading && !isPreloaderShow) return null;

  return (
    <>
      {isLoading && isPreloaderShow ? (
        <PageWrapper>
          <Loader />
        </PageWrapper>
      ) : isSuccess ? (
        onSuccessRedirectPath ? (
          <Navigate to={onSuccessRedirectPath} />
        ) : (
          <Outlet />
        )
      ) : onFailRedirectPath ? (
        <Navigate to={onFailRedirectPath} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ProtectedRoute;
