import React from "react";

interface IPageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<IPageWrapperProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default PageWrapper;
