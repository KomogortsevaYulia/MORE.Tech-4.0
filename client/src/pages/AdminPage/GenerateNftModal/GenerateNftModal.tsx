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
  onGenerateClick: (uri: string, nftCount: number) => void;
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
  const [uri, setUri] = React.useState<string>("");
  const [nftCount, setNftCount] = React.useState<number | string>("");

  const handleNftCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNftCount(+event.target.value);
  };
  const handleUriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUri(event.target.value);
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
          Генерация NFT коллекции
        </Typography>
        <div>
          <Typography variant="h6" component="h3">
            Введите ссылку на картиночку
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Ссылка"
            type="uri"
            value={uri.toString()}
            onChange={handleUriChange}
          />
        </div>
        <div>
          <Typography variant="h6" component="h3">
            Сколько нфитишек генерим?
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Количество"
            type="number"
            value={nftCount.toString()}
            onChange={handleNftCountChange}
          />
        </div>
        <Button
          variant="outlined"
          onClick={() => onGenerateClick(uri, +nftCount)}
        >
          Сгенерить!
        </Button>
      </Box>
    </Modal>
  );
};

export default GenerateNftModal;
