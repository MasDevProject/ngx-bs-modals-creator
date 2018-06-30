import { Component, ViewContainerRef, Type, ComponentRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalsService } from './modals.service';
import { ModalArgs } from './modal-args';
import { BaseModalComponent } from './base-modal.component';

@Component({
  selector: 'bdc-modals-container',
  template: '<ng-template #modalAnchor></ng-template>',
})
export class ModalsContainerComponent implements OnInit, OnDestroy {

  private openModalSub: Subscription;

  @ViewChild('modalAnchor', { read: ViewContainerRef }) modalAnchor: ViewContainerRef;

  public constructor(private modalSvc: ModalsService) { }

  public ngOnInit(): void {
    this.modalSvc.openModalEvt.subscribe(arg => this.createModal(arg));
  }

  public ngOnDestroy(): void {
    if (this.openModalSub) {
      this.openModalSub.unsubscribe();
    }
  }

  private createModal<TModal>(modalArgs: ModalArgs): ComponentRef<Type<TModal>> {
    if (modalArgs.clearPreviousModals) {
      this.modalAnchor.clear();
    }

    const modalComponentFactory = modalArgs.componentFactoryResolver.resolveComponentFactory(modalArgs.type);
    const modalComponentRef = this.modalAnchor.createComponent(modalComponentFactory);

    (<BaseModalComponent<any, any>>modalComponentRef.instance).openModal(modalArgs);
    (<BaseModalComponent<any, any>>modalComponentRef.instance).closeEvent.subscribe(() => modalComponentRef.destroy());

    return modalComponentRef;
  }

}
