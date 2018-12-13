import { Component, ElementRef } from '@angular/core';
import { BaseModalComponent } from 'ngx-bs-modals-creator';

@Component({
  templateUrl: './second-modal.component.html'
})
export class SecondModalComponent extends BaseModalComponent<string, string> {

  public constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  public onModalInit(): void {
    console.log('Second Modal init');
  }

  public onModalViewReady(): void {
    console.log('Second Modal view ready');
  }

  public onModalDestroy(): void {
    console.log('Second Modal destroy');
  }

  public done(): void {
    this.closeModal('I\'m the result of the Second modal');
  }

}
