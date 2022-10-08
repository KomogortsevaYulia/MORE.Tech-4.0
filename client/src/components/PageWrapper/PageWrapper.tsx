import { Box } from "@mui/material";
import React from "react";

interface IPageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<IPageWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {children}
    </Box>
  );
};

export default PageWrapper;
