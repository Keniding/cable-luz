import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule],
  template: `
  <div class="min-h-screen bg-gray-50 py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h1>
        <p class="text-xl text-gray-600">Descubre todos los servicios que tenemos para ti</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <p-card routerLink="/servicios/internet" class="cursor-pointer hover:shadow-lg transition-shadow">
          <ng-template pTemplate="header">
            <div class="text-center p-6 bg-blue-50">
              <i class="pi pi-wifi text-5xl text-blue-500"></i>
            </div>
          </ng-template>
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">Internet Fibra Óptica</h3>
            <p class="text-gray-600">Velocidades de hasta 1000 Mbps con tecnología de fibra óptica</p>
          </div>
        </p-card>

        <p-card routerLink="/servicios/cable-tv" class="cursor-pointer hover:shadow-lg transition-shadow">
          <ng-template pTemplate="header">
            <div class="text-center p-6 bg-green-50">
              <i class="pi pi-desktop text-5xl text-green-500"></i>
            </div>
          </ng-template>
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">Cable TV HD</h3>
            <p class="text-gray-600">Más de 300 canales en alta definición y contenido premium</p>
          </div>
        </p-card>

        <p-card routerLink="/servicios/telefonia" class="cursor-pointer hover:shadow-lg transition-shadow">
          <ng-template pTemplate="header">
            <div class="text-center p-6 bg-purple-50">
              <i class="pi pi-phone text-5xl text-purple-500"></i>
            </div>
          </ng-template>
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">Telefonía Digital</h3>
            <p class="text-gray-600">Llamadas ilimitadas a nivel nacional e internacional</p>
          </div>
        </p-card>
      </div>
    </div>
  </div>
`
})
export class ServicesPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Servicios - CableLuz',
      description: 'Conoce todos nuestros servicios: Internet fibra óptica, Cable TV HD y Telefonía digital.',
      keywords: 'servicios internet, cable tv, telefonia, fibra optica'
    });
  }
}
