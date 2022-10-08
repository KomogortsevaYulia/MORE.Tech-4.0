import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchOrderForAnalytic,
  fetchOrderWithUser,
} from "../../store/orderSlice/orderSlice";

import { Wheel } from "react-custom-roulette";
import { Grid } from "@mui/material";

const AnalyticPage = () => {
  
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
        name: "Товар",
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
    <Grid container spacing={3}>
      <Grid item xs={4}>
      <ReactECharts option={options} />
      </Grid>
      <Grid item xs={8}>
      <ReactECharts option={option2} /> 
      </Grid>
    </Grid>
  );
};

export default AnalyticPage;
