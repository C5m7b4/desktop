// const { innerWidth: width, innerHeight: height } = window;
import { useState, useEffect } from "react";
import { sortInts } from "../../../utils/sort";

const Linechart = ({
  data = [],
  x_key = "month",
  y_key = "value",
  curve = true,
  seriesStroke = "blue",
  seriesStrokeWidth = 2,
  onClick,
  lineCircleRadius = 5,
  axisStrokeColor = "#000",
  axisStrokeWidth = 1,
  axisCircleRadius = 5,
  axisCircleFill = "#000",
  axisCircleStroke = "red",
  axisCircleStrokeWidth = 1,
  axisCircleOpacity = 0.8,
  height: containerHeight,
  width: containerWidth,
  backgroundColor = "transparent",
  svgBackgroundColor = "transparent",
  useGradientBackground = true,
  backgroundBorderRadius = 10,
  lineCircleStroke = "#000",
  lineCircleStrokeWidth = 1,
  lineCircleFill = "red",
  lineGradient = true,
  showHorizontalLines = true,
  horizontalLineOpacity = 0.2,
  showVerticalLines = true,
  verticalLineOpacity = 0.2,
  showTooltips = true,
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
  gradient_shadowConfig = {
    stop1: {
      offset: 0,
      stopColor: "#648dd1",
      stopOpacity: 1,
    },
    stop2: {
      offset: 1,
      stopColor: "#3172de",
      stopOpacity: 1,
    },
  },
  x_axis_config = {
    textAnchor: "center",
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
  tooltip_config = {
    tooltipHeight: 20,
    tooltipWidth: 40,
    tooltipFill: "#ffffff",
    tooltipBorderRadius: 7,
    fontSize: 12,
    fontWeight: "400",
    textAnchor: "middle",
  },
}) => {
  const x_margin = 50;
  const y_margin = 50;

  const [yAxisLabels, setYAxisLabels] = useState([]);

  useEffect(() => {
    const yKeys = data.map((item) => item[y_key]);
    const yAxisData = sortInts(yKeys);
    setYAxisLabels(yAxisData);
  }, []);

  const calculateWidth = () => {
    const chartWidth = containerWidth - x_margin * 2;
    const gap_between_ticks = chartWidth / (data.length - 1);
    return {
      chartWidth,
      gap_between_ticks,
    };
  };

  const calculateHeight = () => {
    const yMax = data.reduce((acc, curr) => {
      return curr[y_key] > acc ? curr[y_key] : acc;
    }, 0);
    const yMin = data.reduce((acc, curr) => {
      return curr[y_key] < acc ? curr[y_key] : acc;
    }, yMax);
    let min = 0;
    const actualChartHeight = containerHeight - y_margin * 2;
    const gap_between_ticks = actualChartHeight / (data.length - 1);
    const y_value_gap = (yMax - min) / (data.length - 1);
    return {
      yMax,
      yMin,
      min,
      actualChartHeight,
      gap_between_ticks,
      y_value_gap,
    };
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
      const x = x_margin + gap_between_ticks * index;
      const y = containerHeight - y_margin;
      return (
        <g key={`x_axis_ticks-${index}`}>
          <line
            x1={x}
            y1={y}
            x2={x}
            y2={y + 10}
            stroke={axisStrokeColor}
            strokeWidth={axisStrokeWidth}
          />
        </g>
      );
    });
  };

  const render_x_axis_labels = () => {
    const { gap_between_ticks } = calculateWidth();
    return data.map((item, index) => {
      const x = x_margin + gap_between_ticks * index;
      const y = containerHeight - y_margin + 10 + x_axis_config.fontSize;
      return (
        <g key={`x_axis_label_${index}`}>
          <text
            x={x}
            y={y}
            textAnchor={x_axis_config.textAnchor}
            fontSize={x_axis_config.fontSize}
            fill={x_axis_config.fill}
            fontWeight={x_axis_config.fontWeight}
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
            strokeWidth={axisStrokeWidth}
            stroke={axisStrokeColor}
          />
        </g>
      );
    });
  };

  const render_y_axis_labels = () => {
    const { gap_between_ticks, min, yMax } = calculateHeight();
    const x = x_margin - 13;

    return yAxisLabels.map((item, index) => {
      const y = containerHeight - y_margin - gap_between_ticks * index;
      const dataPoints = data.length - 1;
      const textValue = min + (yMax / dataPoints) * index;
      return (
        <g key={`y_axis_labels-${index}`}>
          <text
            x={x}
            y={y + y_axis_config.fontSize / 2}
            textAnchor={y_axis_config.textAnchor}
            fontWeight={y_axis_config.fontWeight}
            fontSize={y_axis_config.fontSize}
            fill={y_axis_config.fill}
          >
            {textValue}
          </text>
        </g>
      );
    });
  };

  const render_line_circles = () => {
    const { gap_between_ticks: x_gap } = calculateWidth();
    const { gap_between_ticks: y_gap, yMax, y_value_gap } = calculateHeight();
    const {
      tooltipWidth,
      tooltipHeight,
      tooltipFill,
      tooltipBorderRadius,
      fontSize,
      fontWeight,
      textAnchor,
    } = tooltip_config;
    return data.map((item, index) => {
      const x = x_margin + x_gap * index;
      const y = (yMax - item[y_key]) * (y_gap / y_value_gap) + y_margin;

      return (
        <g key={`chart-circles-${index}`}>
          <circle
            cx={x}
            cy={y}
            r={5}
            stroke={lineCircleStroke}
            strokeWidth={lineCircleStrokeWidth}
            fill={lineCircleFill}
            onClick={() => onClick(item)}
          />
          {showTooltips ? (
            <g key={`tooltip-${index}`}>
              <line
                x1={x}
                y1={y - lineCircleRadius / 2}
                x2={x}
                y2={y - lineCircleRadius / 2 - 10}
                stroke={"#000000"}
                strokeWidth={2}
                opacity={0.8}
              />
              <rect
                x={x - tooltipWidth / 2}
                y={y - lineCircleRadius / 2 - tooltipHeight - 10}
                width={tooltipWidth}
                height={tooltipHeight}
                fill={tooltipFill}
                rx={tooltipBorderRadius}
                opacity={1}
                onClick={() => onClick(item)}
              />
              <text
                x={x}
                y={y - lineCircleRadius / 2 - tooltipHeight / 2 - 5}
                fontSize={fontSize}
                fontWeight={fontWeight}
                textAnchor={textAnchor}
              >
                {item[y_key]}
              </text>
            </g>
          ) : null}
        </g>
      );
    });
  };

  const getDPath = () => {
    const { gap_between_ticks: x_gap } = calculateWidth();
    const { gap_between_ticks: y_gap, yMax, y_value_gap } = calculateHeight();
    let dPath = "";
    let prevX = 0;
    let prevY = 0;

    data.map((item, index) => {
      let x = x_margin + x_gap * index;
      let y = (yMax - item[y_key]) * (y_gap / y_value_gap) + y_margin;
      if (curve) {
        if (index == 0) {
          dPath += `M ${x} ${y}`;
          prevX = x;
          prevY = y;
        } else {
          const x_splitter = (x - prevX) / 4;
          const y_splitter = (y - prevY) / 2;
          dPath +=
            ` Q ${prevX + x_splitter}, ${prevY}, ${prevX + x_splitter * 2}, ${
              prevY + y_splitter
            }` +
            ` Q ${prevX + x_splitter * 3}, ${
              prevY + y_splitter * 2
            }, ${x}, ${y}`;
          prevX = x;
          prevY = y;
        }
      } else {
        if (index === 0) {
          dPath += `M ${x}, ${y}`;
        } else {
          dPath += `L ${x}, ${y}`;
        }
      }
    });

    return dPath;
  };

  const render_series = () => {
    const dPath = getDPath();
    return (
      <path
        d={dPath}
        strokeWidth={seriesStrokeWidth}
        stroke={seriesStroke}
        fill={"transparent"}
      />
    );
  };

  const render_line_gradient = () => {
    let dPath = getDPath();
    dPath += `L ${containerWidth - x_margin}, ${
      containerHeight - y_margin
    } L ${x_margin}, ${containerHeight - y_margin} Z`;
    return <path d={dPath} fill={`url(#fillshadow)`} strokeWidth={0} />;
  };

  const render_horizontal_lines = () => {
    const { gap_between_ticks } = calculateHeight();
    return data.map((item, index) => {
      const y = containerHeight - y_margin - gap_between_ticks * index;
      return (
        <g key={`horizontal_lines_${index}`}>
          <line
            x1={x_margin}
            y1={y}
            x2={containerWidth - x_margin}
            y2={y}
            stroke={axisStrokeColor}
            strokeWidth={axisStrokeWidth}
            opacity={horizontalLineOpacity}
          />
        </g>
      );
    });
  };

  const render_vertical_lines = () => {
    const { gap_between_ticks } = calculateWidth();
    return data.map((item, index) => {
      const x = x_margin + gap_between_ticks * index;
      return (
        <g key={`vertical_lines_${index}`}>
          <line
            x1={x}
            y1={containerHeight - y_margin}
            x2={x}
            y2={y_margin}
            stroke={axisStrokeColor}
            strokeWidth={axisStrokeWidth}
            opacity={verticalLineOpacity}
          />
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
  };
  const svgContainer = {
    backgroundColor: svgBackgroundColor,
  };

  return (
    <div style={mainContainer}>
      <svg height="100%" width="100%" style={svgContainer}>
        <defs>
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
            id="fillshadow"
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={0}
            y2={containerHeight}
          >
            <stop
              offset={gradient_shadowConfig.stop1.offset}
              stopColor={gradient_shadowConfig.stop1.stopColor}
              stopOpacity={gradient_shadowConfig.stop1.stopOpacity}
            />
            <stop
              offset={gradient_shadowConfig.stop2.offset}
              stopColor={gradient_shadowConfig.stop2.stopColor}
              stopOpacity={gradient_shadowConfig.stop2.stopOpacity}
            />
          </linearGradient>
        </defs>
        {useGradientBackground ? renderBackground() : null}
        {render_x_axis()}
        {render_y_axis()}
        {data &&
          data.length > 0 &&
          showHorizontalLines &&
          render_horizontal_lines()}
        {data &&
          data.length > 0 &&
          showVerticalLines &&
          render_vertical_lines()}
        {data && data.length > 0 && lineGradient && render_line_gradient()}
        {data && data.length > 0 && render_x_axis_ticks()}
        {data && data.length > 0 && render_x_axis_labels()}
        {data && data.length > 0 && render_y_axis_ticks()}
        {data && data.length > 0 && render_y_axis_labels()}
        {data && data.length > 0 && render_line_circles()}
        {data && data.length > 0 && render_series()}
      </svg>
    </div>
  );
};

export default Linechart;
