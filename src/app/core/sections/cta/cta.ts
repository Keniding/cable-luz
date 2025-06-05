import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.html',
  styleUrls: ['./cta.scss']
})
export class Cta {
  @Input() showCtaBanner = false;
  @Output() hideBanner = new EventEmitter<void>();
  @Output() contractNow = new EventEmitter<void>();

  onHideBanner(): void {
    this.hideBanner.emit();
  }

  onContractNow(): void {
    this.contractNow.emit();
  }
}
