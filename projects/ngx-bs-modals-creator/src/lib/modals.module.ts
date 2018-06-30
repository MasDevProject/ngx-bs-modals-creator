import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ModalsService } from './modals.service';
import { ModalsContainerComponent } from './modals-container.component';


@NgModule({
  imports: [],
  providers: [
    ModalsService
  ],
  declarations: [
    ModalsContainerComponent
  ],
  exports: [
    ModalsContainerComponent
  ]
})
export class ModalsModule {

  constructor(@Optional() @SkipSelf() parentModule: ModalsModule) {
    if (parentModule) {
      throw new Error('ModalsModule is already loaded. Import it in the AppModule only');
    }
  }

}
