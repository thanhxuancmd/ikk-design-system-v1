import {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  Line,
  Bar,
  Area,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { designTokens } from '@/constants/design-tokens';

interface AppleChartProps {
  variant: 'line' | 'bar' | 'area' | 'pie';
  data: any[];
  dataKey: string;
  categoryKey?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  color?: string;
  labelKey?: string;
}

const PIE_COLORS = [
  '#ff0086',
  '#ff4da6',
  '#e60078',
  '#cc006a',
  '#ff66b3',
  '#ff80c0',
  '#ff99cc',
  '#ffb3d9',
];

const formatVietnameseNumber = (value: number): string => {
  return value.toLocaleString('vi-VN');
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`bg-white p-3 ${designTokens.borderRadius.md} ${designTokens.shadows.lg} border-2`}
        style={{ borderColor: designTokens.colors.primary.DEFAULT }}
      >
        {label && (
          <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
        )}
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-gray-700">
            <span style={{ color: entry.color }}>●</span>{' '}
            {entry.name}: {formatVietnameseNumber(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function AppleChart({
  variant,
  data,
  dataKey,
  categoryKey,
  height = 300,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  color = designTokens.colors.primary.DEFAULT,
  labelKey,
}: AppleChartProps) {
  const gridStroke = designTokens.colors.neutral[200];
  const axisColor = designTokens.colors.neutral[500];

  const axisStyle = {
    fontSize: 12,
    fill: axisColor,
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />}
        {categoryKey && <XAxis dataKey={categoryKey} tick={axisStyle} />}
        <YAxis tick={axisStyle} tickFormatter={formatVietnameseNumber} />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6 }}
          fill="url(#lineGradient)"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />}
        {categoryKey && <XAxis dataKey={categoryKey} tick={axisStyle} />}
        <YAxis tick={axisStyle} tickFormatter={formatVietnameseNumber} />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />}
        {categoryKey && <XAxis dataKey={categoryKey} tick={axisStyle} />}
        <YAxis tick={axisStyle} tickFormatter={formatVietnameseNumber} />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill="url(#areaGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={labelKey || 'name'}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

  const chartRenderers = {
    line: renderLineChart,
    bar: renderBarChart,
    area: renderAreaChart,
    pie: renderPieChart,
  };

  return (
    <div data-testid={`apple-chart-${variant}`}>
      {chartRenderers[variant]()}
    </div>
  );
}
