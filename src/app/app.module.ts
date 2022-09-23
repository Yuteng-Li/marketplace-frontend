import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


import { CategoriesComponent } from './categories/categories.component';
import { ItemGirdComponent } from './item-gird/item-gird.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';


import {HttpClientModule} from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {  GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';

import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    PreviousOrdersComponent,
    PageNotFoundComponent,
    HomePageComponent,
    CreditCardComponent,
    PaymentFormComponent,
    CartComponent,
    CategoriesComponent,
    ItemGirdComponent,
    LoginComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'home-page', component: HomePageComponent },
      {path: 'previous-orders', component: PreviousOrdersComponent},
      {path: 'cart', component: CartComponent},
      {path: 'credit-card', component: CreditCardComponent},
      {path: 'payment-form', component: PaymentFormComponent},
      {path: 'login', component: LoginComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'item-gird', component: ItemGirdComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home-page' },
      {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
    ]),
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '693100612539-rtft5b065kqn934urifpj10j075ebm3n.apps.googleusercontent.com'
          )
        }],
    } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
