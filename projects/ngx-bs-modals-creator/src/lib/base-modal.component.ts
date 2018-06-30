import { OnInit, EventEmitter, OnDestroy, ElementRef } from '@angular/core';

import { CallbackOrPromise, ModalArgs } from './modal-args';

export abstract class BaseModalComponent<TArgument, TResult> implements OnInit, OnDestroy {

  public id: string;
  public closeEvent = new EventEmitter<void>();
  public argument = <TArgument>{};

  private closedByCode = false;
  private modalElement: JQuery;
  private callbackOrPromise: CallbackOrPromise;

  public constructor(protected elementRef: ElementRef) { }

  public ngOnInit(): void {
    this.onModalInit();

    setTimeout(() => {
      this.modalElement = jQuery(this.elementRef.nativeElement).find(`#${this.id}`);

      this.modalElement.on('hidden.bs.modal', () => {
        // HACK: bootstrap modals take 3-400ms delay due to animations
        setTimeout(() => this.closeEvent.emit(), 500);

        if (this.closedByCode) {
          return;
        }
        if (this.callbackOrPromise.reject) {
          this.callbackOrPromise.reject();
        }
      });

      this.modalElement.on('shown.bs.modal', () => this.onModalViewReady());

      this.modalElement.modal();
    });
  }

  public abstract onModalInit(): void;

  public abstract onModalViewReady(): void;

  public abstract onModalDestroy(): void;

  public ngOnDestroy(): void {
    this.onModalDestroy();
  }

  public openModal(args: ModalArgs): void {
    this.argument = args.arg;
    this.id = args.id;
    this.callbackOrPromise = args.callback;
  }

  public closeModalWithResult(result: TResult): void {
    this.closedByCode = true;

    this.modalElement.modal('hide');

    if (this.callbackOrPromise.callback) {
      this.callbackOrPromise.callback(result);
    }
    if (this.callbackOrPromise.resolve) {
      this.callbackOrPromise.resolve(result);
    }
  }

  public closeModal(): void {
    this.closeModalWithResult(undefined);
  }

}
