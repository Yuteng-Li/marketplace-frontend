import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


import { CategoriesComponent } from './categories/categories.component';
import { ItemGirdComponent } from './item-gird/item-gird.component';
import { LoginComponent } from './login/login.component';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

import {AddressFormComponent} from "./address-form/address-form.component";
import { ConfirmOrderGuard } from './confirm-order/confirm-order.guard';


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
    AddressFormComponent,
    SearchBarComponent,
    NavBarComponent,
    ConfirmOrderComponent,
    OrderDetailsComponent,
    CheckoutComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      {path: 'home-page', component: HomePageComponent },
      {path: 'order-details/:id', component:OrderDetailsComponent},
      {path: 'previous-orders', component: PreviousOrdersComponent, canActivate: [AuthGuard]},
      {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
      {path: 'credit-card', component: CreditCardComponent, canActivate: [AuthGuard]},
      {path: 'payment-form', component: PaymentFormComponent, canActivate: [AuthGuard]},
      {path: 'address-form', component: AddressFormComponent,  canActivate: [AuthGuard] },
      {path: 'login', component: LoginComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'item-gird', component: ItemGirdComponent},
      {path: 'confirm-order', component: ConfirmOrderComponent, canActivate: [AuthGuard, ConfirmOrderGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
      {path: '', pathMatch: 'full', redirectTo: 'home-page' },
      {path: '**', pathMatch: 'full', component: PageNotFoundComponent},
      {path: '', component: SearchBarComponent}
    ]),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SocialLoginModule

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
        onError: (err) => {
          console.error(err);
        }
    } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
