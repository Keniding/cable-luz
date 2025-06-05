import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';

// Home Components
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { FeaturesGridComponent } from '../../components/features-grid/features-grid.component';
import { PackagesSectionComponent } from '../../components/packages-section/packages-section.component';
import { StatsSectionComponent } from '../../components/stats-section/stats-section.component';
import { QuickCtaComponent } from '../../components/quick-cta/quick-cta.component';

// Services
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    DividerModule,
    TagModule,
    BadgeModule,
    ChipModule,
    TabViewModule,
    HeroSectionComponent,
    FeaturesGridComponent,
    PackagesSectionComponent,
    StatsSectionComponent,
    QuickCtaComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <app-hero-section />
      </section>

      <!-- Features Grid -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <p-chip
              label="✨ Características Premium"
              class="mb-4"
              styleClass="bg-blue-100 text-blue-800"
            />
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas incluido
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Disfruta de la mejor experiencia de internet con tecnología de punta y servicios premium
            </p>
          </div>
          <app-features-grid />
        </div>
      </section>

      <!-- Quick CTA Banner -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <app-quick-cta />
        </div>
      </section>

      <!-- Packages Section -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <p-chip
              label="📦 Planes Disponibles"
              class="mb-4"
              styleClass="bg-green-100 text-green-800"
            />
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Encuentra tu plan perfecto
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde navegación básica hasta gaming profesional, tenemos el plan ideal para ti
            </p>
          </div>
          <app-packages-section />
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <p-chip
              label="📊 Nuestros Números"
              class="mb-4"
              styleClass="bg-purple-100 text-purple-800"
            />
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resultados que hablan por sí solos
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Miles de clientes confían en nosotros para mantenerse conectados
            </p>
          </div>
          <app-stats-section />
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="py-16 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <p-chip
              label="💬 Testimonios"
              class="mb-4"
              styleClass="bg-white/20 text-white"
            />
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Experiencias reales de personas que confían en CableLuz
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (testimonial of testimonials; track testimonial.id) {
              <p-card class="h-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div class="text-center">
                  <div class="mb-4">
                    @for (star of [1,2,3,4,5]; track star) {
                      <i class="pi pi-star-fill text-yellow-400 text-lg"></i>
                    }
                  </div>
                  <p class="text-gray-300 mb-6 italic">
                    "{{ testimonial.comment }}"
                  </p>
                  <div class="flex items-center justify-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {{ testimonial.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-semibold text-white">{{ testimonial.name }}</p>
                      <p class="text-sm text-gray-400">{{ testimonial.plan }}</p>
                    </div>
                  </div>
                </div>
              </p-card>
            }
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para la mejor conexión?
          </h2>
          <p class="text-xl mb-8 text-blue-100">
            Únete a miles de clientes satisfechos y disfruta del internet más rápido del Perú
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <p-button
              label="Ver Todos los Planes"
              icon="pi pi-arrow-right"
              [raised]="true"
              size="large"
              styleClass="bg-white text-blue-600 hover:bg-gray-100 border-white"
              routerLink="/planes"
            />

            <p-button
              label="Hablar con un Asesor"
              icon="pi pi-phone"
              [outlined]="true"
              size="large"
              styleClass="border-white text-white hover:bg-white/10"
              (onClick)="contactAdvisor()"
            />
          </div>

          <div class="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
            <div class="flex items-center space-x-2">
              <i class="pi pi-check-circle text-green-400"></i>
              <span>Instalación gratuita</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-check-circle text-green-400"></i>
              <span>Sin permanencia</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-check-circle text-green-400"></i>
              <span>Soporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .p-card {
        transition: all 0.3s ease;
      }

      .p-card:hover {
        transform: translateY(-4px);
      }

      .p-chip {
        font-weight: 600;
      }
    }
  `]
})
export class HomePageComponent implements OnInit {

  private seoService = inject(SeoService);

  testimonials = [
    {
      id: 1,
      name: 'María González',
      plan: 'Plan Popular 300 Mbps',
      comment: 'Increíble velocidad y estabilidad. Perfecto para trabajar desde casa y ver Netflix en 4K sin interrupciones.'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      plan: 'Plan Premium 600 Mbps',
      comment: 'El mejor servicio de internet que he tenido. La instalación fue rápida y el soporte técnico es excelente.'
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      plan: 'Plan Ultra 1000 Mbps',
      comment: 'Gaming sin lag y streaming simultáneo en múltiples dispositivos. Definitivamente recomendado.'
    }
  ];

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'CableLuz - Internet Fibra Óptica de Alta Velocidad en Perú',
      description: 'Internet fibra óptica hasta 1000 Mbps, Cable TV HD, instalación gratuita y soporte 24/7. La mejor conexión para tu hogar.',
      keywords: 'internet fibra optica, cable tv, internet rapido peru, wifi, streaming',
      ogTitle: 'CableLuz - El Internet Más Rápido del Perú',
      ogDescription: 'Fibra óptica hasta tu hogar con velocidades de hasta 1000 Mbps. Instalación gratis y soporte 24/7.',
      ogImage: '/assets/images/og-home.jpg'
    });
  }

  contactAdvisor(): void {
    // Open contact modal or start chat
    console.log('Contact advisor clicked');
  }
}
