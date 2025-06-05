import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { SkeletonModule } from 'primeng/skeleton';
import { ImageModule } from 'primeng/image';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';

// Services
import { SeoService } from '../../core/services/seo.service';

// Child Components
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { StatsSectionComponent } from './components/stats-section/stats-section.component';
import { QuickCtaComponent } from './components/quick-cta/quick-cta.component';
import { FeaturesGridComponent } from './components/features-grid/features-grid.component';
import { PackagesSectionComponent } from './components/packages-section/packages-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    SkeletonModule,
    ImageModule,
    RippleModule,
    TagModule,
    // Child Components
    HeroSectionComponent,
    StatsSectionComponent,
    QuickCtaComponent,
    FeaturesGridComponent,
    PackagesSectionComponent
  ],
  template: `
  <!-- Bento Grid Container -->
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">

    <!-- Main Bento Grid -->
    <div class="bento-grid max-w-7xl mx-auto p-4 md:p-6 lg:p-8 gap-4 md:gap-6">

      <!-- Hero Section - Full Width, Tall -->
      <div class="bento-item hero-item bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden relative">
        @if (isLoading()) {
          <div class="p-8 space-y-4">
            <p-skeleton height="3rem" class="mb-4" />
            <p-skeleton height="1.5rem" class="mb-2" />
            <p-skeleton height="1.5rem" width="80%" class="mb-6" />
            <p-skeleton height="3rem" width="200px" />
          </div>
        } @else {
          <app-hero-section />
        }
      </div>

      <!-- Stats Section - Medium Width -->
      <div class="bento-item stats-item bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
        @if (isLoading()) {
          <div class="p-6 space-y-4">
            <p-skeleton height="2rem" width="60%" class="mb-4" />
            <div class="grid grid-cols-2 gap-4">
              <p-skeleton height="4rem" />
              <p-skeleton height="4rem" />
              <p-skeleton height="4rem" />
              <p-skeleton height="4rem" />
            </div>
          </div>
        } @else {
          <app-stats-section />
        }
      </div>

      <!-- Quick CTA - Small -->
      <div class="bento-item cta-item bg-gradient-to-r from-green-500 to-emerald-600 text-white overflow-hidden relative">
        @if (isLoading()) {
          <div class="p-6 text-center space-y-3">
            <p-skeleton height="2rem" width="80%" class="mb-3" />
            <p-skeleton height="2.5rem" width="120px" class="mx-auto" />
          </div>
        } @else {
          <app-quick-cta />
        }
      </div>

      <!-- Features Grid - Large, Tall -->
      <div class="bento-item features-item bg-white dark:bg-gray-800 shadow-lg">
        @if (isLoading()) {
          <div class="p-6 space-y-4">
            <p-skeleton height="2rem" width="50%" class="mb-6" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (item of [1,2,3,4]; track item) {
                <div class="space-y-3">
                  <p-skeleton shape="circle" size="3rem" />
                  <p-skeleton height="1.5rem" />
                  <p-skeleton height="1rem" width="80%" />
                </div>
              }
            </div>
          </div>
        } @else {
          <app-features-grid />
        }
      </div>

      <!-- Packages Section - Full Width -->
      <div class="bento-item packages-item bg-white dark:bg-gray-800 shadow-lg">
        @if (isLoading()) {
          <div class="p-6 space-y-6">
            <p-skeleton height="2rem" width="40%" class="mb-6" />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              @for (item of [1,2,3]; track item) {
                <div class="space-y-4">
                  <p-skeleton height="12rem" />
                  <p-skeleton height="1.5rem" />
                  <p-skeleton height="1rem" width="60%" />
                  <p-skeleton height="2.5rem" />
                </div>
              }
            </div>
          </div>
        } @else {
          <app-packages-section />
        }
      </div>

      <!-- Additional Bento Items -->

      <!-- Testimonial Preview -->
      <div class="bento-item testimonial-item bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
        <p-card class="h-full border-none shadow-none bg-transparent">
          <ng-template pTemplate="header">
            <div class="p-4 pb-0">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i class="pi pi-heart text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 dark:text-white">Testimonios</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Lo que dicen nuestros clientes</p>
                </div>
              </div>
            </div>
          </ng-template>

          <div class="px-4 pb-4">
            <blockquote class="text-sm text-gray-700 dark:text-gray-300 italic mb-3">
              "El mejor servicio de internet que he tenido. Velocidad constante y soporte excelente."
            </blockquote>
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400">María González</span>
              <div class="flex space-x-1">
                @for (star of [1,2,3,4,5]; track star) {
                  <i class="pi pi-star-fill text-yellow-400 text-xs"></i>
                }
              </div>
            </div>
          </div>
        </p-card>
      </div>

      <!-- Coverage Map Preview -->
      <div class="bento-item coverage-item bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900">
        <p-card class="h-full border-none shadow-none bg-transparent">
          <ng-template pTemplate="header">
            <div class="p-4 pb-0">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <i class="pi pi-map text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 dark:text-white">Cobertura</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">¿Llegamos a tu zona?</p>
                </div>
              </div>
            </div>
          </ng-template>

          <div class="px-4 pb-4 text-center">
            <div class="mb-3">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-2">
                <i class="pi pi-check text-white text-2xl"></i>
              </div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Lima y Callao</p>
            </div>
            <p-button
              label="Ver Mapa"
              icon="pi pi-external-link"
              [text]="true"
              size="small"
              class="w-full"
            />
          </div>
        </p-card>
      </div>

      <!-- Support Quick Access -->
      <div class="bento-item support-item bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900">
        <p-card class="h-full border-none shadow-none bg-transparent">
          <ng-template pTemplate="header">
            <div class="p-4 pb-0">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <i class="pi pi-headphones text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 dark:text-white">Soporte 24/7</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Siempre aquí para ti</p>
                </div>
              </div>
            </div>
          </ng-template>

          <div class="px-4 pb-4 space-y-2">
            <p-button
              label="Chat en Vivo"
              icon="pi pi-comments"
              [text]="true"
              size="small"
              class="w-full justify-start"
            />
            <p-button
              label="WhatsApp"
              icon="pi pi-whatsapp"
              [text]="true"
              size="small"
              class="w-full justify-start"
            />
            <p-button
              label="Llamar"
              icon="pi pi-phone"
              [text]="true"
              size="small"
              class="w-full justify-start"
            />
          </div>
        </p-card>
      </div>

    </div>
  </div>
`,
  styles: [`
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: minmax(200px, auto);
  }

  .bento-item {
    @apply rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02];
  }

  /* Responsive Grid Layout */
  @media (min-width: 768px) {
    .bento-grid {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, minmax(200px, auto));
    }

    .hero-item {
      grid-column: span 3;
      grid-row: span 2;
    }

    .stats-item {
      grid-column: span 2;
      grid-row: span 1;
    }

    .cta-item {
      grid-column: span 1;
      grid-row: span 1;
    }

    .features-item {
      grid-column: span 2;
      grid-row: span 2;
    }

    .packages-item {
      grid-column: span 4;
      grid-row: span 1;
    }

    .testimonial-item {
      grid-column: span 1;
      grid-row: span 1;
    }

    .coverage-item {
      grid-column: span 1;
      grid-row: span 1;
    }

    .support-item {
      grid-column: span 1;
      grid-row: span 1;
    }
  }

  @media (min-width: 1024px) {
    .bento-grid {
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(3, minmax(250px, auto));
    }

    .hero-item {
      grid-column: span 4;
      grid-row: span 2;
    }

    .stats-item {
      grid-column: span 2;
      grid-row: span 1;
    }

    .features-item {
      grid-column: span 2;
      grid-row: span 2;
    }

    .packages-item {
      grid-column: span 6;
      grid-row: span 1;
    }
  }

  /* Hover Effects */
  .bento-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Custom Skeleton Styles */
  :host ::ng-deep {
    .p-skeleton {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .p-card .p-card-body {
      padding: 0;
    }

    .p-card .p-card-content {
      padding: 0;
    }
  }
`]
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);

// Loading state
  isLoading = signal(true);

  ngOnInit(): void {
    // Update SEO
    this.seoService.updateSEO(this.seoService.getHomePageSEO());

    // Simulate loading
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }
}
