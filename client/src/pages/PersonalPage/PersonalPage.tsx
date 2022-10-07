import React from "react";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from "../../hooks/hooks";

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PersonalPage = () => {

  const { user, fethcUserStatus } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Avatar
            alt="ФИО"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item xs={2}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemText primary={user?.FIO} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Статус" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Баланс" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Активности" {...a11yProps(0)} />
          <Tab label="Заказы" {...a11yProps(1)} />
          <Tab label="Начисления/списания" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Активности
      </TabPanel>
      <TabPanel value={value} index={1}>
        Заказы
      </TabPanel>
      <TabPanel value={value} index={2}>
        Начисления/списания
      </TabPanel>
    </div>
  )
};

export default PersonalPage;
