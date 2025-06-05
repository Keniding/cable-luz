import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
  styleUrls: ['./back-to-top.scss']
})
export class BackToTop {
  @Input() showBackToTop = false;
  @Output() scrollToTop = new EventEmitter<void>();

  onScrollToTop(): void {
    this.scrollToTop.emit();
  }
}
