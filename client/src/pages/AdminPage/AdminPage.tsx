import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchNFTBalance,
  fetchUsers,
  generateNft,
} from "../../store/adminSlice/adminSlice";
import UsersTable from "./UsersTable/UsersTable";
import AddModal from "./AddModal/AddModal";
import {
  IconButton,
  Grid,
} from "@mui/material";
import { transferRubles } from "../../store/transactionsSlice/transactionsSlice";
import { GridRowId } from "@mui/x-data-grid";
import NftCard from "./NftCard/NftCard";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import GenerateNftModal from "./GenerateNftModal/GenerateNftModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { users, nftCollections } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchNFTBalance(user!.publicKey));
  }, [user, dispatch]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [nftModalOpen, setNftModalOpen] = React.useState(false);

  const closeModal = React.useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const closeNftModal = React.useCallback(() => {
    setNftModalOpen(false);
  }, [setNftModalOpen]);

  const [usersToGetMoney, setUsersToGetMoney] = React.useState<any[]>([]);

  const addClick = (ids: GridRowId[]) => {
    if (users) {
      setUsersToGetMoney(users!.filter((u) => ids.includes(u.id)));
    }
    setOpenModal(true);
  };

  const openNftGenerateModal = () => {
    setNftModalOpen(true);
  };

  const accrueClick = (amount: number) => {
    dispatch(
      transferRubles(
        usersToGetMoney.map((u) => ({
          amount,
          fromPrivateKey: user!.privateKey,
          toPublicKey: u.publicKey,
          toId: u.id,
          userId: user!.id,
          why: "Начисление от администратора",
        }))
      )
    );
    closeModal();
  };

  const generateClick = (uri: string, nftCount: number) => {
    dispatch(generateNft({ publicKey: user!.publicKey, count: nftCount, uri }));
    closeNftModal();
  };

  return (
    <>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Пользователи и зачисления" {...a11yProps(0)} />

            <Tab label="Генерация NFT" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UsersTable
            rows={
              users?.map((user) => ({
                ...user,
                balance:
                  user.balance?.coinsAmount?.toLocaleString() ||
                  "Не удалось получить данные кошелька",
                name: user.FIO,
              })) || []
            }
            onAddClick={addClick}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {nftCollections &&
              nftCollections.balance.map((nft) => <NftCard key={nft.uri} nft={nft} />)}
            <IconButton sx={{ width: 256 }} onClick={openNftGenerateModal}>
              <AddAPhotoIcon sx={{ fontSize: 128 }} />
            </IconButton>
          </Grid>
        </TabPanel>
      </div>
      <AddModal
        open={openModal}
        handleClose={closeModal}
        onAccrueClick={accrueClick}
      />
      <GenerateNftModal
        open={nftModalOpen}
        handleClose={closeNftModal}
        onGenerateClick={generateClick}
      />
    </>
  );
};

export default AdminPage;
