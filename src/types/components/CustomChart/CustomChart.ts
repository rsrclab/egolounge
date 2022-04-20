export interface ChartProps {
  id:string,
  tooltipLabelPrefix?: string;
  data: {label: string, number: number}[];
    width?: string;
    height?: string;
  }