import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  @Input() isScrolled = false;
  @Input() isMobileMenuOpen = false;
  @Output() toggleMobileMenu = new EventEmitter<void>();
  @Output() scrollToSection = new EventEmitter<string>();

  onToggleMobileMenu(): void {
    this.toggleMobileMenu.emit();
  }

  onScrollToSection(sectionId: string): void {
    this.scrollToSection.emit(sectionId);
  }
}
