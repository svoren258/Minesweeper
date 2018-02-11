import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { ButtonComponent } from './button/button.component';
import { WindowService } from './window.service';


@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
