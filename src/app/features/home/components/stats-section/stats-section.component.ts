import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';

interface StatItem {
  id: string;
  label: string;
  value: number;
  displayValue: string;
  icon: string;
  color: string;
  bgColor: string;
  suffix: string;
  prefix: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  description: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    BadgeModule,
    TagModule,
    ProgressBarModule,
    ChartModule
  ],
  template: `
  <div class="p-6 h-full">

    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          Estadísticas en Tiempo Real
        </h2>
        <p-badge
          value="LIVE"
          severity="success"
          class="animate-pulse"
        />
      </div>
      <p class="text-gray-600 dark:text-gray-300 text-sm">
        Rendimiento de nuestra red en los últimos 30 días
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      @for (stat of stats(); track stat.id) {
        <div
          class="relative p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
          [class]="stat.bgColor"
          (click)="onStatClick(stat)"
        >
          <!-- Icon -->
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              [class]="stat.color + ' bg-white/20'"
            >
              <i [class]="stat.icon + ' text-lg'"></i>
            </div>

            <!-- Trend Indicator -->
            <div class="flex items-center space-x-1">
              @if (stat.trend === 'up') {
                <i class="pi pi-arrow-up text-green-500 text-xs"></i>
                <span class="text-green-500 text-xs font-medium">{{ stat.trendValue }}</span>
              } @else if (stat.trend === 'down') {
                <i class="pi pi-arrow-down text-red-500 text-xs"></i>
                <span class="text-red-500 text-xs font-medium">{{ stat.trendValue }}</span>
              } @else {
                <i class="pi pi-minus text-gray-500 text-xs"></i>
                <span class="text-gray-500 text-xs font-medium">{{ stat.trendValue }}</span>
              }
            </div>
          </div>

          <!-- Value -->
          <div class="mb-2">
            <div class="text-2xl font-bold text-white mb-1">
              {{ stat.prefix }}{{ animatedValues()[stat.id] || 0 }}{{ stat.suffix }}
            </div>
            <div class="text-white/80 text-sm font-medium">
              {{ stat.label }}
            </div>
          </div>

          <!-- Description -->
          <div class="text-white/70 text-xs">
            {{ stat.description }}
          </div>

          <!-- Progress Bar for some stats -->
          @if (stat.id === 'uptime' || stat.id === 'satisfaction') {
            <div class="mt-3">
              <p-progressBar
                [value]="stat.value"
                [showValue]="false"
                class="h-1"
                [style]="{'height': '4px'}"
              />
            </div>
          }

          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      }
    </div>

    <!-- Mini Chart -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Velocidad Promedio (7 días)
        </h3>
        <p-tag
          value="Mbps"
          severity="info"
          class="text-xs"
        />
      </div>

      <div class="h-16">
        <p-chart
          type="line"
          [data]="chartData()"
          [options]="chartOptions()"
          class="w-full h-full"
        />
      </div>
    </div>

  </div>
`,
  styles: [`
  :host {
    display: block;
    height: 100%;
  }

  :host ::ng-deep {
    .p-progressbar {
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }

    .p-progressbar .p-progressbar-value {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 2px;
    }

    .p-chart canvas {
      max-height: 64px !important;
    }

    .p-badge {
      font-size: 0.625rem;
      padding: 0.25rem 0.5rem;
    }
  }

  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-count-up {
    animation: countUp 0.5s ease-out;
  }
`]
})
export class StatsSectionComponent implements OnInit, OnDestroy {

  private isDestroyed = false;

  stats = signal<StatItem[]>([
    {
      id: 'speed',
      label: 'Velocidad Promedio',
      value: 850,
      displayValue: '850',
      icon: 'pi pi-bolt',
      color: 'text-yellow-400',
      bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      suffix: ' Mbps',
      prefix: '',
      trend: 'up',
      trendValue: '+12%',
      description: 'Velocidad real medida'
    },
    {
      id: 'uptime',
      label: 'Tiempo Activo',
      value: 99.9,
      displayValue: '99.9',
      icon: 'pi pi-check-circle',
      color: 'text-green-400',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
      suffix: '%',
      prefix: '',
      trend: 'stable',
      trendValue: '0.1%',
      description: 'Disponibilidad del servicio'
    },
    {
      id: 'customers',
      label: 'Clientes Activos',
      value: 25000,
      displayValue: '25K',
      icon: 'pi pi-users',
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-500',
      suffix: '+',
      prefix: '',
      trend: 'up',
      trendValue: '+8%',
      description: 'Clientes satisfechos'
    },
    {
      id: 'satisfaction',
      label: 'Satisfacción',
      value: 96,
      displayValue: '96',
      icon: 'pi pi-heart',
      color: 'text-pink-400',
      bgColor: 'bg-gradient-to-br from-pink-500 to-rose-500',
      suffix: '%',
      prefix: '',
      trend: 'up',
      trendValue: '+3%',
      description: 'Calificación promedio'
    }
  ]);

// Animated values for counter effect
  animatedValues = signal<Record<string, number>>({});

// Chart data
  chartData = computed(() => ({
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [820, 850, 890, 870, 920, 880, 850],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      }
    ]
  }));

  chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        },
        min: 800,
        max: 950
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  }));

  ngOnInit(): void {
    this.startCounterAnimations();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  private startCounterAnimations(): void {
    const stats = this.stats();
    const animatedVals: Record<string, number> = {};

    stats.forEach(stat => {
      // Initialize with 0
      animatedVals[stat.id] = 0;

      // Animate to target value
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const increment = stat.value / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        if (this.isDestroyed || currentStep >= steps) {
          clearInterval(timer);
          animatedVals[stat.id] = stat.value;
          this.animatedValues.set({ ...animatedVals });
          return;
        }

        currentStep++;
        const currentValue = Math.min(increment * currentStep, stat.value);

        // Format value based on stat type
        if (stat.id === 'customers') {
          animatedVals[stat.id] = Math.floor(currentValue / 1000);
        } else if (stat.id === 'uptime') {
          animatedVals[stat.id] = Math.round(currentValue * 10) / 10;
        } else {
          animatedVals[stat.id] = Math.floor(currentValue);
        }

        this.animatedValues.set({ ...animatedVals });
      }, stepDuration);
    });
  }

  onStatClick(stat: StatItem): void {
    console.log('Stat clicked:', stat.label);
    // Could open detailed modal or navigate to analytics page
  }
}
