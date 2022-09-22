import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviousOrdersComponent,
    PageNotFoundComponent,
    HomePageComponent,
    CreditCardComponent,
    PaymentFormComponent,
    CartComponent,
    CategoriesComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home-page', component: HomePageComponent },
      {path: 'previous-orders', component: PreviousOrdersComponent},
      {path: 'cart', component: CartComponent},
      {path: 'credit-card', component: CreditCardComponent},
      {path: 'payment-form', component: PaymentFormComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home-page' },
      {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
    ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
