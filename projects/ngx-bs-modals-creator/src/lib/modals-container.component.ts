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

  private componentRefs: ComponentRef<BaseModalComponent<any, any>>[] = [];
  private openModalSub: Subscription;
  private clearAllModalsSub: Subscription;

  @ViewChild('modalAnchor', { read: ViewContainerRef }) modalAnchor: ViewContainerRef;

  public constructor(private modalSvc: ModalsService) { }

  public ngOnInit(): void {
    this.openModalSub = this.modalSvc.openModalEvt.subscribe(arg => this.createModal(arg));
    this.clearAllModalsSub = this.modalSvc.clearAllModalsEvt.subscribe(() => this.closeAllModals());
  }

  public ngOnDestroy(): void {
    if (this.openModalSub) {
      this.openModalSub.unsubscribe();
    }
    if (this.clearAllModalsSub) {
      this.clearAllModalsSub.unsubscribe();
    }
  }

  private createModal<TModal>(modalArgs: ModalArgs): ComponentRef<Type<TModal>> {
    if (modalArgs.clearPreviousModals) {
      this.closeAllModals();
    }

    const modalComponentFactory = modalArgs.componentFactoryResolver.resolveComponentFactory(modalArgs.type);
    const modalComponentRef = this.modalAnchor.createComponent(modalComponentFactory);

    this.componentRefs.push(modalComponentRef);

    (<BaseModalComponent<any, any>>modalComponentRef.instance).openModal(modalArgs);
    (<BaseModalComponent<any, any>>modalComponentRef.instance).closeEvent.subscribe(() => {
      this.componentRefs.splice(this.componentRefs.indexOf(modalComponentRef, 1));
      modalComponentRef.destroy();
    });

    return modalComponentRef;
  }

  private closeAllModals(): void {
    this.componentRefs.forEach(componentRef => componentRef.instance.closeModal());
    this.modalAnchor.clear();
  }

}
