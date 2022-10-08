import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Wheel } from "react-custom-roulette";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Alert, Avatar, Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { fetchProducts } from "../../store/marketSlice/marketSlice";

const WheelPage = () => {
  const data = [
    { option: '0' },
    { option: '1' },
    { option: '2' },
  ]
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.market);

  React.useEffect(() => {

  }, [products]);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }


  return <div>
    <h1 >Колесо фортуны</h1>
    <hr />
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          innerBorderColor={"#ffffff"}
          innerBorderWidth={5}
          outerBorderColor={"#ffffff"}
          radiusLineColor={"#FFFFFF"}
          radiusLineWidth={5}
          textColors={["#666666"]}
          fontSize={50}
          perpendicularText={true}
          backgroundColors={[
            '#9E95F5',
            "#E0FFDF",
            "#F08182",
            "#FFB976",
            "#1CE7FF"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <Button variant="outlined" onClick={handleSpinClick}>
          SPIN
        </Button >
      </Grid>
      <Grid item xs={8}>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              {products &&
                products?.map((row) => (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Typography variant="h5" gutterBottom>
                        1
                      </Typography>
                      <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </ListItemIcon>
                      <ListItemText primary={row.title} />
                    </ListItemButton>
                  </ListItem>
                ))}


            </List>
          </nav>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {!mustSpin ? <Alert severity="success">Вы получили приз - {data[prizeNumber].option} !</Alert> :
          <Alert severity="info">Крутите колесо фортуны!</Alert>}
      </Grid>
    </Grid>
  </div>;
};

export default WheelPage;
