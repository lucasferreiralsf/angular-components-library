import { InjectionToken } from '@angular/core';

export class Alert {
  type: AlertType;
  message: string;
  id: number;
  status: string;
  onHover: any;
  autoHide: boolean;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export interface ToastConfig {
  position?: {
      top: number;
      right: number;
  };
  animation?: {
      fadeOut: number;
      fadeIn: number;
  };
  animationTimeOut?: number;
  onHover?: boolean;
  autoHide?: boolean;
  showFromBottom?: boolean;
  colors?: {success?: string, error?: string, info?: string, warning?: string};
}

export const defaultToastConfig: ToastConfig = {
  position: {
      top: 20,
      right: 20,
  },
  animation: {
      fadeOut: 2500,
      fadeIn: 300,
  },
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
