import { Component, OnInit, OnDestroy, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';

// Declare gtag for TypeScript
declare let gtag: Function;

interface CtaOffer {
  title: string;
  subtitle: string;
  discount: string;
  originalPrice: string;
  currentPrice: string;
  timeLeft: string;
  features: string[];
  ctaText: string;
  urgencyText: string;
  isLimited: boolean;
}

@Component({
  selector: 'app-quick-cta',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    RippleModule
  ],
  template: `
  <div class="relative h-full min-h-[300px] flex flex-col justify-center overflow-hidden">

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse"></div>
    <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-300/30 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s;"></div>

    <!-- Content -->
    <div class="relative z-10 p-6 text-center">

      <!-- Urgency Badge -->
      @if (offer().isLimited) {
        <div class="mb-4">
          <p-badge
            [value]="offer().urgencyText"
            severity="warn"
            class="animate-bounce font-bold"
          />
        </div>
      }

      <!-- Discount Badge -->
      <div class="mb-3">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-2">
          <span class="text-2xl font-bold text-white">{{ offer().discount }}</span>
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-white mb-2 leading-tight">
        {{ offer().title }}
      </h3>

      <!-- Subtitle -->
      <p class="text-green-100 text-sm mb-4">
        {{ offer().subtitle }}
      </p>

      <!-- Price -->
      <div class="mb-4">
        <div class="flex items-center justify-center space-x-2">
          <span class="text-green-200 text-sm line-through">
            {{ offer().originalPrice }}
          </span>
          <span class="text-2xl font-bold text-white">
            {{ offer().currentPrice }}
          </span>
        </div>
        <div class="text-green-100 text-xs mt-1">
          /mes por 12 meses
        </div>
      </div>

      <!-- Features -->
      <div class="mb-6 space-y-1">
        @for (feature of offer().features; track feature) {
          <div class="flex items-center justify-center text-green-100 text-sm">
            <i class="pi pi-check text-white text-xs mr-2"></i>
            <span>{{ feature }}</span>
          </div>
        }
      </div>

      <!-- CTA Button -->
      <p-button
        [label]="offer().ctaText"
        icon="pi pi-arrow-right"
        iconPos="right"
        [raised]="true"
        class="w-full bg-white text-green-600 hover:bg-green-50 font-bold transform hover:scale-105 transition-all duration-200"
        (onClick)="onCtaClick()"
      />

      <!-- Time Left -->
      @if (offer().timeLeft) {
        <div class="mt-3 text-green-100 text-xs">
          <i class="pi pi-clock mr-1"></i>
          {{ offer().timeLeft }}
        </div>
      }

    </div>

    <!-- Decorative Corner -->
    <div class="absolute top-0 right-0 w-20 h-20 opacity-30">
      <svg viewBox="0 0 100 100" class="w-full h-full text-white">
        <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" opacity="0.1"/>
        <circle cx="85" cy="15" r="3" fill="currentColor" opacity="0.6"/>
        <circle cx="70" cy="30" r="2" fill="currentColor" opacity="0.4"/>
        <circle cx="90" cy="35" r="1.5" fill="currentColor" opacity="0.8"/>
      </svg>
    </div>

  </div>
`,
  styles: [`
  :host {
    display: block;
    height: 100%;
  }

  :host ::ng-deep {
    .p-button {
      transition: all 0.3s ease;
      border: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .p-button:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
    }

    .p-button:active {
      transform: translateY(0) scale(1.02);
    }

    .p-badge {
      font-size: 0.75rem;
      padding: 0.5rem 1rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
    50% { box-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6); }
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
`]
})
export class QuickCtaComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private countdownInterval?: number;

  offer = signal<CtaOffer>({
    title: '¡Oferta Flash!',
    subtitle: 'Internet 500 Mbps + Cable TV',
    discount: '50%',
    originalPrice: 'S/ 179.90',
    currentPrice: 'S/ 89.90',
    timeLeft: 'Termina en 2 días',
    features: [
      'Instalación GRATIS',
      'WiFi 6 incluido',
      '200+ canales HD'
    ],
    ctaText: 'Contratar Ahora',
    urgencyText: '⚡ ÚLTIMAS HORAS',
    isLimited: true
  });

// Computed for dynamic styling
  urgencyLevel = computed(() => {
    const timeLeft = this.offer().timeLeft;
    if (timeLeft.includes('horas')) return 'high';
    if (timeLeft.includes('1 día') || timeLeft.includes('2 días')) return 'medium';
    return 'low';
  });

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private startCountdown(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Simulate countdown (in real app, this would be calculated from server time)
    let hours = 47; // 2 days - 1 hour

    this.countdownInterval = window.setInterval(() => {
      if (hours <= 0) {
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
        }
        this.offer.update(current => ({
          ...current,
          timeLeft: '¡Oferta expirada!',
          isLimited: false
        }));
        return;
      }

      hours--;
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;

      let timeText = '';
      if (days > 0) {
        timeText = `Termina en ${days} día${days > 1 ? 's' : ''} y ${remainingHours} hora${remainingHours !== 1 ? 's' : ''}`;
      } else {
        timeText = `Termina en ${remainingHours} hora${remainingHours !== 1 ? 's' : ''}`;
      }

      this.offer.update(current => ({
        ...current,
        timeLeft: timeText
      }));

      // Update urgency text based on time left
      if (hours <= 24) {
        this.offer.update(current => ({
          ...current,
          urgencyText: '🔥 ÚLTIMAS 24 HORAS'
        }));
      } else if (hours <= 6) {
        this.offer.update(current => ({
          ...current,
          urgencyText: '⚠️ ÚLTIMAS 6 HORAS'
        }));
      }

    }, 60000); // Update every minute for demo (3600000 for every hour)
  }

  onCtaClick(): void {
    console.log('Quick CTA clicked');
    this.trackCtaClick();

    // Navigate to checkout or open modal
    // this.router.navigate(['/checkout'], {
    //   queryParams: { plan: 'flash-offer', source: 'quick-cta' }
    // });
  }

  private trackCtaClick(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Analytics tracking - safely check for gtag
    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          event_category: 'engagement',
          event_label: 'quick_cta_flash_offer',
          value: 1
        });
      }
    } catch (error) {
      console.log('Analytics tracking not available:', error);
    }

    // Alternative: Custom analytics service
    // this.analyticsService.track('cta_click', {
    //   component: 'quick_cta',
    //   offer: 'flash_offer'
    // });
  }
}
