import { useState, useEffect } from "react";
import { sort } from "../../../utils/sort";
import styled from "styled-components";

const Rect = styled.rect<{ $isOpen }>`
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transform-origin: bottom left;
  transform: scale(${(props) => (props.$isOpen ? 1 : 0)});
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s ease;
`;

const BarChart = ({
  data = [],
  x_key = "month",
  y_key = "value",
  barWidth = 20,
  barColor = "#a73ab1",
  barOpacity = "1",
  onClick,
  threeD = true,
  threeDWidthX = 2,
  threeDWidthY = 5,
  showTooltips = true,
  useBarGradient = true,
  height: containerHeight = 300,
  width: containerWidth = 600,
  backgroundColor = "transparent",
  svgBackgroundColor = "transparent",
  axisStrokeColor = "#000",
  axisStrokeWidth = 1,
  axisCircleRadius = 5,
  axisCircleFill = "#000",
  axisCircleStroke = "red",
  axisCircleStrokeWidth = 1,
  axisCircleOpacity = 0.8,
  useGradientBackground = true,
  backgroundBorderRadius = 10,
  x_axis_config = {
    textAnchor: "middle",
    fontSize: 12,
    fill: "#000",
    rotation: -45,
    fontWeight: 600,
  },
  y_axis_config = {
    textAnchor: "end",
    fontSize: 12,
    fill: "#000",
    fontWeight: 600,
  },
  bar_gradient_config = {
    stop1: {
      offset: 0,
      stopColor: "#3172de",
      stopOpacity: 0.8,
    },
    stop2: {
      offset: 1,
      stopColor: "#648dd1",
      stopOpacity: 0.3,
    },
  },
  gradient_backgroundConfig = {
    stop1: {
      offset: 0,
      stopColor: "#6491d9",
      stopOpacity: 1,
    },
    stop2: {
      offset: 1,
      stopColor: "#35578f",
      stopOpacity: 1,
    },
  },
  bar_gradient_backgroundConfig = {
    stop1: {
      offset: 0,
      stopColor: "red",
      stopOpacity: 1,
    },
    stop2: {
      offset: 1,
      stopColor: "green",
      stopOpacity: 1,
    },
  },
  tooltip_config = {
    tooltipFill: "#ffffff",
    tooltipBorderRadius: 7,
    fontSize: 12,
    fontWeight: "400",
    textAnchor: "middle",
  },
}) => {
  const [yAxisLabels, setYAxisLabels] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const x_margin = 50;
  const y_margin = 50;

  useEffect(() => {
    // const yKeys = data.map(item => item[y_key])
    const yAxisData = sort(data, y_key);
    setYAxisLabels(yAxisData);
    setTimeout(() => {
      setIsOpen(true);
    }, 200);
  }, []);

  const calculateWidth = () => {
    const chartWidth = containerWidth - x_margin * 2;
    const gap_between_ticks = chartWidth / data.length;
    return {
      chartWidth,
      gap_between_ticks,
    };
  };

  const newShade = (hexColor: string, magnitude: number) => {
    hexColor = hexColor.replace("#", "");
    if (hexColor.length === 6) {
      const decimalColor = parseInt(hexColor, 16);
      let r = (decimalColor >> 16) + magnitude;
      r > 255 && (r = 255);
      r < 0 && (r = 0);
      let g = (decimalColor && 0x0000ff) + magnitude;
      g > 255 && (g = 255);
      g < 0 && (g = 0);
      let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
      b > 255 && (b = 255);
      b < 0 && (b = 0);
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
      return hexColor;
    }
  };

  const calculateHeight = () => {
    const yMax = data.reduce((acc, cur) => {
      return cur[y_key] > acc ? cur[y_key] : acc;
    }, 0);
    // const yMin = data.reduce((acc, cur) => {
    //     return cur[y_key] < acc ? cur[y_key] : acc
    // }, Number.POSITIVE_INFINITY)

    const min = 0;
    const actualChartHeight = containerHeight - y_margin * 2;
    const gap_between_ticks = actualChartHeight / (data.length - 1);
    const y_value_gap = yMax - min / data.length - 1;
    return { yMax, min, gap_between_ticks, y_value_gap };
  };

  const renderBackground = () => {
    return (
      <g>
        <rect
          x={0}
          y={0}
          height={containerHeight}
          width={containerWidth}
          fill={`url(#gradientback)`}
          rx={backgroundBorderRadius}
        />
      </g>
    );
  };

  const render_x_axis = () => {
    return (
      <g key={`x-axis`}>
        <circle
          cx={x_margin}
          cy={containerHeight - y_margin}
          r={axisCircleRadius}
          fill={axisCircleFill}
          stroke={axisCircleStroke}
          strokeWidth={axisCircleStrokeWidth}
          opacity={axisCircleOpacity}
        />
        <circle
          cx={containerWidth - x_margin}
          cy={containerHeight - y_margin}
          r={axisCircleRadius}
          fill={axisCircleFill}
          stroke={axisCircleStroke}
          strokeWidth={axisCircleStrokeWidth}
          opacity={axisCircleOpacity}
        />

        <line
          x1={x_margin}
          y1={containerHeight - y_margin}
          x2={containerWidth - x_margin}
          y2={containerHeight - y_margin}
          strokeWidth={axisStrokeWidth}
          stroke={axisStrokeColor}
        />
      </g>
    );
  };

  const render_y_axis = () => {
    return (
      <g key={`y_axis`}>
        <circle
          cx={x_margin}
          cy={y_margin}
          r={axisCircleRadius}
          fill={axisCircleFill}
          stroke={axisCircleStroke}
          strokeWidth={axisCircleStrokeWidth}
          opacity={axisCircleOpacity}
        />
        <line
          x1={x_margin}
          y1={y_margin}
          x2={x_margin}
          y2={containerHeight - y_margin}
          strokeWidth={axisStrokeWidth}
          stroke={axisStrokeColor}
        />
      </g>
    );
  };

  const render_x_axis_ticks = () => {
    const { gap_between_ticks } = calculateWidth();

    return data.map((item, index) => {
      const x = x_margin * 2 + gap_between_ticks * index;
      const y = containerHeight - y_margin;
      return (
        <g key={`x_axi_ticks-${index}`}>
          <line
            x1={x}
            y1={y}
            x2={x}
            y2={y + 10}
            stroke={axisStrokeColor}
            strokeWidth={axisStrokeWidth}
            opacity={1}
          />
        </g>
      );
    });
  };

  const render_x_axis_labels = () => {
    const { gap_between_ticks } = calculateWidth();
    const { fontSize, fill, textAnchor, fontWeight } = x_axis_config;
    return data.map((item, index) => {
      const x = x_margin * 2 + gap_between_ticks * index;
      const y = containerHeight - y_margin + 10 + fontSize;
      return (
        <g key={`x_axis_labels-${index}`}>
          <text
            x={x}
            y={y}
            origin={`${x}, ${y}`}
            fontSize={fontSize}
            textAnchor={textAnchor}
            fontWeight={fontWeight}
            fill={fill}
          >
            {item[x_key]}
          </text>
        </g>
      );
    });
  };

  const render_y_axis_ticks = () => {
    const { gap_between_ticks } = calculateHeight();
    return data.map((item, index) => {
      const y = containerHeight - y_margin - gap_between_ticks * index;
      return (
        <g key={`y_axis_ticks_${index}`}>
          <line
            x1={x_margin}
            y1={y}
            x2={x_margin - 10}
            y2={y}
            stroke={axisStrokeColor}
            strokeWidth={axisStrokeWidth}
            opacity={1}
          />
        </g>
      );
    });
  };

  const render_y_axis_labels = () => {
    const { gap_between_ticks, min, yMax } = calculateHeight();
    const { fill, fontSize, fontWeight, textAnchor } = y_axis_config;
    const x = x_margin - 10;
    return yAxisLabels.map((item, index) => {
      const y = containerHeight - y_margin - gap_between_ticks * index;
      const dataPoints = data.length - 1;
      const textValue = min + (yMax / dataPoints) * index;
      return (
        <g key={`y_axis_labels_${index}`}>
          <text
            x={x}
            y={y + fontSize / 3}
            origin={`${x}, ${y}`}
            textAnchor={textAnchor}
            fontWeight={fontWeight}
            fontSize={fontSize}
            fill={fill}
          >
            {textValue}
          </text>
        </g>
      );
    });
  };

  const render_bars = () => {
    const { gap_between_ticks: y_gap, yMax, y_value_gap } = calculateHeight();
    const { gap_between_ticks: x_gap } = calculateWidth();
    const y = containerHeight - y_margin;

    let barShadowColor = newShade(barColor, 20);
    if (useBarGradient) {
      barShadowColor = newShade(bar_gradient_config.stop1.stopColor, 20);
    }

    return data.map((item, index) => {
      const x = x_margin * 2 + x_gap * index;
      const height = (yMax - item[y_key]) * (y_gap / y_value_gap) + y_margin;
      const barHeight = containerHeight - y_margin - height;

      if (useBarGradient) {
        barShadowColor = newShade(bar_gradient_config.stop1.stopColor, 20);
        return (
          <g key={`bars-${index}`}>
            {threeD ? (
              <path
                d={`
                  M ${x - barWidth / 2}, ${y}
                  L ${x - barWidth - threeDWidthX}, ${y - threeDWidthY}
                  L ${x - barWidth - threeDWidthX}, ${
                  y - threeDWidthY - barHeight
                }
                  L ${x + barWidth - threeDWidthX * 10} , ${
                  y - threeDWidthY - barHeight
                }
              L ${x + barWidth - threeDWidthX * 5},  ${y - barHeight}
              L ${x + barWidth / 2}, ${y}
                Z`}
                strokeWidth={0}
                fill={barShadowColor}
                opacity={1}
              />
            ) : null}
            {threeD ? (
              <line
                x1={x - barWidth / 2}
                y1={y - barHeight}
                x2={x - barWidth - threeDWidthX}
                y2={y - barHeight - threeDWidthY}
                strokeWidth={1}
                stroke={"#000"}
                opacity={1}
              />
            ) : null}
            <rect
              x={x - barWidth / 2}
              y={y - barHeight}
              height={barHeight}
              width={barWidth}
              fill={"url(#barGradient)"}
              opacity={barOpacity}
              onClick={() => onClick(item)}
            />
          </g>
        );
      } else {
        return (
          <g key={`bars-${index}`}>
            {threeD ? (
              <path
                d={`
                  M ${x - barWidth / 2}, ${y}
                  L ${x - barWidth - threeDWidthX}, ${y - threeDWidthY}
                  L ${x - barWidth - threeDWidthX}, ${
                  y - threeDWidthY - barHeight
                }
                  L ${x + barWidth - threeDWidthX * 10} , ${
                  y - threeDWidthY - barHeight
                }
              L ${x + barWidth - threeDWidthX * 5},  ${y - barHeight}
              L ${x + barWidth / 2}, ${y}
                Z`}
                strokeWidth={0}
                fill={barShadowColor}
                opacity={1}
              />
            ) : null}
            {threeD ? (
              <line
                x1={x - barWidth / 2}
                y1={y - barHeight}
                x2={x - barWidth - threeDWidthX}
                y2={y - barHeight - threeDWidthY}
                strokeWidth={1}
                stroke={"#000"}
                opacity={1}
              />
            ) : null}
            <rect
              x={x - barWidth / 2}
              y={y - barHeight}
              height={barHeight}
              width={barWidth}
              fill={barColor}
              opacity={barOpacity}
              onClick={() => onClick(item)}
            />
          </g>
        );
      }
    });
  };

  const render_toolTips = () => {
    const { gap_between_ticks: yGap, yMax, y_value_gap } = calculateHeight();
    const { gap_between_ticks: xGap } = calculateWidth();

    return data.map((item, index) => {
      const x = x_margin * 2 + xGap * index;
      const y = (yMax - item[y_key]) * (yGap / y_value_gap) + y_margin;
      return (
        <g key={`tooltip-${index}`}>
          <text
            x={x}
            y={y - 5}
            textAnchor={tooltip_config.textAnchor}
            fontWeight={tooltip_config.fontWeight}
            fontSize={tooltip_config.fontSize}
            fill={tooltip_config.tooltipFill}
            opacity={1}
          >
            {item[y_key]}
          </text>
        </g>
      );
    });
  };

  const mainContainer = {
    height: containerHeight,
    width: containerWidth,
    backgroundColor: backgroundColor,
    margin: "0 auto",
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
  };
  const svgContainer = {
    backgroundColor: svgBackgroundColor,
    borderRadius: "10px",
  };

  return (
    <div style={mainContainer}>
      <svg height="100%" width="100%" style={svgContainer}>
        <linearGradient
          id="gradientback"
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={0}
          y2={containerHeight}
        >
          <stop
            offset={gradient_backgroundConfig.stop1.offset}
            stopColor={gradient_backgroundConfig.stop1.stopColor}
            stopOpacity={gradient_backgroundConfig.stop1.stopOpacity}
          />
          <stop
            offset={gradient_backgroundConfig.stop2.offset}
            stopColor={gradient_backgroundConfig.stop2.stopColor}
            stopOpacity={gradient_backgroundConfig.stop2.stopOpacity}
          />
        </linearGradient>
        <linearGradient
          id="barGradient"
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={0}
          y2={containerHeight}
        >
          <stop
            offset={bar_gradient_backgroundConfig.stop1.offset}
            stopColor={bar_gradient_backgroundConfig.stop1.stopColor}
            stopOpacity={bar_gradient_backgroundConfig.stop1.stopOpacity}
          />
          <stop
            offset={bar_gradient_backgroundConfig.stop2.offset}
            stopColor={bar_gradient_backgroundConfig.stop2.stopColor}
            stopOpacity={bar_gradient_backgroundConfig.stop2.stopOpacity}
          />
        </linearGradient>
        {useGradientBackground ? renderBackground() : null}
        {render_x_axis()}
        {render_y_axis()}
        {data && data.length > 0 && render_x_axis_ticks()}
        {data && data.length > 0 && render_x_axis_labels()}
        {data && data.length > 0 && render_y_axis_ticks()}
        {data && data.length > 0 && render_y_axis_labels()}
        {data && data.length > 0 && render_bars()}
        {data && data.length > 0 && showTooltips && render_toolTips()}
      </svg>
    </div>
  );
};

export default BarChart;
