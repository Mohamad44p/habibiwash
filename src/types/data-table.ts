export type Column<T> = {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};
