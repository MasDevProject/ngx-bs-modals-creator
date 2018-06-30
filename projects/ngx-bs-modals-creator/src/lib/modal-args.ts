import { Type, ComponentFactoryResolver } from '@angular/core';

export interface ModalArgs {
  id: string;
  arg: any;
  callback: CallbackOrPromise;
  type: Type<any>;
  componentFactoryResolver: ComponentFactoryResolver;
  clearPreviousModals: boolean;
}

export interface CallbackOrPromise {
  callback: (res) => void;
  resolve: (res) => void;
  reject: () => void;
}
