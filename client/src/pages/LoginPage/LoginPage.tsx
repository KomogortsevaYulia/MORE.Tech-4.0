import React from "react";

import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchUserById } from "../../store/userSlice/userSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const login = React.useCallback((id: number) => {
    dispatch(fetchUserById(id));
  }, []);

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
      <Button variant="outlined" onClick={() => login(1)}>
        Администратор
      </Button>
      <Button variant="outlined" onClick={() => login(2)}>
        HR
      </Button>
      <Button variant="outlined" onClick={() => login(3)}>
        Руководитель
      </Button>
      <Button variant="outlined" onClick={() => login(4)}>
        Сотрудник
      </Button>
    </Box>
  );
};

export default LoginPage;
