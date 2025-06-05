import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Zap, Users, Monitor, Headphones, ArrowRight, Info } from 'lucide-angular';

interface StatCard {
  value: string;
  label: string;
  icon: any;
  colorClass: string;
  bgColorClass: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero {
  @Output() scrollToSection = new EventEmitter<string>();

// Iconos importados de Lucide
  readonly ZapIcon = Zap;
  readonly UsersIcon = Users;
  readonly MonitorIcon = Monitor;
  readonly HeadphonesIcon = Headphones;
  readonly ArrowRightIcon = ArrowRight;
  readonly InfoIcon = Info;

// Stats con colores mejorados
  stats: StatCard[] = [
    {
      value: '+300',
      label: 'Mbps Garantizados',
      icon: this.ZapIcon,
      colorClass: 'text-secondary-300',
      bgColorClass: 'bg-secondary-500/20 group-hover:bg-secondary-500/30 border border-secondary-400/30'
    },
    {
      value: '50K+',
      label: 'Clientes Felices',
      icon: this.UsersIcon,
      colorClass: 'text-accent-300',
      bgColorClass: 'bg-accent-500/20 group-hover:bg-accent-500/30 border border-accent-400/30'
    },
    {
      value: '200+',
      label: 'Canales HD',
      icon: this.MonitorIcon,
      colorClass: 'text-primary-300',
      bgColorClass: 'bg-primary-500/20 group-hover:bg-primary-500/30 border border-primary-400/30'
    },
    {
      value: '24/7',
      label: 'Soporte Técnico',
      icon: this.HeadphonesIcon,
      colorClass: 'text-highlight-300',
      bgColorClass: 'bg-highlight-500/20 group-hover:bg-highlight-500/30 border border-highlight-400/30'
    }
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

// Método para obtener clases de gradiente mejoradas
  getGradientClass(label: string): string {
    const gradientMap: { [key: string]: string } = {
      'Mbps Garantizados': 'from-secondary-400/15 to-transparent',
      'Clientes Felices': 'from-accent-400/15 to-transparent',
      'Canales HD': 'from-primary-400/15 to-transparent',
      'Soporte Técnico': 'from-highlight-400/15 to-transparent'
    };

    return gradientMap[label] || 'from-primary-400/10 to-transparent';
  }
}
