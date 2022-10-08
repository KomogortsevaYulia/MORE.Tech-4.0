import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Alert, Avatar, Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { fetchProducts } from "../../store/marketSlice/marketSlice";

const WheelPage = () => {

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.market);
  const [data, setData] = React.useState<{ option: string }[]>([{ option: 'loading' }])
  console.log(data)
  React.useEffect(() => {
    if (products) {
      setData(products.map((p, index) => ({ option: `${index + 1} ${p.title}` })))
    }
  }, [products]);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);

  const handleSpinClick = () => {
    const newPrizeIndex = Math.floor(Math.random() * data.length)
    console.log(newPrizeIndex)
    setPrizeIndex(newPrizeIndex)
    setMustSpin(true)
  }


  return <div>
    <h1 >Колесо фортуны</h1>
    <hr />
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={data}
          innerBorderColor={"#ffffff"}
          innerBorderWidth={5}
          outerBorderColor={"#ffffff"}
          radiusLineColor={"#FFFFFF"}
          radiusLineWidth={5}
          textColors={["#666666"]}
          fontSize={10}
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
                products?.map((row, index) => (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Typography variant="h5" gutterBottom>
                        {index + 1}
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
        {!mustSpin ? <Alert severity="success">Вы получили приз - {data[prizeIndex].option} !</Alert> :
          <Alert severity="info">Крутите колесо фортуны!</Alert>}
      </Grid>
    </Grid>
  </div>;
};

export default WheelPage;
