import { Component, OnInit } from '@angular/core';
import { AppCommonService } from '../Service/app-common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public appCommonService: AppCommonService) { }


  ngOnInit() {
    this.fetchFruitList();
  }


  fetchFruitList() {
    this.appCommonService.getFruitList().subscribe((res: any) => {
      if(res){
        this.appCommonService.FruitList = res;
      }
    })
  }


  addFruitToTable(fruit: any) {
    debugger
    const existingFruit = this.appCommonService.TableData.find((item: any) => item.id === fruit.id);
    if (existingFruit) {
      existingFruit.quantity += 1;
      existingFruit.total = existingFruit.price * existingFruit.quantity;
    }
    else {
      this.appCommonService.TableData.push({ ...fruit, quantity: 1, total: fruit.price });
    }
    this.appCommonService.subTotal = this.appCommonService.TableData.reduce((total: any, item: any) => total + item.total, 0);
    this.appCommonService.totalItems = this.appCommonService.TableData.reduce((quantity: any, item: any) => quantity + item.quantity, 0);
    this.getVATValue();
    this.getDiscountValue();
    this.getTotal();
  }


  decreaseQuantity(data: any) {
    const updatedTableData = this.appCommonService.TableData.map((item: any) => {
      if (item.id === data.id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.total = item.price * item.quantity;
          this.appCommonService.subTotal = this.appCommonService.subTotal - item.price;
          this.appCommonService.totalItems = this.appCommonService.totalItems - 1;
          this.getVATValue();
          this.getDiscountValue();
          this.getTotal();
        } else {
          alert("Quantity can't be less than 1");
        }
      }
      return item;
    });
    this.appCommonService.TableData = updatedTableData;
  }


  increaseQuantity(data: any) {
    debugger
    const updatedTableData = this.appCommonService.TableData.map((item: any) => {
      if (item.id === data.id) {
        if (item.quantity > 0) {
          item.quantity += 1;
          item.total = item.price * item.quantity;
          this.appCommonService.subTotal = this.appCommonService.subTotal + item.price;
          this.appCommonService.totalItems = this.appCommonService.totalItems + 1;
          this.getVATValue();
          this.getDiscountValue();
          this.getTotal();
        }
      }
      return item;
    });

    this.appCommonService.TableData = updatedTableData;
  }


  removeData(data: any) {
    const index = this.appCommonService.TableData.findIndex((item: any) => item.id === data.id);

    if (index !== -1) {
      this.appCommonService.subTotal = this.appCommonService.subTotal - (data.price * data.quantity);
      this.appCommonService.totalItems = this.appCommonService.totalItems - data.quantity;
      this.getVATValue();
      this.getDiscountValue();
      this.getTotal();
      this.appCommonService.TableData.splice(index, 1);
    }
  }


  getVATValue() {
    this.appCommonService.VATValue = this.appCommonService.VAT / 100 * this.appCommonService.subTotal;
    this.getTotal();
  }


  getDiscountValue() {
    this.appCommonService.DiscountValue = this.appCommonService.Discount / 100 * this.appCommonService.subTotal;
    this.getTotal();
  }

  getTotal() {
    this.appCommonService.Total = this.appCommonService.subTotal + this.appCommonService.VATValue + this.appCommonService.DiscountValue;
  }


  cancelSale() {
    this.appCommonService.TableData = [];
    this.appCommonService.Total = 0;
    this.appCommonService.subTotal = 0;
    this.appCommonService.totalItems = 0;
    this.appCommonService.Discount = 0;
    this.appCommonService.DiscountValue = 0;
    this.appCommonService.VAT = 0;
    this.appCommonService.VATValue = 0
  }


  isModalOpen: boolean = false;

  openModal(): void {
    this.appCommonService.saleNumber = this.appCommonService.saleNumber + 1;
  if(this.appCommonService.TableData.length > 0){
    this.isModalOpen = true;
  }
  else{
    this.appCommonService.errorSnackbar = true;
    setTimeout(() => {
      this.appCommonService.errorSnackbar = false;
    }, 2000);
    this.appCommonService.Snackbar = false;
  }
  }

  closeModal(): void {
    this.appCommonService.TableData = [];
    this.appCommonService.Total = 0;
    this.appCommonService.subTotal = 0;
    this.appCommonService.totalItems = 0;
    this.appCommonService.Discount = 0;
    this.appCommonService.DiscountValue = 0;
    this.appCommonService.VAT = 0;
    this.appCommonService.VATValue = 0
    this.isModalOpen = false;
    this.appCommonService.Snackbar = true;

    setTimeout(() => {
      this.appCommonService.Snackbar = false;
    }, 2000);
  }


  generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 0.7)`;
  }
}
