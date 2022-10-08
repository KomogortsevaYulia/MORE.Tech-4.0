import React from "react";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchNFTBalance, fetchUsers } from "../../store/adminSlice/adminSlice";
import UsersTable from "./UsersTable/UsersTable";
import AddModal from "./AddModal/AddModal";
import { IUser } from "../../api/mainApi";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";

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
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [currentUser, setCurrentUser] = React.useState<IUser | null>(null);

  const [openModal, setOpenModal] = React.useState(false);

  const openModalClick = React.useCallback(
    (user: IUser) => {
      setOpenModal(true);
      setCurrentUser(user);
    },
    [setOpenModal]
  );

  const closeModal = React.useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

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
            <Tab label="Заказы" {...a11yProps(1)} />
            <Tab label="Генерация NFT" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UsersTable
            data={
              users?.map((user) => ({
                ...user,
                balance:
                  user.balance?.coinsAmount?.toLocaleString() ||
                  "Не удалось получить данные кошелька",
                add: (
                  <Button
                    variant="outlined"
                    onClick={() => openModalClick(user)}
                  >
                    Начислить
                  </Button>
                ),
              })) || []
            }
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Заказы
        </TabPanel>
        <TabPanel value={value} index={2}>
          {nftCollections &&
            nftCollections.balance.map((nft) => (
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={nft.uri}
                  style={{ objectFit: "fill" }}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Осталось: {nft.tokens.length}
                  </Typography>
                </CardContent>
                {/* <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions> */}
              </Card>
            ))}
        </TabPanel>
      </div>
      <AddModal
        open={openModal}
        handleClose={closeModal}
        currentUser={currentUser}
      />
    </>
  );
};

export default AdminPage;
