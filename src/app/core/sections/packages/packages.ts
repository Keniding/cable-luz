import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Package, Star, Check, ArrowRight, Shield, Clock, Headphones, Zap, Wifi, Monitor } from 'lucide-angular';

interface Package {
  name: string;
  price: string;
  originalPrice: string;
  savings: string;
  features: string[];
  popular: boolean;
}

interface Benefit {
  title: string;
  description: string;
  icon: any;
  cleanColorClass: string;
  cleanBgClass: string;
  cleanBorderClass: string;
}

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './packages.html',
  styleUrls: ['./packages.scss']
})
export class Packages {
  @Output() contractPackage = new EventEmitter<string>();

// Iconos de Lucide
  readonly PackageIcon = Package;
  readonly StarIcon = Star;
  readonly CheckIcon = Check;
  readonly ArrowRightIcon = ArrowRight;
  readonly ShieldIcon = Shield;
  readonly ClockIcon = Clock;
  readonly HeadphonesIcon = Headphones;
  readonly ZapIcon = Zap;
  readonly WifiIcon = Wifi;
  readonly MonitorIcon = Monitor;

  packages: Package[] = [
    {
      name: 'Básico',
      price: 'S/99',
      originalPrice: 'S/119',
      savings: 'Ahorra S/20',
      features: [
        'Internet 150 Mbps simétrico',
        '150 canales HD',
        '2 decodificadores 4K',
        'WiFi 6 incluido',
        '3 meses de Netflix',
        'Soporte técnico 24/7',
        'Instalación gratuita'
      ],
      popular: false
    },
    {
      name: 'Avanzado',
      price: 'S/129',
      originalPrice: 'S/159',
      savings: 'Ahorra S/30',
      features: [
        'Internet 300 Mbps simétrico',
        '180 canales HD + 4K',
        '3 decodificadores 4K',
        'WiFi Mesh avanzado',
        '6 meses de Netflix + HBO Max',
        'DVR 200 horas',
        'Control parental avanzado',
        'Soporte prioritario'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: 'S/159',
      originalPrice: 'S/209',
      savings: 'Ahorra S/50',
      features: [
        'Internet 600 Mbps simétrico',
        '200+ canales HD + 4K',
        '4 decodificadores 4K',
        'WiFi Mesh profesional',
        '1 año Netflix + HBO + Disney+',
        'DVR ilimitado',
        'Control parental premium',
        'Soporte VIP 24/7'
      ],
      popular: false
    }
  ];

  benefits: Benefit[] = [
    {
      title: 'Garantía Total',
      description: '30 días de garantía o te devolvemos tu dinero',
      icon: this.ShieldIcon,
      cleanColorClass: 'text-green-200',
      cleanBgClass: 'bg-green-400/15',
      cleanBorderClass: 'border-green-300/25'
    },
    {
      title: 'Instalación Rápida',
      description: 'Instalación en 24 horas o menos',
      icon: this.ClockIcon,
      cleanColorClass: 'text-blue-200',
      cleanBgClass: 'bg-blue-400/15',
      cleanBorderClass: 'border-blue-300/25'
    },
    {
      title: 'Soporte 24/7',
      description: 'Atención técnica especializada siempre disponible',
      icon: this.HeadphonesIcon,
      cleanColorClass: 'text-purple-200',
      cleanBgClass: 'bg-purple-400/15',
      cleanBorderClass: 'border-purple-300/25'
    }
  ];

  onContractPackage(packageName: string): void {
    this.contractPackage.emit(packageName);
  }

// Métodos glassmorphism limpio
  getPackageIcon(packageName: string): any {
    const iconMap: { [key: string]: any } = {
      'Básico': this.WifiIcon,
      'Avanzado': this.ZapIcon,
      'Premium': this.MonitorIcon
    };
    return iconMap[packageName] || this.PackageIcon;
  }

  getCleanIconBgClass(packageName: string): string {
    const bgMap: { [key: string]: string } = {
      'Básico': 'bg-blue-400/15 border-blue-300/25',
      'Avanzado': 'bg-orange-400/15 border-orange-300/25',
      'Premium': 'bg-purple-400/15 border-purple-300/25'
    };
    return bgMap[packageName] || 'bg-slate-400/15 border-slate-300/25';
  }

  getCleanIconColorClass(packageName: string): string {
    const colorMap: { [key: string]: string } = {
      'Básico': 'text-blue-200',
      'Avanzado': 'text-orange-200',
      'Premium': 'text-purple-200'
    };
    return colorMap[packageName] || 'text-slate-200';
  }

// PRECIOS LIMPIOS Y RESALTADOS (SIN BRILLO EXCESIVO)
  getCleanPriceClass(packageName: string): string {
    const priceMap: { [key: string]: string } = {
      'Básico': 'text-blue-100 drop-shadow-lg',
      'Avanzado': 'text-orange-100 drop-shadow-lg',
      'Premium': 'text-purple-100 drop-shadow-lg'
    };
    return priceMap[packageName] || 'text-blue-100 drop-shadow-lg';
  }

  getCleanButtonClass(isPopular: boolean): string {
    if (isPopular) {
      return 'bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-300/30 text-white hover:from-orange-400/25 hover:to-orange-500/25 hover:border-orange-300/40';
    }
    return 'bg-gradient-to-r from-blue-400/20 to-purple-400/20 border-blue-300/30 text-white hover:from-blue-400/25 hover:to-purple-400/25 hover:border-blue-300/40';
  }

  getCleanGradientBgClass(packageName: string): string {
    const gradientMap: { [key: string]: string } = {
      'Básico': 'bg-gradient-to-br from-blue-400/8 to-blue-600/8',
      'Avanzado': 'bg-gradient-to-br from-orange-400/8 to-orange-600/8',
      'Premium': 'bg-gradient-to-br from-purple-400/8 to-purple-600/8'
    };
    return gradientMap[packageName] || 'bg-gradient-to-br from-blue-400/8 to-blue-600/8';
  }
}
