import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Package {
  name: string;
  price: string;
  originalPrice: string;
  savings: string;
  features: string[];
  popular: boolean;
}

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages.html',
  styleUrls: ['./packages.scss']
})
export class Packages {
  @Output() contractPackage = new EventEmitter<string>();

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
        'Soporte técnico 24/7'
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
        '180 canales HD',
        '3 decodificadores 4K',
        'WiFi Mesh avanzado',
        '6 meses de Netflix + HBO Max',
        'DVR 200 horas',
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
        '200+ canales HD',
        '4 decodificadores 4K',
        'WiFi Mesh profesional',
        '1 año de Netflix + HBO Max + Disney+',
        'DVR ilimitado',
        'Control parental avanzado',
        'Soporte VIP 24/7'
      ],
      popular: false
    }
  ];

  onContractPackage(packageName: string): void {
    this.contractPackage.emit(packageName);
  }
}
