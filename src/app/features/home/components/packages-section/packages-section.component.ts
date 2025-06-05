import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';

// Declare gtag for TypeScript
declare let gtag: Function;

interface Package {
  id: string;
  name: string;
  category: 'basico' | 'popular' | 'premium';
  speed: number;
  speedUnit: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  features: string[];
  popularFeatures?: string[];
  tvChannels?: number;
  streamingServices?: string[];
  isPopular: boolean;
  isRecommended: boolean;
  isNew: boolean;
  savings?: string;
  ctaText: string;
  color: string;
  bgGradient: string;
  icon: string;
}

interface PackageCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-packages-section',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    DataViewModule,
    DialogModule,
    TabViewModule,
    RippleModule,
    TooltipModule,
    ProgressBarModule
  ],
  animations: [
    trigger('slideInUp', [
      transition('void => *', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query('.package-card', [
          style({ transform: 'translateY(50px)', opacity: 0 }),
          stagger(150, [
            animate('0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              style({ transform: 'translateY(0)', opacity: 1 })
            )
          ])
        ], { optional: true })
      ])
    ]),
    trigger('cardScale', [
      state('default', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('default <=> hovered', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('priceAnimation', [
      transition('* => *', [
        style({ transform: 'scale(1.2)', color: '#10B981' }),
        animate('0.3s ease-out', style({ transform: 'scale(1)', color: '*' }))
      ])
    ])
  ],
  template: `
  <div class="p-6">

    <!-- Header -->
    <div class="text-center mb-10" [@slideInUp]>
      <div class="mb-4">
        <p-tag
          value="💰 Mejores Precios del Mercado"
          severity="success"
          class="text-sm font-bold"
        />
      </div>
      <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Planes que se Adaptan a Ti
      </h2>
      <p class="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
        Desde navegación básica hasta streaming 4K y gaming profesional.
        Encuentra el plan perfecto para tu hogar.
      </p>
    </div>

    <!-- Category Tabs -->
    <div class="mb-8">
      <p-tabView [activeIndex]="activeTabIndex()" (activeIndexChange)="activeTabIndex.set($event)" (onChange)="onTabChange($event)">
      @for (category of categories(); track category.id) {
          <p-tabPanel [header]="category.name">
            <ng-template pTemplate="header">
              <div class="flex items-center space-x-2">
                <i [class]="category.icon" [style.color]="category.color"></i>
                <span>{{ category.name }}</span>
              </div>
            </ng-template>
          </p-tabPanel>
        }
      </p-tabView>
    </div>

    <!-- Packages Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      [@staggerCards]="filteredPackages().length"
    >
      @for (pkg of filteredPackages(); track pkg.id) {
        <div
          class="package-card relative"
          [@cardScale]="hoveredPackage() === pkg.id ? 'hovered' : 'default'"
          (mouseenter)="setHoveredPackage(pkg.id)"
          (mouseleave)="setHoveredPackage(null)"
        >

          <!-- Popular Badge -->
          @if (pkg.isPopular) {
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <p-badge
                value="🔥 MÁS POPULAR"
                severity="warn"
                class="animate-pulse font-bold text-xs px-4 py-2"
              />
            </div>
          }

          <!-- Recommended Badge -->
          @if (pkg.isRecommended) {
            <div class="absolute -top-4 right-4 z-20">
              <p-badge
                value="⭐ RECOMENDADO"
                severity="success"
                class="font-bold text-xs"
              />
            </div>
          }

          <p-card
            class="h-full relative overflow-hidden border-2 transition-all duration-300"
            [class.border-yellow-400]="pkg.isPopular"
            [class.border-green-400]="pkg.isRecommended"
            [class.border-gray-200]="!pkg.isPopular && !pkg.isRecommended"
            [class.shadow-2xl]="hoveredPackage() === pkg.id"
            [class.shadow-lg]="hoveredPackage() !== pkg.id"
          >

            <!-- Background Gradient -->
            <div
              class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
              [style.background]="pkg.bgGradient"
            ></div>

            <!-- Header -->
            <ng-template pTemplate="header">
              <div class="relative p-6 pb-4">

                <!-- Category & New Badge -->
                <div class="flex justify-between items-start mb-4">
                  <div class="flex space-x-2">
                    @if (pkg.isNew) {
                      <p-badge
                        value="NUEVO"
                        severity="info"
                        class="text-xs"
                      />
                    }
                  </div>

                  @if (pkg.savings) {
                    <div class="text-right">
                      <p-tag
                        [value]="pkg.savings"
                        severity="success"
                        class="text-xs font-bold"
                      />
                    </div>
                  }
                </div>

                <!-- Icon & Title -->
                <div class="text-center mb-4">
                  <div
                    class="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden"
                    [style.background]="pkg.bgGradient"
                  >
                    <i
                      [class]="pkg.icon + ' text-3xl text-white'"
                    ></i>

                    <!-- Shine Effect on Hover -->
                    @if (hoveredPackage() === pkg.id) {
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                    }
                  </div>

                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {{ pkg.name }}
                  </h3>

                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    {{ pkg.description }}
                  </p>
                </div>

                <!-- Speed Display -->
                <div class="text-center mb-6">
                  <div class="flex items-center justify-center space-x-2">
                    <span class="text-4xl font-bold" [style.color]="pkg.color">
                      {{ pkg.speed }}
                    </span>
                    <span class="text-lg text-gray-600 dark:text-gray-300">
                      {{ pkg.speedUnit }}
                    </span>
                  </div>

                  <!-- Speed Progress Bar -->
                  <div class="mt-3">
                    <p-progressBar
                      [value]="getSpeedPercentage(pkg.speed)"
                      [showValue]="false"
                      class="h-2"
                      [style]="{'height': '6px'}"
                    />
                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Básico</span>
                      <span>Ultra</span>
                    </div>
                  </div>
                </div>

                <!-- Pricing -->
                <div class="text-center mb-6">
                  @if (pkg.originalPrice && pkg.originalPrice > pkg.price) {
                    <div class="mb-2">
                      <span class="text-gray-500 line-through text-lg">
                        S/ {{ pkg.originalPrice }}
                      </span>
                      <p-badge
                        [value]="'-' + pkg.discount + '%'"
                        severity="danger"
                        class="ml-2 text-xs"
                      />
                    </div>
                  }

                  <div class="flex items-center justify-center space-x-2">
                    <span class="text-sm text-gray-600 dark:text-gray-300">S/</span>
                    <span
                      class="text-4xl font-bold"
                      [style.color]="pkg.color"
                      [@priceAnimation]="hoveredPackage() === pkg.id"
                    >
                      {{ pkg.price }}
                    </span>
                    <span class="text-sm text-gray-600 dark:text-gray-300">/mes</span>
                  </div>
                </div>

              </div>
            </ng-template>

            <!-- Content -->
            <div class="relative px-6 pb-6">

              <!-- Features List -->
              <div class="space-y-3 mb-6">
                @for (feature of pkg.features; track feature; let i = $index) {
                  <div
                    class="flex items-center space-x-3"
                    [style.animation-delay]="(i * 50) + 'ms'"
                  >
                    <div
                      class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      [style.background]="pkg.color + '20'"
                    >
                      <i
                        class="pi pi-check text-xs"
                        [style.color]="pkg.color"
                      ></i>
                    </div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {{ feature }}
                    </span>
                  </div>
                }
              </div>

              <!-- Popular Features (if any) -->
              @if (pkg.popularFeatures && pkg.popularFeatures.length > 0) {
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                    <i class="pi pi-star-fill text-yellow-400 mr-2"></i>
                    Características Destacadas
                  </h4>
                  <div class="space-y-2">
                    @for (feature of pkg.popularFeatures; track feature) {
                      <div class="flex items-center space-x-2">
                        <i class="pi pi-bolt text-yellow-500 text-xs"></i>
                        <span class="text-xs text-gray-600 dark:text-gray-400">{{ feature }}</span>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- TV Channels & Streaming (if applicable) -->
              @if (pkg.tvChannels || pkg.streamingServices) {
                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                  @if (pkg.tvChannels) {
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                        <i class="pi pi-tv mr-2"></i>Canales TV
                      </span>
                      <p-badge
                        [value]="pkg.tvChannels + '+'"
                        severity="info"
                        class="text-xs"
                      />
                    </div>
                  }

                  @if (pkg.streamingServices && pkg.streamingServices.length > 0) {
                    <div class="flex items-center space-x-2 mt-2">
                      <i class="pi pi-play-circle text-purple-500"></i>
                      <div class="flex flex-wrap gap-1">
                        @for (service of pkg.streamingServices; track service) {
                          <p-tag
                            [value]="service"
                            severity="secondary"
                            class="text-xs"
                          />
                        }
                      </div>
                    </div>
                  }
                </div>
              }

              <!-- CTA Button -->
              <p-button
                [label]="pkg.ctaText"
                icon="pi pi-shopping-cart"
                iconPos="right"
                [raised]="true"
                size="large"
                class="w-full font-bold transform hover:scale-105 transition-all duration-200"
                [style.background]="pkg.bgGradient"
                [style.border]="'none'"
                pTooltip="Contratar este plan"
                tooltipPosition="top"
                (onClick)="onPackageSelect(pkg)"
              />

              <!-- Additional Info -->
              <div class="mt-4 text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  <i class="pi pi-info-circle mr-1"></i>
                  Instalación gratis • Sin permanencia
                </p>
              </div>

            </div>

            <!-- Hover Glow Effect -->
            @if (hoveredPackage() === pkg.id) {
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
            }

          </p-card>
        </div>
      }
    </div>

    <!-- Bottom CTA Section -->
    <div class="mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8" [@slideInUp]>
      <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        ¿No encuentras el plan ideal?
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        Nuestros asesores pueden crear un plan personalizado según tus necesidades específicas.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <p-button
          label="Hablar con un Asesor"
          icon="pi pi-phone"
          size="large"
          [raised]="true"
          class="font-semibold"
          (onClick)="contactAdvisor()"
        />
        <p-button
          label="Comparar Todos los Planes"
          icon="pi pi-list"
          [outlined]="true"
          size="large"
          class="font-semibold"
          (onClick)="compareAllPlans()"
        />
      </div>
    </div>

  </div>
`,
  styles: [`
  :host {
    display: block;
  }

  .package-card {
    height: 100%;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }

  .animate-shimmer {
    animation: shimmer 1.5s ease-in-out;
  }

  :host ::ng-deep {
    .p-card {
      height: 100%;
      border-radius: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .p-card .p-card-body {
      padding: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .p-card .p-card-content {
      padding: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .p-button {
      transition: all 0.3s ease;
    }

    .p-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    .p-tabview .p-tabview-nav li .p-tabview-nav-link {
      border-radius: 0.75rem 0.75rem 0 0;
      margin-right: 0.25rem;
    }

    .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
      background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
      color: white;
      border-color: transparent;
    }

    .p-progressbar {
      height: 6px;
      background: #E5E7EB;
      border-radius: 3px;
    }

    .p-progressbar .p-progressbar-value {
      background: linear-gradient(90deg, #10B981 0%, #059669 100%);
      border-radius: 3px;
    }

    .p-tag {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .p-badge {
      font-size: 0.625rem;
      font-weight: 700;
    }
  }
`]
})
export class PackagesSectionComponent implements OnInit {

  hoveredPackage = signal<string | null>(null);
  activeTabIndex = signal(0);

  categories = signal<PackageCategory[]>([
    {
      id: 'todos',
      name: 'Todos los Planes',
      description: 'Ver todos los planes disponibles',
      icon: 'pi pi-th-large',
      color: '#6B7280'
    },
    {
      id: 'basico',
      name: 'Básico',
      description: 'Para navegación y redes sociales',
      icon: 'pi pi-home',
      color: '#10B981'
    },
    {
      id: 'popular',
      name: 'Popular',
      description: 'Para streaming y trabajo',
      icon: 'pi pi-star',
      color: '#F59E0B'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Para gaming y múltiples dispositivos',
      icon: 'pi pi-crown',
      color: '#8B5CF6'
    }
  ]);

  packages = signal<Package[]>([
    {
      id: 'basico-100',
      name: 'Internet Básico',
      category: 'basico',
      speed: 100,
      speedUnit: 'Mbps',
      price: 59.90,
      originalPrice: 79.90,
      discount: 25,
      description: 'Perfecto para navegación y redes sociales',
      features: [
        'Velocidad 100 Mbps simétrica',
        'WiFi 6 incluido',
        'Instalación gratuita',
        'Soporte técnico 24/7',
        'Sin permanencia'
      ],
      isPopular: false,
      isRecommended: false,
      isNew: false,
      savings: 'Ahorra S/ 240/año',
      ctaText: 'Contratar Básico',
      color: '#10B981',
      bgGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      icon: 'pi pi-home'
    },
    {
      id: 'popular-300',
      name: 'Internet Popular',
      category: 'popular',
      speed: 300,
      speedUnit: 'Mbps',
      price: 89.90,
      originalPrice: 129.90,
      discount: 31,
      description: 'Ideal para streaming 4K y trabajo remoto',
      features: [
        'Velocidad 300 Mbps simétrica',
        'WiFi 6 de alta potencia',
        'Cable TV con 150+ canales',
        'Instalación express 24h',
        'App de autogestión',
        'Control parental'
      ],
      popularFeatures: [
        'Netflix HD incluido',
        'Antivirus premium',
        'Backup en la nube 100GB'
      ],
      tvChannels: 150,
      streamingServices: ['Netflix', 'Prime Video'],
      isPopular: true,
      isRecommended: true,
      isNew: false,
      savings: 'Ahorra S/ 480/año',
      ctaText: 'Contratar Popular',
      color: '#F59E0B',
      bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
      icon: 'pi pi-star'
    },
    {
      id: 'premium-600',
      name: 'Internet Premium',
      category: 'premium',
      speed: 600,
      speedUnit: 'Mbps',
      price: 129.90,
      originalPrice: 179.90,
      discount: 28,
      description: 'Para gaming profesional y múltiples dispositivos',
      features: [
        'Velocidad 600 Mbps simétrica',
        'WiFi 6E última generación',
        'Cable TV Premium 200+ canales',
        'Gaming sin lag garantizado',
        'IP estática incluida',
        'Soporte prioritario'
      ],
      popularFeatures: [
        'Netflix 4K + Disney+ incluidos',
        'Gaming VPN premium',
        'Backup ilimitado en la nube',
        'Router gaming incluido'
      ],
      tvChannels: 200,
      streamingServices: ['Netflix', 'Disney+', 'Prime Video', 'HBO Max'],
      isPopular: false,
      isRecommended: true,
      isNew: true,
      savings: 'Ahorra S/ 600/año',
      ctaText: 'Contratar Premium',
      color: '#8B5CF6',
      bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      icon: 'pi pi-crown'
    },
    {
      id: 'ultra-1000',
      name: 'Internet Ultra',
      category: 'premium',
      speed: 1000,
      speedUnit: 'Mbps',
      price: 199.90,
      originalPrice: 299.90,
      discount: 33,
      description: 'La velocidad más alta para empresas y power users',
      features: [
        'Velocidad 1000 Mbps simétrica',
        'WiFi 6E mesh incluido',
        'Cable TV Ultra 300+ canales',
        'Latencia ultra baja < 5ms',
        'IP estática dedicada',
        'Soporte técnico exclusivo'
      ],
      popularFeatures: [
        'Todas las plataformas streaming',
        'VPN empresarial',
        'Backup empresarial 1TB',
        'Router mesh profesional',
        'Monitoreo 24/7'
      ],
      tvChannels: 300,
      streamingServices: ['Netflix', 'Disney+', 'Prime Video', 'HBO Max', 'Apple TV+', 'Paramount+'],
      isPopular: false,
      isRecommended: false,
      isNew: true,
      savings: 'Ahorra S/ 1200/año',
      ctaText: 'Contratar Ultra',
      color: '#EF4444',
      bgGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      icon: 'pi pi-bolt'
    }
  ]);

// Computed properties
  filteredPackages = computed(() => {
    const activeCategory = this.categories()[this.activeTabIndex()];
    if (activeCategory.id === 'todos') {
      return this.packages();
    }
    return this.packages().filter(pkg => pkg.category === activeCategory.id);
  });

  ngOnInit(): void {
    // Component initialization
  }

  setHoveredPackage(packageId: string | null): void {
    this.hoveredPackage.set(packageId);
  }

  onTabChange(event: any): void {
    this.activeTabIndex.set(event.index);
  }

  getSpeedPercentage(speed: number): number {
    // Calculate percentage based on max speed of 1000 Mbps
    return Math.min((speed / 1000) * 100, 100);
  }

  onPackageSelect(pkg: Package): void {
    console.log('Package selected:', pkg.name);
    this.trackPackageSelection(pkg);
    // Navigate to checkout or open selection modal
  }

  contactAdvisor(): void {
    console.log('Contact advisor clicked');
    // Open chat, phone call, or contact form
  }

  compareAllPlans(): void {
    console.log('Compare all plans clicked');
    // Navigate to comparison page
  }

  private trackPackageSelection(pkg: Package): void {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'package_selection', {
        event_category: 'conversion',
        event_label: pkg.id,
        value: pkg.price
      });
    }
  }
}
