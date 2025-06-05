// src/app/features/plans/pages/plans-page/plans-page.component.ts
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';

// Services
import { SeoService } from '../../../../core/services/seo.service';

interface Plan {
  id: string;
  name: string;
  category: 'basico' | 'popular' | 'premium' | 'empresarial';
  speed: number;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isNew?: boolean;
  tvChannels?: number;
  streamingServices?: string[];
  color: string;
  icon: string;
}

interface Filter {
  minSpeed: number;
  maxPrice: number;
  includeTV: boolean;
  includeStreaming: boolean;
}

@Component({
  selector: 'app-plans-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    TagModule,
    BadgeModule,
    ChipModule,
    DividerModule,
    CheckboxModule,
    SliderModule
  ],
  template: `
  <div class="min-h-screen bg-gray-50">

    <!-- Header Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Planes de Internet
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Encuentra el plan perfecto para tu hogar o empresa con la mejor tecnología de fibra óptica
          </p>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-2xl font-bold">1000</div>
              <div class="text-sm text-blue-200">Mbps Máx</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">24/7</div>
              <div class="text-sm text-blue-200">Soporte</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">GRATIS</div>
              <div class="text-sm text-blue-200">Instalación</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">WiFi 6</div>
              <div class="text-sm text-blue-200">Incluido</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8 bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between gap-4">

          <div class="flex flex-wrap items-center gap-4">
            <h3 class="font-semibold text-gray-900">Filtrar por:</h3>

            <!-- Speed Filter -->
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Velocidad mín:</label>
              <p-slider
                [(ngModel)]="currentFilters.minSpeed"
                [min]="50"
                [max]="1000"
                [step]="50"
                styleClass="w-24"
                (onChange)="updateFilters()"
              />
              <span class="text-sm font-medium">{{ currentFilters.minSpeed }} Mbps</span>
            </div>

            <!-- Price Filter -->
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Precio máx:</label>
              <p-slider
                [(ngModel)]="currentFilters.maxPrice"
                [min]="50"
                [max]="300"
                [step]="10"
                styleClass="w-24"
                (onChange)="updateFilters()"
              />
              <span class="text-sm font-medium">S/ {{ currentFilters.maxPrice }}</span>
            </div>

            <!-- Feature Filters -->
            <div class="flex items-center space-x-4">
              <p-checkbox
                [(ngModel)]="currentFilters.includeTV"
                [binary]="true"
                label="Con Cable TV"
                (onChange)="updateFilters()"
              />
              <p-checkbox
                [(ngModel)]="currentFilters.includeStreaming"
                [binary]="true"
                label="Con Streaming"
                (onChange)="updateFilters()"
              />
            </div>
          </div>

          <!-- View Options -->
          <div class="flex items-center space-x-2">
            <p-button
              label="Comparar Planes"
              icon="pi pi-clone"
              [outlined]="true"
              size="small"
              routerLink="/planes/comparar"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Plans Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Category Tabs -->
        <p-tabView [(activeIndex)]="activeTabIndex" class="mb-8">
          <p-tabPanel header="Todos" leftIcon="pi pi-th-large">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              @for (plan of filteredPlans(); track plan.id) {
                <div class="relative">
                  <p-card
                    class="h-full hover:shadow-xl transition-all duration-300 cursor-pointer"
                    [class]="plan.isPopular ? 'ring-2 ring-blue-500' : ''"
                    (click)="selectPlan(plan)"
                  >
                    <!-- Popular Badge -->
                    @if (plan.isPopular) {
                      <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <p-chip
                          label="MÁS POPULAR"
                          styleClass="bg-blue-500 text-white font-bold"
                        />
                      </div>
                    }

                    <!-- New Badge -->
                    @if (plan.isNew) {
                      <div class="absolute top-4 right-4">
                        <p-badge value="NUEVO" severity="success" />
                      </div>
                    }

                    <ng-template pTemplate="header">
                      <div class="text-center p-4" [style]="'background: ' + plan.color + '20'">
                        <i [class]="plan.icon" class="text-4xl mb-2" [style]="'color: ' + plan.color"></i>
                        <h3 class="text-xl font-bold text-gray-900">{{ plan.name }}</h3>
                        <p class="text-gray-600 text-sm">{{ plan.description }}</p>
                      </div>
                    </ng-template>

                    <div class="p-6">
                      <!-- Speed -->
                      <div class="text-center mb-6">
                        <div class="text-4xl font-bold" [style]="'color: ' + plan.color">
                          {{ plan.speed }}
                          <span class="text-lg text-gray-500">Mbps</span>
                        </div>
                        <div class="text-sm text-gray-500">Velocidad simétrica</div>
                      </div>

                      <!-- Price -->
                      <div class="text-center mb-6">
                        @if (plan.originalPrice) {
                          <div class="text-sm text-gray-500 line-through">
                            S/ {{ plan.originalPrice }}/mes
                          </div>
                        }
                        <div class="text-3xl font-bold text-gray-900">
                          S/ {{ plan.price }}
                          <span class="text-sm text-gray-500">/mes</span>
                        </div>
                        @if (plan.originalPrice) {
                          <p-chip
                            [label]="'Ahorra S/ ' + (plan.originalPrice - plan.price)"
                            styleClass="bg-green-100 text-green-800 text-xs"
                          />
                        }
                      </div>

                      <!-- Features -->
                      <div class="space-y-2 mb-6">
                        @for (feature of plan.features.slice(0, 4); track feature) {
                          <div class="flex items-center space-x-2 text-sm">
                            <i class="pi pi-check text-green-500 text-xs"></i>
                            <span class="text-gray-700">{{ feature }}</span>
                          </div>
                        }
                        @if (plan.features.length > 4) {
                          <div class="text-xs text-gray-500 mt-2">
                            +{{ plan.features.length - 4 }} características más
                          </div>
                        }
                      </div>

                      <!-- Additional Services -->
                      @if (plan.tvChannels || plan.streamingServices?.length) {
                        <p-divider />
                        <div class="space-y-2">
                          @if (plan.tvChannels) {
                            <div class="flex items-center justify-between text-sm">
                              <span class="text-gray-600">Cable TV</span>
                              <p-badge [value]="plan.tvChannels + ' canales'" severity="info" />
                            </div>
                          }
                          @if (plan.streamingServices?.length) {
                            <div class="text-sm">
                              <span class="text-gray-600">Streaming:</span>
                              <div class="flex flex-wrap gap-1 mt-1">
                                @for (service of plan.streamingServices; track service) {
                                  <p-chip
                                    [label]="service"
                                    styleClass="text-xs bg-purple-100 text-purple-800"
                                  />
                                }
                              </div>
                            </div>
                          }
                        </div>
                      }
                    </div>

                    <ng-template pTemplate="footer">
                      <div class="p-4">
                        <p-button
                          label="Contratar Plan"
                          [raised]="true"
                          class="w-full"
                          [ngStyle]="{'background': plan.color, 'border-color': plan.color}"
                          (onClick)="contractPlan(plan)"
                        />
                        <p-button
                          label="Ver Detalles"
                          [text]="true"
                          class="w-full mt-2"
                          [routerLink]="['/planes', plan.id]"
                        />
                      </div>
                    </ng-template>
                  </p-card>
                </div>
              }
            </div>
          </p-tabPanel>

          <p-tabPanel header="Hogar" leftIcon="pi pi-home">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (plan of getHomeProPlans(); track plan.id) {
                <!-- Same card template as above -->
                <div class="relative">
                  <p-card class="h-full hover:shadow-xl transition-all duration-300">
                    <ng-template pTemplate="header">
                      <div class="text-center p-4" [style]="'background: ' + plan.color + '20'">
                        <i [class]="plan.icon" class="text-4xl mb-2" [style]="'color: ' + plan.color"></i>
                        <h3 class="text-xl font-bold text-gray-900">{{ plan.name }}</h3>
                      </div>
                    </ng-template>
                    <div class="p-6">
                      <div class="text-center mb-4">
                        <div class="text-3xl font-bold" [style]="'color: ' + plan.color">
                          {{ plan.speed }} Mbps
                        </div>
                        <div class="text-2xl font-bold text-gray-900 mt-2">
                          S/ {{ plan.price }}/mes
                        </div>
                      </div>
                    </div>
                  </p-card>
                </div>
              }
            </div>
          </p-tabPanel>

          <p-tabPanel header="Empresarial" leftIcon="pi pi-building">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (plan of getBusinessPlans(); track plan.id) {
                <!-- Same card template as above -->
                <div class="relative">
                  <p-card class="h-full hover:shadow-xl transition-all duration-300">
                    <ng-template pTemplate="header">
                      <div class="text-center p-4" [style]="'background: ' + plan.color + '20'">
                        <i [class]="plan.icon" class="text-4xl mb-2" [style]="'color: ' + plan.color"></i>
                        <h3 class="text-xl font-bold text-gray-900">{{ plan.name }}</h3>
                      </div>
                    </ng-template>
                    <div class="p-6">
                      <div class="text-center mb-4">
                        <div class="text-3xl font-bold" [style]="'color: ' + plan.color">
                          {{ plan.speed }} Mbps
                        </div>
                        <div class="text-2xl font-bold text-gray-900 mt-2">
                          S/ {{ plan.price }}/mes
                        </div>
                      </div>
                    </div>
                  </p-card>
                </div>
              }
            </div>
          </p-tabPanel>
        </p-tabView>

      </div>
    </section>

    <!-- Help Section -->
    <section class="py-12 bg-blue-50">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          ¿Necesitas ayuda para elegir?
        </h2>
        <p class="text-gray-600 mb-6">
          Nuestros asesores especializados te ayudarán a encontrar el plan perfecto para tus necesidades
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <p-button
            label="Chat en Vivo"
            icon="pi pi-comments"
            [raised]="true"
            (onClick)="openChat()"
          />
          <p-button
            label="Llamar Ahora"
            icon="pi pi-phone"
            [outlined]="true"
            (onClick)="callNow()"
          />
        </div>
      </div>
    </section>

  </div>
`,
  styles: [`
  :host ::ng-deep {
    .p-tabview .p-tabview-nav li .p-tabview-nav-link {
      font-weight: 600;
    }

    .p-card:hover {
      transform: translateY(-4px);
    }

    .p-slider .p-slider-handle {
      background: #3B82F6;
      border-color: #3B82F6;
    }
  }
`]
})
export class PlansPageComponent implements OnInit {

