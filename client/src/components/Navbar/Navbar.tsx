import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { ROUTES } from "../../const/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../store/userSlice/userSlice";

import styles from "./Navbar.module.css";
import { Tooltip } from "@mui/material";

import Zoom from '@mui/material/Zoom';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IMiniDrawer {
  children?: React.ReactNode;
}

export const MiniDrawer: React.FC<IMiniDrawer> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.user);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      className={`${location.pathname === ROUTES.home.url ? styles.myStyle : styles.backgroundWrapper
        }`}
      sx={{ display: "flex" }}
    >
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <Tooltip title="Свернуть меню" placement="right" TransitionComponent={Zoom}>

              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Tooltip>

          ) : (
            <Tooltip title="Раскрыть меню" placement="right" TransitionComponent={Zoom}>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                style={{ width: "100%" }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
        </DrawerHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: "12px",
          }}
        >
          <List>
            {Object.values(ROUTES).map(
              ({ name, url, roleId, icon }, index) =>
                (roleId === 0 || roleId === user?.roleId) && (
                  <ListItem
                    key={name}
                    disablePadding
                    sx={{
                      display: "block",
                      background:
                        location.pathname === url ? "var(--blue)" : "",
                    }}
                    onClick={() => navigate(url)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <Tooltip title={name} placement="right" disableHoverListener={open} TransitionComponent={Zoom}>

                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {icon ? icon : <MailIcon />}
                        </ListItemIcon>
                      </Tooltip>
                      <ListItemText
                        primary={name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>
          <ListItem
            key="exit"
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => dispatch(logout())}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="Выход" placement="right" disableHoverListener={open} TransitionComponent={Zoom}>
                  <LogoutIcon style={{ transform: "rotateY(180deg)" }} />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Выйти" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default MiniDrawer;
