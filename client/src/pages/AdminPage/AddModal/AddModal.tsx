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
import { transferRubles } from "../../../store/adminSlice/adminSlice";

interface IAddModal {
  open: boolean;
  handleClose: () => void;
  currentUser: IUser | null;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
};

const AddModal: React.FC<IAddModal> = ({ open, handleClose, currentUser }) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const [transferType, setTransferType] = React.useState("rubles");

  const handleTransferTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransferType((event.target as HTMLInputElement).value);
  };

  const [rublesAmount, setRublesAmount] = React.useState<number | string>("");
  const [nft, setNft] = React.useState(null);

  const handleRublesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRublesAmount(+event.target.value);
  };

  const makeTransfer = () => {
    if (transferType === "rubles") {
      dispatch(
        transferRubles({
          amount: +rublesAmount,
          toPublicKey: currentUser!.publicKey,
          fromPrivateKey: user!.privateKey,
          userId: user!.id,
          toId: currentUser!.id,
        })
      );
    } else {
    }

    handleClose();
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
          Начисление пользователю {currentUser?.FIO}
        </Typography>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h6" component="h3">
              Что начисляем?
            </Typography>
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="rubles"
            name="radio-buttons-group"
            value={transferType}
            onChange={handleTransferTypeChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="rubles"
              control={<Radio />}
              label="Digital Rubles"
            />
            <FormControlLabel value="nft" control={<Radio />} label="NFT" />
          </RadioGroup>
        </FormControl>
        <div>
          {transferType === "rubles" ? (
            <>
              <Typography variant="h6" component="h3">
                Сколько начисляем?
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Количество"
                type="number"
                value={rublesAmount}
                onChange={handleRublesChange}
              />
            </>
          ) : (
            <FileUpload setFile={setNft} accept="image/*" />
          )}
        </div>
        <Button variant="outlined" onClick={makeTransfer}>
          Начислить!
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModal;
