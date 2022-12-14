import React from "react";
import styles from "./TransactionPage.module.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchTransactions,
  fetchTransactionsNft,
  transferNft,
  transferRubles,
} from "../../store/transactionsSlice/transactionsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  tableCellClasses,
} from "@mui/material";
import { fetchUsers } from "../../store/adminSlice/adminSlice";
import { removeNftFromBalance } from "../../store/userSlice/userSlice";

const TransactionsPage = () => {
  const dispatch = useAppDispatch();
  const { transactions, transactionsNft } = useAppSelector(
    (state) => state.transactions
  );
  const { user } = useAppSelector((state) => state.user);
  const { users, nftCollections } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchTransactionsNft());
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentCourse = 10;

  const [rublesAmount, setRublesAmount] = React.useState<number | string>("");
  const handleRublesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (value > +user!.balance.coinsAmount) return;
    const avaliabeRubles = value / currentCourse;
    setRublesAmount(value);
    setRealRublesAmount(avaliabeRubles);
  };
  const [realRublesAmount, setRealRublesAmount] = React.useState<
    number | string
  >("");
  const handleRealRublesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    const rublesRequired = currentCourse * value;
    if (rublesRequired > +user!.balance.coinsAmount) return;
    setRealRublesAmount(value);
    setRublesAmount(rublesRequired);
  };

  const [person, setPerson] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPerson(event.target.value as string);
  };

  const [personNftReciever, setPersonNftReciever] = React.useState("");

  const handleNftRecieverChange = (event: SelectChangeEvent) => {
    setPersonNftReciever(event.target.value as string);
  };

  const [nftToTransfer, setNftToTransfer] = React.useState("");

  const handleNftChange = (event: SelectChangeEvent) => {
    setNftToTransfer(event.target.value as string);
  };

  const [sendNftReason, setSendNftReason] = React.useState<string>("");
  const handleSendNftReasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSendNftReason(value);
  };

  const [rublesToTransfer, setRublesToTransfer] = React.useState<
    string | number
  >("");
  const handleRublesToTransferChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    if (value > +user!.balance.coinsAmount) return;
    setRublesToTransfer(value);
  };

  const [reason, setReason] = React.useState<string>("");
  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setReason(value);
  };

  const handleTransfer = () => {
    dispatch(
      transferRubles({
        amount: +rublesToTransfer,
        userId: user!.id,
        toId: users!.find((user) => user.publicKey === person)!.id,
        fromPrivateKey: user!.privateKey,
        toPublicKey: person,
        why: reason || "???? ?????????????? ????????????????",
      })
    );
  };

  const handleTransferNft = () => {
    const nft = nftCollections!.balance.find(
      (nft) => nft.uri === nftToTransfer
    )!;
    const tokenId = nft.tokens[0];
    dispatch(
      transferNft({
        fromPrivateKey: user!.privateKey,
        toPublicKey: personNftReciever,
        nft: { ...nft, tokens: [tokenId] },
        toId: users!.find((u) => u.publicKey === personNftReciever)!.id,
        userId: user!.id,
        why: sendNftReason || "???? ?????????????? ????????????????",
      })
    );
    dispatch(removeNftFromBalance(nft.uri));
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976D2",
      color: "#FFFFFF",
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));



  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "12px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ maxWidth: "12vw" }} className="col p-2 m-2">
            <div className="row d-flex justify-content-center p-2 m-2">
              <div className={`${styles.coin} `}>
                <div className={`${styles.side} ${styles.head}`}>DR</div>
                <div className={`${styles.side} ${styles.tail}`}>DR</div>
                <div className={`${styles.edge}`}></div>
              </div>
            </div>
            <div className="row d-flex justify-content-center text-center">
              <h2 className="fw-normal">
                {user?.balance?.coinsAmount.toLocaleString() ||
                  "??????????????????????..."}
              </h2>
            </div>
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <Typography variant="h4" component="h4">
              ???????????????? ????????????
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">????????</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={person}
                label="????????"
                onChange={handleChange}
              >
                {users &&
                  users?.map((user) => (
                    <MenuItem value={user.publicKey} key={user.id}>
                      {user.FIO}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                variant="outlined"
                label="???????????????????? Digital Rubles"
                type="number"
                value={rublesToTransfer.toString()}
                onChange={handleRublesToTransferChange}
              />{" "}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                variant="outlined"
                label="??????????????????"
                value={reason}
                onChange={handleReasonChange}
              />{" "}
            </div>
            <Button variant="outlined" onClick={handleTransfer}>
              ??????????????????
            </Button>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <Typography variant="h4" component="h4">
              ???????????????? NFT
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">????????</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={personNftReciever}
                label="????????"
                onChange={handleNftRecieverChange}
              >
                {users &&
                  users?.map((user) => (
                    <MenuItem value={user.publicKey} key={user.id}>
                      {user.FIO}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">NFT</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={nftToTransfer}
                label="NFT"
                onChange={handleNftChange}
              >
                {nftCollections &&
                  nftCollections?.balance.map((nft) => (
                    <MenuItem value={nft.uri} key={nft.uri}>
                      <img
                        src={nft.uri}
                        alt={nft.uri}
                        style={{
                          width: "126px",
                          height: "126px",
                          margin: "auto",
                        }}
                      />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                variant="outlined"
                label="??????????????????"
                value={sendNftReason}
                onChange={handleSendNftReasonChange}
              />{" "}
            </div>
            <Button variant="outlined" onClick={handleTransferNft}>
              ??????????????????
            </Button>
          </Box>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <Typography variant="h4" component="h4">
              ?????????? ?? ??????????
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TextField
                variant="outlined"
                label="?? ?????????? Digital Rubles"
                type="number"
                value={rublesAmount.toString()}
                onChange={handleRublesChange}
              />{" "}
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-1">
                <ArrowDownwardIcon color="success" />
              </div>
              <div className="col-auto align-items-center">
                <Typography
                  sx={{ color: "#1F9D57", fontSize: 13 }}
                  component="p"
                >
                  {currentCourse} Digital Rubles = 1 ???????????????? ??????????
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                variant="outlined"
                label="?? ???????????? ???????????????? ????????????"
                type="number"
                value={realRublesAmount.toString()}
                onChange={handleRealRublesChange}
              />{" "}
            </div>
            <Button variant="outlined">??????????????</Button>
          </div>
        </div>
      </Box>
      <Divider sx={{ marginTop: "64px" }} />
      <Typography variant="h4" component="h2" style={{ marginTop: "64px" }}>
        ????????????????????
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">???? ????????</StyledTableCell>
              <StyledTableCell align="left">????????</StyledTableCell>
              <StyledTableCell align="left">????????????????????</StyledTableCell>
              <StyledTableCell align="left">????????</StyledTableCell>
              <StyledTableCell align="left">??????????????</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactionsNft &&
              [...transactions!, ...transactionsNft!]
                .sort((t1, t2) =>
                  new Date(t1.date) < new Date(t2.date) ? 1 : -1
                )
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      background: index % 2 === 0 ? "#D9D9D9" : "",
                    }}
                  >
                    <StyledTableCell align="left">
                      {row.user.FIO}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.users2.FIO}
                    </StyledTableCell>
                    {"amount" in row ? (
                      <StyledTableCell align="left">
                        {row.amount}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="left">
                        x1
                        <img
                          src={row.nft.uri}
                          alt={row.nft.uri}
                          style={{
                            marginLeft: "8px",
                            width: "48px",
                            height: "48px",
                            borderRadius: "100%",
                          }}
                        />
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="left">
                      {row.date.split("T")[0]}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.why}</StyledTableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionsPage;
