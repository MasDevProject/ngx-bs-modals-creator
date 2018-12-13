import { Component, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { BaseModalComponent, ModalsService } from 'ngx-bs-modals-creator';

import { SecondModalComponent } from '../second-modal/second-modal.component';

@Component({
  templateUrl: './my-modal.component.html'
})
export class MyModalComponent extends BaseModalComponent<string, string> {

  public constructor(
    elementRef: ElementRef,
    private modalSvc: ModalsService,
    private cfr: ComponentFactoryResolver) {
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
    this.closeModal('I\'m the result of the first modal');
  }

  public openSecondModal(): void {
    this.modalSvc.show('snd', SecondModalComponent, this.cfr, null, null, true);
  }

}
