import { Box } from "@chakra-ui/react";
import { Pie } from "@nivo/pie";

import { AutoSizer as _AutoSizer, AutoSizerProps } from "react-virtualized";

type Data = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;

const PieChart = ({ data }: { data: Data[] }) => {
  return (
    <Box minW="30rem" minH="30rem">
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <Pie
            height={height}
            width={width}
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
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "flight_emissions",
                },
                id: "dots",
              },
              {
                match: {
                  id: "truck_emissions",
                },
                id: "lines",
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </AutoSizer>
    </Box>
  );
};

export default PieChart;