  private seoService = inject(SeoService);

  activeTabIndex = signal(0);

  currentFilters: Filter = {
    minSpeed: 50,
    maxPrice: 300,
    includeTV: false,
    includeStreaming: false
  };

  plans = signal<Plan[]>([
    {
      id: 'basico-100',
      name: 'Internet Básico',
      category: 'basico',
      speed: 100,
      price: 59.90,
      originalPrice: 79.90,
      description: 'Perfecto para navegación básica',
      features: [
        'Velocidad 100 Mbps simétrica',
        'WiFi 6 incluido',
        'Instalación gratuita',
        'Soporte técnico 24/7',
        'Sin permanencia'
      ],
      color: '#10B981',
      icon: 'pi pi-home'
    },
    {
      id: 'popular-300',
      name: 'Internet Popular',
      category: 'popular',
      speed: 300,
      price: 89.90,
      originalPrice: 129.90,
      description: 'Ideal para streaming y trabajo',
      features: [
        'Velocidad 300 Mbps simétrica',
        'WiFi 6 de alta potencia',
        'Cable TV con 150+ canales',
        'Netflix HD incluido',
        'Instalación express 24h',
        'App de autogestión'
      ],
      tvChannels: 150,
      streamingServices: ['Netflix', 'Prime Video'],
      isPopular: true,
      color: '#F59E0B',
      icon: 'pi pi-star'
    },
    {
      id: 'premium-600',
      name: 'Internet Premium',
      category: 'premium',
      speed: 600,
      price: 129.90,
      originalPrice: 179.90,
      description: 'Para gaming y múltiples dispositivos',
      features: [
        'Velocidad 600 Mbps simétrica',
        'WiFi 6E última generación',
        'Cable TV Premium 200+ canales',
        'Gaming sin lag garantizado',
        'IP estática incluida',
        'Soporte prioritario'
      ],
      tvChannels: 200,
      streamingServices: ['Netflix', 'Disney+', 'Prime Video', 'HBO Max'],
      isNew: true,
      color: '#8B5CF6',
      icon: 'pi pi-crown'
    },
    {
      id: 'ultra-1000',
      name: 'Internet Ultra',
      category: 'premium',
      speed: 1000,
      price: 199.90,
      originalPrice: 299.90,
      description: 'Máxima velocidad disponible',
      features: [
        'Velocidad 1000 Mbps simétrica',
        'WiFi 6E mesh incluido',
        'Cable TV Ultra 300+ canales',
        'Latencia ultra baja < 5ms',
        'IP estática dedicada',
        'Soporte técnico exclusivo'
      ],
      tvChannels: 300,
      streamingServices: ['Netflix', 'Disney+', 'Prime Video', 'HBO Max', 'Apple TV+'],
      isNew: true,
      color: '#EF4444',
      icon: 'pi pi-bolt'
    },
    // Business Plans
    {
      id: 'business-500',
      name: 'Business Pro',
      category: 'empresarial',
      speed: 500,
      price: 249.90,
      description: 'Para pequeñas y medianas empresas',
      features: [
        'Velocidad 500 Mbps dedicada',
        'IP estática incluida',
        'SLA 99.9% garantizado',
        'Soporte técnico prioritario',
        'Backup de conexión 4G',
        'Firewall empresarial'
      ],
      color: '#6366F1',
      icon: 'pi pi-building'
    }
  ]);

