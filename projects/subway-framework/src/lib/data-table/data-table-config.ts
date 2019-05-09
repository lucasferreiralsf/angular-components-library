export interface DataTableColumnNamesInterface {
  columnNameApi: string;
  displayName: string;
  type: ColumnNameTypes;
  enumDisplayName?: EnumDisplayName[];
}

export interface EnumDisplayName {
  elementName: any;
  displayName: string;
  colors: { background: string; color: string };
}

export enum ColumnNameTypes {
  'yes_no',
  'true_false',
  'status',
  'cpf',
  'cnpj',
  'cpf_cnpj',
  'date',
  'select',
  'actions',
  'default'
}

export interface DataType {
  currentPage?: number;
  pageSize?: number;
  results: DataTableInputDataInterface[];
  rowCount?: number;
  total?: number;
}
export interface DataTableInputDataInterface {
  id: number;
  actions: DataTableActionsInterface;
}

export interface DataTableActionsInterface {
  actionName: string;
  actionDescription: string;
  actionIcon: string;
  actionFunction: any;
  isDelete?: boolean;
  isDeleteTitle?: string;
  isDeleteDescription?: string;
}

export interface DataTableTopActionButtonInterface {
  actionName: string;
  eventSlug: string;
  buttonType: string;
  buttonColor?: string;
}
