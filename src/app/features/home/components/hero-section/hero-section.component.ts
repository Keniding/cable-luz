import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { RippleModule } from 'primeng/ripple';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badge: string;
  stats: Array<{ value: string; label: string; }>;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    ImageModule,
    RippleModule
  ],
  template: `
  <div class="relative h-full min-h-[500px] flex items-center overflow-hidden">

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,<svg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><g fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;><g fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;><circle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/></g></g></svg>');"></div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
    <div class="absolute bottom-20 left-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse" style="animation-delay: 2s;"></div>

    <!-- Content Container -->
    <div class="relative z-10 w-full px-8 py-12">
      <div class="max-w-4xl">

        <!-- Badge -->
        <div class="mb-6">
          <p-tag
            [value]="heroData().badge"
            severity="success"
            class="animate-bounce"
            icon="pi pi-star"
          />
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span class="block">{{ heroData().title }}</span>
          <span class="block text-2xl md:text-3xl lg:text-4xl font-normal text-blue-100 mt-2">
            {{ heroData().subtitle }}
          </span>
        </h1>

        <!-- Description -->
        <p class="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
          {{ heroData().description }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 mb-12">
          <p-button
            [label]="heroData().ctaPrimary"
            icon="pi pi-arrow-right"
            iconPos="right"
            size="large"
            class="bg-white text-blue-600 hover:bg-blue-50 border-white font-semibold px-8 py-3 transform hover:scale-105 transition-all duration-200"
            [raised]="true"
            (onClick)="onPrimaryAction()"
          />

          <p-button
            [label]="heroData().ctaSecondary"
            icon="pi pi-play"
            size="large"
            [outlined]="true"
            class="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 transition-all duration-200"
            (onClick)="onSecondaryAction()"
          />
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          @for (stat of heroData().stats; track stat.label) {
            <div class="text-center group">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-200">
                {{ stat.value }}
              </div>
              <div class="text-sm text-blue-100 font-medium">
                {{ stat.label }}
              </div>
            </div>
          }
        </div>

      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute bottom-0 right-0 w-64 h-64 opacity-20">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.8,-0.2C89.6,15.9,86.6,31.8,79.1,45.2C71.6,58.6,59.6,69.5,45.8,76.8C32,84.1,16,87.8,0.7,86.6C-14.6,85.4,-29.2,79.3,-42.3,71.8C-55.4,64.3,-67,55.4,-74.8,43.8C-82.6,32.2,-86.6,16,-87.4,-0.5C-88.2,-17,-85.8,-34,-79.1,-47.6C-72.4,-61.2,-61.4,-71.4,-48.3,-79.1C-35.2,-86.8,-17.6,-91.9,-0.8,-90.6C15.9,-89.3,31.8,-81.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
    </div>

  </div>
`,
  styles: [`
  :host {
    display: block;
    height: 100%;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  :host ::ng-deep {
    .p-button {
      transition: all 0.3s ease;
    }

    .p-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .p-tag {
      font-weight: 600;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  }
`]
})
export class HeroSectionComponent implements OnInit {

  heroData = signal<HeroData>({
    title: 'Internet Ultra Rápido',
    subtitle: 'Fibra Óptica hasta tu hogar',
    description: 'Disfruta de velocidades de hasta 1000 Mbps con la tecnología más avanzada. Instalación gratis, WiFi incluido y soporte 24/7.',
    ctaPrimary: 'Ver Planes',
    ctaSecondary: 'Ver Demo',
    badge: '🚀 Oferta Especial - 50% OFF',
    stats: [
      { value: '1000+', label: 'Mbps' },
      { value: '24/7', label: 'Soporte' },
      { value: '99.9%', label: 'Uptime' },
      { value: '0', label: 'Instalación' }
    ]
  });

  ngOnInit(): void {
    // Component initialization
  }

  onPrimaryAction(): void {
    // Navigate to plans or open modal
    console.log('Primary CTA clicked');
  }

  onSecondaryAction(): void {
    // Open video demo or more info
    console.log('Secondary CTA clicked');
  }
}
