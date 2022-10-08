import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Alert, Avatar, AvatarGroup, Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { fetchProducts } from "../../store/marketSlice/marketSlice";
import { IProduct } from "../../api/mainApi";


const WheelPage = () => {

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.market);
  const [data, setData] = React.useState<{ option: string }[]>([{ option: 'loading' }])
  
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

    setPrizeIndex(newPrizeIndex)
    setMustSpin(true)
  }


  return <div>
    <h1 >Колесо фортуны</h1>
    <hr />

    <div className="row">
      <div className="col-5">
      <div className="row p-1">
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
        /></div>
        <div className="row p-1">
          <Button variant="contained" onClick={handleSpinClick}>
            Крутить
          </Button >
        </div>
        <div className="row p-1">
          {!mustSpin ? <Alert variant="filled" severity="success">Вы получили приз - {data[prizeIndex].option} !</Alert> :
            <Alert variant="filled" severity="warning">1 раз = 20 Digital Rouble <br/> Крутите колесо фортуны!</Alert>}
        </div>
      </div>
      <div className="col-4">
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 550,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <li >

            {products &&
              products?.map((row: IProduct, index) => (
                <ListItem >
                  <ListItemText primary={`${index + 1}`} />
                  <Avatar
                    alt={row.title}
                    src={row.image}
                  />
                  <ListItemText primary={`${row.title}`} />
                </ListItem>
              ))}

          </li>
        </List>
      </div>
    </div>

  </div >;
};

export default WheelPage;
