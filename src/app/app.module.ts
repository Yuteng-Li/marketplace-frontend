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

import { ItemGirdComponent } from './item-gird/item-gird.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';


import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    PreviousOrdersComponent,
    PageNotFoundComponent,
    HomePageComponent,
    CartComponent,
    ItemGirdComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home-page', component: HomePageComponent },
      {path: 'previous-orders', component: PreviousOrdersComponent},
      {path: 'cart', component: CartComponent},
      {path: 'item-gird', component: ItemGirdComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home-page' },
      {path: '**', pathMatch: 'full', component: PageNotFoundComponent},
    ]),
    FormsModule
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
