import { OnInit, EventEmitter, OnDestroy, ElementRef } from '@angular/core';

import { CallbackOrPromise, ModalArgs } from './modal-args';

export abstract class BaseModalComponent<TArgument, TResult> implements OnInit, OnDestroy {

  public id: string;
  public closeEvent = new EventEmitter<void>();
  public argument = <TArgument>{};

  private modalElement: JQuery;
  private callbackOrPromise: CallbackOrPromise;
  private pendingResult: TResult;

  public constructor(protected elementRef: ElementRef) { }

  public ngOnInit(): void {
    this.onModalInit();

    setTimeout(() => {
      this.modalElement = jQuery(this.elementRef.nativeElement).find(`#${this.id}`);

      this.modalElement.on('hidden.bs.modal', () => {
        setTimeout(() => this.closeEvent.emit(), 500); // HACK: bootstrap modals take 3-400ms delay due to animations
        this.resolveCallbacks(this.pendingResult);
      });

      this.modalElement.on('shown.bs.modal', () => this.onModalViewReady());

      this.modalElement.modal();
    });
  }

  public ngOnDestroy(): void {
    this.onModalDestroy();
  }

  public abstract onModalInit(): void;

  public abstract onModalViewReady(): void;

  public abstract onModalDestroy(): void;

  public openModal(args: ModalArgs): void {
    this.argument = args.arg;
    this.id = args.id;
    this.callbackOrPromise = args.callback;
  }

  public closeModal(result?: TResult): void {
    this.pendingResult = result;
    this.modalElement.modal('hide');
  }

  private resolveCallbacks(result?: TResult): void {
    if (this.callbackOrPromise.callback) {
      this.callbackOrPromise.callback(result);
    }
    if (this.callbackOrPromise.resolve) {
      this.callbackOrPromise.resolve(result);
    }
  }

}
