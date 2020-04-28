import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentListComponent } from './components/instrument-list/instrument-list.component';
import { InstrumentCardComponent } from './components/instrument-card/instrument-card.component';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentListComponent,
    InstrumentCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
