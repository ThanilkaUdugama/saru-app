import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { LineChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveRadar } from "@nivo/radar";
import * as React from "react";
import { getLabelValueData } from "../fns";
import { useTheme } from "@emotion/react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveHeatMap } from "@nivo/heatmap";

export function Barchart({ data, x, y, keys, unit, stack, param }) {
  const theme = useTheme();
  if (data) {
    return (
      <Box my={3} style={{ height: "70vh" }}>
        <BarChart
          unit={unit}
          sx={{ paddnigX: "10rem" }}
          dataset={data ?? []}
          xAxis={[{ scaleType: "band", dataKey: x }]}
          series={
            param
              ? [
                  {
                    dataKey: param,
                    label: param,
                    valueFormatter: (value) => `${value} ${unit}`,
                  },
                ]
              : y.map((item) => {
                  return {
                    dataKey: item,
                    label: item,
                    valueFormatter: (value) => `${value} ${unit}`,
                  };
                })
          }
          slotProps={{ legend: { hidden: true } }}
        />
      </Box>
    );
  }
}

export function Piechart({ data, x, keys }) {
  const theme = useTheme();
  return (
    <Box my={5} style={{ height: "70vh", display: "flex" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        theme={{
          tooltip: {
            wrapper: {},
            container: {
              background: theme.palette.background.paper,
              color: theme.palette.mode == "dark" ? "#fff" : "#000",
              fontSize: 12,
            },
          },
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.mode == "dark" ? "#fff" : "#000"}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
      />
    </Box>
  );
}

export function Linechart({ data, keys, x, y, unit, param }) {
  const theme = useTheme();

  return (
    <Box my={3} style={{ height: "70vh" }}>
      <LineChart
        unit={unit}
        dataset={data ?? []}
        xAxis={[{ scaleType: "band", dataKey: x }]}
        yAxis={[
          {
            valueFormatter: (value) => `${value}${unit}`, // Adding "$" symbol as unit to the y-axis
          },
        ]}
        series={
          param
            ? [
                {
                  showMark: false,
                  dataKey: param,
                  label: param,
                  valueFormatter: (value) => `${value} ${unit}`,
                },
              ]
            : y.map((item) => {
                return {
                  showMark: false,
                  dataKey: item,
                  label: item,
                  valueFormatter: (value) => `${value} ${unit}`,
                };
              })
        }
        slotProps={{ legend: { hidden: true } }}
      />
    </Box>
  );
}

export function RadarChart({ data, keys, x, y, unit, param }) {
  const theme = useTheme();

  return (
    <Box my={3} style={{ height: "70vh" }}>
      <ResponsiveRadar
        data={data}
        keys={param ? [param] : y}
        indexBy={x}
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        gridLabelOffset={36}
        dotSize={4}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        borderWidth={3}
        backgroundColor={"#fff"}
        borderColor={{ from: "color", modifiers: [["opacity", 1]] }}
        colors={["#02B2AF", "#72ccff", "#0000ff", "#ffff00"]}
        fillOpacity={0.5}
        blendMode="multiply"
        motionConfig="wobbly"
        theme={{
          tooltip: {
            wrapper: {},
            container: {
              background: theme.palette.background.paper,
              color: theme.palette.mode == "dark" ? "#fff" : "#000",
              fontSize: 12,
            },
          },
        }}
      />
    </Box>
  );
}

function getCalendarData(data, key) {
  console.log(key);
  return data.map((item) => ({ day: item.date, value: item[key] }));
}
export function Calendar({ data, keys, start, end, selected }) {
  const theme = useTheme();

  if (data) {
    const selection = keys.map((item) => ({ label: item, key: item }));
    return (
      <Box style={{ width: "100%", paddingTop: "2rem" }}>
        <div style={{ height: "300px" }}>
          <ResponsiveCalendar
            data={selected ? getCalendarData(data, selected) : []}
            from={start}
            to={end}
            style={{ width: "100%" }}
            emptyColor={theme.palette.border.color}
            colors={["#f47560", "#e8c1a0", "#97e3d5", "#61cdbb"]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor={theme.palette.background.default}
            dayBorderWidth={2}
            dayBorderColor={theme.palette.background.default}
            theme={{
              tooltip: {
                wrapper: {},
                container: {
                  background: theme.palette.background.paper,
                  color: theme.palette.mode == "dark" ? "#fff" : "#000",
                  fontSize: 12,
                },
              },
            }}
            legends={[
              {
                anchor: "bottom-right",
                direction: "row",
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: "right-to-left",
              },
            ]}
          />
        </div>
      </Box>
    );
  }
}

export function HeatMap({ data, x, y, processed }) {
  const theme = useTheme();
  console.log(y);

  if (data) {
    const processed_data = data.map((item) => ({
      id: item[x],
      data: y.map((d) => ({ x: d, y: item[d] })),
    }));

    const unitx =
      processed_data.length != 0
        ? Object.keys(processed_data[0].data).length
        : 0;

    return (
      <div style={{ overflowX: "scroll", width: "95%" }}>
        <div
          style={{
            height: `${data.length > 10 ? data.length * 6 : 70}vh`,
            width: `${unitx < 20 ? "80vw" : unitx * 5 + 50 + "vh"}`,
            marginY: "2rem",
          }}
        >
          {unitx != 0 && (
            <ResponsiveHeatMap
              data={processed_data}
              margin={{ top: 60, bottom: 60, left: 90 }}
              valueFormat=">-.2s"
              labelTextColor="#e0e0e0"
              cellBorderWidth={0}
              axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: "",
                legendOffset: 46,
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,

                legendPosition: "middle",
                legendOffset: -72,
                truncateTickAt: 0,
              }}
              colors={{
                type: "diverging",
                scheme: "red_yellow_blue",
                divergeAt: 0.5,
              }}
              theme={{
                tooltip: {
                  wrapper: {},
                  container: {
                    background: theme.palette.background.paper,
                    color: theme.palette.mode == "dark" ? "#fff" : "#000",
                    fontSize: 12,
                  },
                },
                axis: {
                  domain: {
                    line: {
                      stroke: "#777777",
                      strokeWidth: 1,
                    },
                  },
                  legend: {
                    text: {
                      fontSize: 12,
                      fill: "#333333",
                      outlineWidth: 0,
                      outlineColor: "transparent",
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "#777777",
                      strokeWidth: 1,
                    },
                    text: {
                      fontSize: 11,
                      fill: theme.palette.mode == "light" ? "#000" : "#e0e0e0",

                      outlineWidth: 0,
                      outlineColor: "transparent",
                    },
                  },
                },
              }}
              emptyColor="#555555"
              legends={[
                {
                  anchor: "bottom",
                  translateX: 0,
                  translateY: 30,
                  length: 400,
                  thickness: 8,
                  direction: "row",
                  tickPosition: "after",
                  tickSize: 3,
                  tickSpacing: 4,
                  tickOverlap: false,
                  tickFormat: ">-.2s",
                  title: "Value →",
                  titleAlign: "start",
                  titleOffset: 4,
                },
              ]}
            />
          )}
        </div>
      </div>
    );
  }
}

function Metric({ title, value, change, isPositive, number = true }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: "none",
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        minWidth: "18rem",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="semibold">
          {value}
        </Typography>
        {isPositive != null && (
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            color={isPositive ? "green" : "red"}
          >
            {number &&
              (isPositive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
            <Typography variant="body2">
              {number ? (isPositive ? "+" : "-") : ""}
              {change}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export function MetricsContainer({ metrics }) {
  const theme = useTheme();

  if (metrics.length != 0) {
    return (
      <Box
        sx={{
          display: "flex",
          border: "1px solid",
          borderRadius: "8px",
          borderColor: theme.palette.border.color,
          overflowX: "scroll",
          width: "95%",
        }}
      >
        {metrics.map((metric, index) => (
          <Box
            key={metric.title}
            sx={{
              flex: 1,
              position: "relative",
            }}
          >
            {index !== metrics.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "50%",
                  width: "1px",
                  // backgroundColor: '#e0e0e0',
                }}
              />
            )}
            <Metric
              title={metric.title}
              value={metric.value}
              change={metric.change}
              isPositive={metric.isPositive}
              number={metric.number}
            />
          </Box>
        ))}
      </Box>
    );
  } else {
    return (
      <Skeleton
        sx={{ width: "95%", borderRadius: "0.5rem", height: "10rem" }}
        variant="rectangular"
      ></Skeleton>
    );
  }
}

export function Chart({ data, y, type, unit, param }) {
  switch (type) {
    case 0:
      return (
        <Barchart
          param={param}
          unit={data.unit}
          data={data.graph_data}
          x={data.x}
          y={y}
          keys={data.keys}
        ></Barchart>
      );
    case 1:
      if (y || param)
        return (
          <Piechart
            param={param}
            unit={data.unit}
            data={getLabelValueData(data.graph_data, data.x, param ?? y[0])}
            x={data.x}
            y={y}
            keys={data.keys}
          ></Piechart>
        );
    case 2:
      return (
        <Linechart
          param={param}
          unit={data.unit}
          data={data.graph_data}
          x={data.x}
          y={y}
          keys={data.keys}
        ></Linechart>
      );
    case 3:
      return (
        <RadarChart
          param={param}
          unit={data.unit}
          data={data.graph_data}
          x={data.x}
          y={y}
          keys={data.keys}
        ></RadarChart>
      );
    case 4:
      if (data)
        return <HeatMap data={data.graph_data} y={y ?? data.keys} x={data.x} />;
    case 5:
      return (
        <Calendar
          selected={param}
          data={data.graph_data}
          table_data={data.table}
          keys={data.keys}
          start={data.start}
          end={data.end}
        />
      );
  }
}
