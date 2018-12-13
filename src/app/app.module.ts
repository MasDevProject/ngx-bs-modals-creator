import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from 'ngx-bs-modals-creator';

import { AppComponent } from './app.component';
import { MyModalComponent } from './my-modal/my-modal.component';
import { SecondModalComponent } from './second-modal/second-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MyModalComponent,
    SecondModalComponent
  ],
  imports: [
    BrowserModule,
    ModalsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MyModalComponent,
    SecondModalComponent
  ]
})
export class AppModule { }
