import {
  Box,
  Modal,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { IUser } from "../../../api/mainApi";
import FileUpload from "../../../components/FileUpload/FileUpload";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { transferRubles } from "../../../store/transactionsSlice/transactionsSlice";

interface IGenerateNftModal {
  open: boolean;
  handleClose: () => void;
  onGenerateClick: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
};

const GenerateNftModal: React.FC<IGenerateNftModal> = ({
  open,
  handleClose,
  onGenerateClick,
}) => {
  const [rublesAmount, setRublesAmount] = React.useState<number | string>("");

  const handleRublesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRublesAmount(+event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Начисление выбранным пользователям
        </Typography>
        <div>
          <Typography variant="h6" component="h3">
            Сколько начисляем?
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Количество"
            type="number"
            value={rublesAmount.toString()}
            onChange={handleRublesChange}
          />
        </div>
        <Button variant="outlined" onClick={() => onGenerateClick()}>
          Начислить!
        </Button>
      </Box>
    </Modal>
  );
};

export default GenerateNftModal;
