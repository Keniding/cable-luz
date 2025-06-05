import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-coverage-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, InputTextModule],
  template: `
  <div class="min-h-screen bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Cobertura CableLuz</h1>
        <p class="text-xl text-gray-600">Verifica si tenemos cobertura en tu zona</p>
      </div>

      <p-card>
        <div class="text-center p-8">
          <i class="pi pi-map text-6xl text-blue-500 mb-4"></i>
          <h2 class="text-2xl font-bold mb-4">Consulta tu Cobertura</h2>
          <div class="max-w-md mx-auto">
            <input pInputText placeholder="Ingresa tu dirección" class="w-full mb-4" />
            <p-button label="Verificar Cobertura" class="w-full" />
          </div>
        </div>
      </p-card>
    </div>
  </div>
`
})
export class CoveragePageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Cobertura - CableLuz',
      description: 'Verifica si tenemos cobertura de internet fibra óptica en tu zona.',
      keywords: 'cobertura internet, fibra optica cobertura, internet disponible'
    });
  }
}
