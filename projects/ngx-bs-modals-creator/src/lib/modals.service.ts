import { Injectable, EventEmitter, ComponentFactoryResolver } from '@angular/core';

import { ModalArgs } from './modal-args';

@Injectable()
export class ModalsService {

  public openModalEvt = new EventEmitter<ModalArgs>();

  public constructor() { }

  public show(
    id: string,
    type: any,
    componentFactoryResolver: ComponentFactoryResolver,
    args: any = null,
    cb: (res) => void = null,
    clearPreviousModals = true): void {

    this.openModalEvt.emit({
      arg: args,
      clearPreviousModals: clearPreviousModals,
      id: id,
      componentFactoryResolver: componentFactoryResolver,
      type: type,
      callback: {
        callback: cb,
        reject: undefined,
        resolve: undefined
      }
    });
  }

  public showAsync<TResult>(
    id: string,
    type: any,
    componentFactoryResolver: ComponentFactoryResolver,
    args: any = null,
    clearPreviousModals = true): Promise<TResult> {
    return new Promise((resolve, reject) => {
      this.openModalEvt.emit({
        arg: args,
        clearPreviousModals: clearPreviousModals,
        id: id,
        componentFactoryResolver: componentFactoryResolver,
        type: type,
        callback: {
          callback: undefined,
          reject: reject,
          resolve: resolve
        }
      });
    });
  }

}
