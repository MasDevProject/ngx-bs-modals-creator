import { Component, ComponentFactoryResolver } from '@angular/core';
import { ModalsService } from 'ngx-bs-modals-creator';

import { MyModalComponent } from './my-modal/my-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private modalsSvc: ModalsService, private componentFactoryResolver: ComponentFactoryResolver) {}

  public openModal(): void {
    this.modalsSvc.showAsync('fd', MyModalComponent, this.componentFactoryResolver, 'I\'m the argument')
      .then(res => alert('The result is: ' + res))
      .catch(() => alert('Modal close from user'));
  }

}
