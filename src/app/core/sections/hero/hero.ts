import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  value: string;
  label: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero {
  @Output() scrollToSection = new EventEmitter<string>();

  stats: StatCard[] = [
    { value: '+300', label: 'Mbps Garantizados' },
    { value: '50K+', label: 'Clientes Felices' },
    { value: '200+', label: 'Canales HD' },
    { value: '24/7', label: 'Soporte Técnico' }
  ];

  onScrollToSection(sectionId: string): void {
    this.scrollToSection.emit(sectionId);
  }

  onViewPackages(): void {
    this.scrollToSection.emit('paquetes');
  }

  onLearnMore(): void {
    this.scrollToSection.emit('features');
  }
}
