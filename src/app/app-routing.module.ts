import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Route for search 
  // { path: 'item-grid/:searchTerm', component: ItemGridSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
      ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
