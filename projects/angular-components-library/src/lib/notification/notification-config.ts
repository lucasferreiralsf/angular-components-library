import { AlertType } from '../toastr/toastr-config';

export enum PopoverDirectionEnum {
  'top',
  'right',
  'bottom',
  'left'
}

export interface Notification {
  id: number;
  title: string;
  description?: string;
  date: Date;
  isVisualized: boolean;
  imageUrl?: string;
  icon?: string;
  content?: string;
  type: AlertType;
}
