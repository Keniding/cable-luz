import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Zap, Menu, X, ArrowRight, Home, Package, MessageCircle, Phone } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  @Input() isScrolled = false;
  @Input() isMobileMenuOpen = false;
  @Output() toggleMobileMenu = new EventEmitter<void>();
  @Output() scrollToSection = new EventEmitter<string>();

// Iconos importados de Lucide
  readonly ZapIcon = Zap;
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly ArrowRightIcon = ArrowRight;
  readonly HomeIcon = Home;
  readonly PackageIcon = Package;
  readonly MessageCircleIcon = MessageCircle;
  readonly PhoneIcon = Phone;

// Elementos de navegación con iconos
  navItems = [
    { id: 'inicio', label: 'Inicio', icon: this.HomeIcon },
    { id: 'paquetes', label: 'Paquetes', icon: this.PackageIcon },
    { id: 'testimonios', label: 'Testimonios', icon: this.MessageCircleIcon },
    { id: 'contacto', label: 'Contacto', icon: this.PhoneIcon }
  ];

  onToggleMobileMenu(): void {
    this.toggleMobileMenu.emit();
  }

  onScrollToSection(sectionId: string): void {
    this.scrollToSection.emit(sectionId);
  }

  onContractService(): void {
    this.scrollToSection.emit('contacto');
  }
}
