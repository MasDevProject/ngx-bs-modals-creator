import { Component, ElementRef } from '@angular/core';
import { BaseModalComponent } from 'ngx-bs-modals-creator';

@Component({
  templateUrl: './my-modal.component.html'
})
export class MyModalComponent extends BaseModalComponent<string, string> {

  public constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public onModalInit(): void {
    console.log('Modal init');
  }

  public onModalViewReady(): void {
    console.log('Modal view ready');
  }

  public onModalDestroy(): void {
    console.log('Modal destroy');
  }

  public done(): void {
    this.closeModalWithResult('I\'m the result of the first modal');
  }

}
