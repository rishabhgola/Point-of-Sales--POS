import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {

  FruitList: any = [];
  TableData: any = [];
  subTotal: any = 0;
  totalItems: any = 0;
  VAT: any = 0;
  VATValue: any = 0;
  Discount: any = 0;
  DiscountValue: any = 0;
  Total: any = 0;
  Snackbar = false;
  errorSnackbar = false;
  saleNumber: any = 0o0;

  constructor(private http: HttpClient) { }

  getFruitList(){
    return this.http.get('http://localhost:3000/data');
  }


}
