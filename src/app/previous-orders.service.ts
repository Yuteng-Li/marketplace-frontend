import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PREVIOUSORDERS } from './mock-previous-orders';

@Injectable({
  providedIn: 'root'
})
export class PreviousOrdersService {

  constructor() { }

    /**
   * Gets prevOrders from backend
   * -REFACTOR WITH HTTP GET WITH PROVIDED ENDPOINT-
   * @returns Observable with list of previous-orders from api
   */
     getPreviousOrders(): Observable<any[]>{
      const prevOrders = of(PREVIOUSORDERS);
      return prevOrders;
    }
}



