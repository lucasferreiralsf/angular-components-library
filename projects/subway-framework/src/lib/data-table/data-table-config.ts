export interface IDataTableColumnNamesInterface {
  columnNameApi: string;
  displayName: string;
  type: IColumnNameTypes;
  enumDisplayName?: IEnumDisplayName[];
}

export interface IEnumDisplayName {
  elementName: any;
  displayName: string;
  colors: { background: string; color: string };
}

export enum IColumnNameTypes {
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

export interface IDataType {
  currentPage?: number;
  pageSize?: number;
  results: IDataTableInputDataInterface[];
  rowCount?: number;
  total?: number;
}
export interface IDataTableInputDataInterface {
  id: number;
  actions: IDataTableActionsInterface;
}

export interface IDataTableActionsInterface {
  actionName: string;
  actionDescription: string;
  actionIcon: string;
  actionFunction: any;
  disabled: boolean;
  isVisible: boolean;
  isDelete?: boolean;
  isDeleteTitle?: string;
  isDeleteDescription?: string;
}

export interface IDataTableTopActionButtonInterface {
  actionName: string;
  eventSlug: string;
  buttonType: string;
  buttonColor?: string;
}
