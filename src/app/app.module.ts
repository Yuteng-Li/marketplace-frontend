import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddressFormComponent } from './address-form/address-form.component';

// Reactive Forms imports
import { ReactiveFormsModule, FormsModule , FormBuilder, FormGroup } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PreviousOrdersComponent,
    PageNotFoundComponent,
    HomePageComponent,
    AddressFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([

      {path: 'previous-orders', component: PreviousOrdersComponent},
      {path: 'home-page', component: HomePageComponent },
      {path: 'address-form', component: AddressFormComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home-page' },
      {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
