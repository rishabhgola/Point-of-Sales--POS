import { Component, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppCommonService } from '../Service/app-common.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter();
  currentDate!: Date;

  constructor(private el: ElementRef, public appCommonService: AppCommonService) { }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
    this.currentDate = new Date();
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }

  onModalClick(event: Event): void {
    if (event.target === this.el.nativeElement) {
      this.closeModal.emit();
    }
  }

}