  filteredPlans = computed(() => {
    return this.plans().filter(plan => {
      if (plan.speed < this.currentFilters.minSpeed) return false;
      if (plan.price > this.currentFilters.maxPrice) return false;
      if (this.currentFilters.includeTV && !plan.tvChannels) return false;
      if (this.currentFilters.includeStreaming && !plan.streamingServices?.length) return false;
      return true;
    });
  });

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Planes de Internet Fibra Óptica - CableLuz',
      description: 'Descubre nuestros planes de internet fibra óptica desde 100 Mbps hasta 1000 Mbps. Instalación gratuita, WiFi 6 incluido y soporte 24/7.',
      keywords: 'planes internet, fibra optica, internet hogar, internet empresa, wifi 6',
      ogTitle: 'Planes de Internet - Fibra Óptica hasta 1000 Mbps',
      ogDescription: 'Encuentra el plan perfecto para tu hogar o empresa. Velocidades desde 100 Mbps hasta 1000 Mbps con instalación gratuita.',
      ogImage: '/assets/images/og-plans.jpg'
    });
  }

  updateFilters(): void {
    // Trigger reactivity by updating the signal
    this.plans.set([...this.plans()]);
  }

  getHomeProPlans(): Plan[] {
    return this.plans().filter(plan =>
      plan.category === 'basico' || plan.category === 'popular' || plan.category === 'premium'
    );
  }

  getBusinessPlans(): Plan[] {
    return this.plans().filter(plan => plan.category === 'empresarial');
  }

  selectPlan(plan: Plan): void {
    console.log('Plan selected:', plan.name);
  }

  contractPlan(plan: Plan): void {
    console.log('Contract plan:', plan.name);
    // Navigate to checkout or open contract modal
  }

  openChat(): void {
    console.log('Open chat');
    // Open chat widget or navigate to chat page
  }

  callNow(): void {
    window.open('tel:+51123456789', '_self');
  }
}
