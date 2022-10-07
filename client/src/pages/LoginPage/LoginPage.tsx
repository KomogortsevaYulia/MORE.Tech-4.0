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
    <Box>
      <Button variant="outlined" onClick={() => login(1)}>
        Админчик
      </Button>
      <Button variant="outlined" onClick={() => login(2)}>
        ХР-чик
      </Button>
      <Button variant="outlined" onClick={() => login(3)}>
        Руководительчик
      </Button>
      <Button variant="outlined" onClick={() => login(4)}>
        Работяга
      </Button>
    </Box>
  );
};

export default LoginPage;
