import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchOrderForAnalytic,
  fetchOrderWithUser,
} from "../../store/orderSlice/orderSlice";
import { Grid } from "antd";
import echarts from "echarts/types/dist/echarts";
import { Wheel } from "react-custom-roulette";

const AnalyticPage = () => {
  
  const data = [
    { option: '0' },
    { option: '1' },
    { option: '2' },
  ]
  
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }
  
  
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchOrderForAnalytic());
  }, []);

  const { orderAnalytics } = useAppSelector((state) => state.orders);

  const options = {
    title: {
      text: "Соотношение купленных товаров",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: orderAnalytics
          ? Object.entries(orderAnalytics).map(([key, value]) => ({
              name: key,
              value,
            }))
          : [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const option2 = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Line 5']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Line 5',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: 'var(--gradientOrange)'
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 302, 181, 234, 210, 290, 150]
      }
    ]
  };

  return (
    <div>
      <ReactECharts option={options} />
      <div>
        <h1 >Roulette Game</h1>
        <hr />
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          innerBorderColor={"#f2f2f2"}
          innerBorderWidth={25}
          outerBorderColor={"#f2f2f2"}
          radiusLineColor={"#dedede"}
          radiusLineWidth={10}
          textColors={["#ffffff"]}
          fontSize={50}
          perpendicularText={true}
          backgroundColors={[
            "#F22B35",
            "#F99533",
            "#24CA69",
            "#514E50",
            "#46AEFF",
            "#9145B7"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className="button2" onClick={handleSpinClick}>
          SPIN
        </button>
        <br />
        {!mustSpin ? data[prizeNumber].option : "0"}
        <hr />
      </div>
       <ReactECharts option={option2} /> 
    </div>
  );
};

export default AnalyticPage;
