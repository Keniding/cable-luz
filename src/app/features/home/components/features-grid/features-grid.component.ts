import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

// Declare gtag for TypeScript
declare let gtag: Function;

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  benefits: string[];
  isPopular: boolean;
  isNew: boolean;
  stats?: {
    value: string;
    label: string;
  };
  ctaText?: string;
}

@Component({
  selector: 'app-features-grid',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    DataViewModule,
    RippleModule,
    TooltipModule
  ],
  animations: [
    trigger('slideInUp', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('0.6s ease-out')
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateY(30px)', opacity: 0 }),
          stagger(100, [
            animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('cardHover', [
      state('default', style({ transform: 'scale(1) translateY(0)' })),
      state('hovered', style({ transform: 'scale(1.05) translateY(-8px)' })),
      transition('default <=> hovered', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('iconFloat', [
      state('floating', style({ transform: 'translateY(-5px)' })),
      transition('* => floating', [
        animate('2s ease-in-out', style({ transform: 'translateY(-5px)' })),
        animate('2s ease-in-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
  <div class="p-6 h-full">

    <!-- Header -->
    <div class="mb-8 text-center" [@slideInUp]>
      <div class="mb-4">
        <p-tag
          value="🚀 Tecnología Avanzada"
          severity="info"
          class="mb-3"
        />
      </div>
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-3">
        ¿Por qué elegir CableLuz?
      </h2>
      <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Tecnología de punta que garantiza la mejor experiencia de conectividad para tu hogar
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" [@staggerAnimation]="features().length">
      @for (feature of features(); track feature.id; let i = $index) {
        <div
          class="feature-card relative group cursor-pointer"
          [@cardHover]="hoveredCard() === feature.id ? 'hovered' : 'default'"
          (mouseenter)="setHoveredCard(feature.id)"
          (mouseleave)="setHoveredCard(null)"
          (click)="onFeatureClick(feature)"
        >
          <p-card class="h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">

            <!-- Card Background Gradient -->
            <div
              class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
              [style.background]="feature.bgGradient"
            ></div>

            <!-- Badges -->
            <ng-template pTemplate="header">
              <div class="relative p-4 pb-0">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex space-x-2">
                    @if (feature.isPopular) {
                      <p-badge
                        value="Popular"
                        severity="success"
                        class="animate-pulse"
                      />
                    }
                    @if (feature.isNew) {
                      <p-badge
                        value="Nuevo"
                        severity="warn"
                      />
                    }
                  </div>

                  @if (feature.stats) {
                    <div class="text-right">
                      <div class="text-2xl font-bold" [style.color]="feature.color">
                        {{ feature.stats.value }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">
                        {{ feature.stats.label }}
                      </div>
                    </div>
                  }
                </div>

                <!-- Icon -->
                <div class="flex items-center space-x-4">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
                    [style.background]="feature.bgGradient"
                    [@iconFloat]="hoveredCard() === feature.id ? 'floating' : ''"
                  >
                    <i
                      [class]="feature.icon + ' text-2xl text-white'"
                    ></i>

                    <!-- Shine Effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {{ feature.title }}
                    </h3>
                  </div>
                </div>
              </div>
            </ng-template>

            <!-- Content -->
            <div class="relative px-4 pb-4">
              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {{ feature.description }}
              </p>

              <!-- Benefits List -->
              <div class="space-y-2 mb-6">
                @for (benefit of feature.benefits; track benefit; let j = $index) {
                  <div
                    class="flex items-center space-x-3 opacity-0 animate-fade-in-up"
                    [style.animation-delay]="(j * 100) + 'ms'"
                  >
                    <div
                      class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      [style.background]="feature.color + '20'"
                    >
                      <i
                        class="pi pi-check text-xs"
                        [style.color]="feature.color"
                      ></i>
                    </div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {{ benefit }}
                    </span>
                  </div>
                }
              </div>

              <!-- CTA Button -->
              @if (feature.ctaText) {
                <p-button
                  [label]="feature.ctaText"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  [text]="true"
                  class="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
                  [style.color]="feature.color"
                  pTooltip="Conoce más detalles"
                  tooltipPosition="top"
                />
              }
            </div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <!-- Corner Decoration -->
            <div class="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <defs>
                  <linearGradient id="cornerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" [attr.stop-color]="feature.color" stop-opacity="0.1"/>
                    <stop offset="100%" [attr.stop-color]="feature.color" stop-opacity="0.3"/>
                  </linearGradient>
                </defs>
                <path d="M80,0 L100,0 L100,20 Z" fill="url(#cornerGradient)"/>
              </svg>
            </div>

          </p-card>
        </div>
      }
    </div>

    <!-- Bottom CTA -->
    <div class="mt-8 text-center" [@slideInUp]>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        ¿Necesitas más información sobre nuestras características?
      </p>
      <p-button
        label="Ver Todas las Características"
        icon="pi pi-external-link"
        iconPos="right"
        [outlined]="true"
        size="large"
        class="font-semibold"
        (onClick)="viewAllFeatures()"
      />
    </div>

  </div>
`,
  styles: [`
  :host {
    display: block;
    height: 100%;
  }

  .feature-card {
    height: 100%;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  :host ::ng-deep {
    .p-card {
      height: 100%;
      border-radius: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .p-card:hover {
      transform: translateY(-4px);
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

    .p-button.p-button-text {
      transition: all 0.3s ease;
    }

    .p-button.p-button-text:hover {
      transform: translateX(4px);
    }

    .p-tag {
      font-weight: 600;
      font-size: 0.75rem;
    }

    .p-badge {
      font-size: 0.625rem;
      font-weight: 700;
    }
  }

  /* Custom scrollbar for overflow content */
  .feature-card::-webkit-scrollbar {
    width: 4px;
  }

  .feature-card::-webkit-scrollbar-track {
    background: transparent;
  }

  .feature-card::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }

  .feature-card::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`]
})
export class FeaturesGridComponent implements OnInit, OnDestroy {

  hoveredCard = signal<string | null>(null);

  features = signal<Feature[]>([
    {
      id: 'fiber-optic',
      title: 'Fibra Óptica 100%',
      description: 'Conexión directa de fibra óptica hasta tu hogar para máxima velocidad y estabilidad.',
      icon: 'pi pi-bolt',
      color: '#F59E0B',
      bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
      benefits: [
        'Velocidades simétricas de subida y bajada',
        'Latencia ultra baja para gaming',
        'Conexión estable 24/7',
        'Resistente a interferencias'
      ],
      isPopular: true,
      isNew: false,
      stats: {
        value: '1000',
        label: 'Mbps'
      },
      ctaText: 'Ver Planes Fibra'
    },
    {
      id: 'wifi6',
      title: 'WiFi 6 Gratis',
      description: 'Router WiFi 6 de última generación incluido sin costo adicional con todos nuestros planes.',
      icon: 'pi pi-wifi',
      color: '#3B82F6',
      bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      benefits: [
        'Cobertura hasta 300m²',
        'Soporte para 50+ dispositivos',
        'Velocidades WiFi hasta 1.2 Gbps',
        'Configuración automática'
      ],
      isPopular: false,
      isNew: true,
      stats: {
        value: '50+',
        label: 'Dispositivos'
      },
      ctaText: 'Conocer WiFi 6'
    },
    {
      id: 'support',
      title: 'Soporte 24/7',
      description: 'Atención técnica especializada disponible las 24 horas, todos los días del año.',
      icon: 'pi pi-headphones',
      color: '#10B981',
      bgGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      benefits: [
        'Chat en vivo instantáneo',
        'Técnicos certificados',
        'Resolución en menos de 2 horas',
        'App móvil de autogestión'
      ],
      isPopular: true,
      isNew: false,
      stats: {
        value: '2min',
        label: 'Tiempo respuesta'
      },
      ctaText: 'Contactar Soporte'
    },
    {
      id: 'streaming',
      title: 'Streaming Premium',
      description: 'Acceso incluido a las mejores plataformas de streaming y contenido en 4K Ultra HD.',
      icon: 'pi pi-play',
      color: '#8B5CF6',
      bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      benefits: [
        'Netflix, Prime Video, Disney+',
        'Contenido 4K sin buffering',
        'Múltiples perfiles familiares',
        'Descargas offline ilimitadas'
      ],
      isPopular: false,
      isNew: true,
      stats: {
        value: '1000+',
        label: 'Películas 4K'
      },
      ctaText: 'Ver Catálogo'
    },
    {
      id: 'security',
      title: 'Seguridad Avanzada',
      description: 'Protección integral con firewall, antivirus y control parental incluidos.',
      icon: 'pi pi-shield',
      color: '#EF4444',
      bgGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      benefits: [
        'Firewall de red empresarial',
        'Antivirus en tiempo real',
        'Control parental inteligente',
        'Protección contra malware'
      ],
      isPopular: true,
      isNew: false,
      ctaText: 'Más Seguridad'
    },
    {
      id: 'installation',
      title: 'Instalación Express',
      description: 'Instalación profesional gratuita en menos de 24 horas desde la contratación.',
      icon: 'pi pi-wrench',
      color: '#F97316',
      bgGradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      benefits: [
        'Instalación en 24 horas',
        'Técnicos certificados',
        'Sin costos ocultos',
        'Garantía de instalación'
      ],
      isPopular: false,
      isNew: false,
      stats: {
        value: '24h',
        label: 'Instalación'
      },
      ctaText: 'Agendar Instalación'
    }
  ]);

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  setHoveredCard(cardId: string | null): void {
    this.hoveredCard.set(cardId);
  }

  onFeatureClick(feature: Feature): void {
    console.log('Feature clicked:', feature.title);
    // Could open detailed modal, navigate to feature page, or track analytics
    this.trackFeatureClick(feature);
  }

  viewAllFeatures(): void {
    console.log('View all features clicked');
    // Navigate to features page or open comprehensive modal
  }

  private trackFeatureClick(feature: Feature): void {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'feature_click', {
        event_category: 'engagement',
        event_label: feature.id,
        value: 1
      });
    }
  }
}
