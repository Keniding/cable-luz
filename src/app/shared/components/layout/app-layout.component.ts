import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

// PrimeNG Components
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { SeoService } from '../../../core/services/seo.service';
import {PRIME_NG_CONFIG} from 'primeng/config';
import {Tooltip} from 'primeng/tooltip';

interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  items?: MenuItem[];
  badge?: string;
  badgeStyleClass?: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenubarModule,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    ScrollTopModule,
    ToastModule,
    RouterLink,
    Tooltip
  ],
  providers: [MessageService],
  template: `
  <!-- Header -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p-menubar
        [model]="menuItems"
        class="border-none bg-transparent p-0">

        <!-- Logo -->
        <ng-template pTemplate="start">
          <div class="flex items-center space-x-3 py-2">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i class="pi pi-bolt text-white text-xl"></i>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CableLuz
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Conectando tu mundo
              </p>
            </div>
          </div>
        </ng-template>

        <!-- Actions -->
        <ng-template pTemplate="end">
          <div class="flex items-center space-x-2">
            <!-- Search (hidden on mobile) -->
            <div class="hidden md:block relative">
              <span class="p-input-icon-left">
                <i class="pi pi-search text-gray-400"></i>
                <input
                  type="text"
                  pInputText
                  placeholder="Buscar planes..."
                  class="w-48 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </span>
            </div>

            <!-- Phone -->
            <p-button
              icon="pi pi-phone"
              [text]="true"
              [rounded]="true"
              class="hidden sm:block"
              pTooltip="Llamar ahora"
              tooltipPosition="bottom"
              (onClick)="callNow()"
            />

            <!-- CTA Button -->
            <p-button
              label="Contratar"
              icon="pi pi-shopping-cart"
              class="hidden sm:block"
              [raised]="true"
              severity="success"
              size="small"
              (onClick)="openContractModal()"
            />

            <!-- Mobile menu button -->
            <p-button
              icon="pi pi-bars"
              [text]="true"
              [rounded]="true"
              class="sm:hidden"
              (onClick)="toggleMobileMenu()"
            />
          </div>
        </ng-template>
      </p-menubar>
    </div>

    <!-- Mobile Menu Overlay -->
    @if (showMobileMenu) {
      <div class="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div class="space-y-2">
          @for (item of mobileMenuItems; track item.label) {
            <a
              [routerLink]="item.routerLink"
              class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              (click)="closeMobileMenu()"
            >
              <i [class]="item.icon" class="mr-2"></i>
              {{ item.label }}
              @if (item.badge) {
                <p-badge
                  [value]="item.badge"
                  [styleClass]="item.badgeStyleClass || ''"
                  class="ml-2"
                />
              }
            </a>
          }

          <!-- Mobile CTA -->
          <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p-button
              label="Contratar Ahora"
              icon="pi pi-shopping-cart"
              [raised]="true"
              severity="success"
              class="w-full"
              (onClick)="openContractModal()"
            />
          </div>
        </div>
      </div>
    }
  </header>

  <!-- Main Content -->
  <main class="min-h-screen">
    <router-outlet />
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i class="pi pi-bolt text-white"></i>
            </div>
            <h3 class="text-xl font-bold">CableLuz</h3>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Conectamos tu hogar con la mejor tecnología en internet fibra óptica y cable TV.
            Más de 10 años brindando el mejor servicio en Perú.
          </p>
          <div class="flex space-x-3">
            <p-button
              icon="pi pi-facebook"
              [text]="true"
              [rounded]="true"
              class="text-gray-400 hover:text-blue-500"
            />
            <p-button
              icon="pi pi-twitter"
              [text]="true"
              [rounded]="true"
              class="text-gray-400 hover:text-blue-400"
            />
            <p-button
              icon="pi pi-instagram"
              [text]="true"
              [rounded]="true"
              class="text-gray-400 hover:text-pink-500"
            />
            <p-button
              icon="pi pi-youtube"
              [text]="true"
              [rounded]="true"
              class="text-gray-400 hover:text-red-500"
            />
          </div>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold mb-4 text-white">Servicios</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Internet Fibra Óptica</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Cable TV HD</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Streaming Premium</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Telefonía Fija</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Paquetes Empresariales</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="font-semibold mb-4 text-white">Soporte</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Centro de Ayuda</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Chat en Vivo</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Reportar Problema</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Estado del Servicio</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Términos y Condiciones</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold mb-4 text-white">Contacto</h4>
          <div class="space-y-3 text-sm">
            <div class="flex items-center space-x-3 text-gray-400">
              <i class="pi pi-phone text-blue-500"></i>
              <span>+51 1 234-5678</span>
            </div>
            <div class="flex items-center space-x-3 text-gray-400">
              <i class="pi pi-envelope text-blue-500"></i>
              <span>info&#64;cableluz.com</span>
            </div>
            <div class="flex items-center space-x-3 text-gray-400">
              <i class="pi pi-map-marker text-blue-500"></i>
              <span>Lima, Perú</span>
            </div>
            <div class="flex items-center space-x-3 text-gray-400">
              <i class="pi pi-clock text-blue-500"></i>
              <span>24/7 Atención</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © 2024 CableLuz. Todos los derechos reservados.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Privacidad</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Términos</a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Back to Top -->
  <p-scrollTop
    [threshold]="300"
    icon="pi pi-arrow-up"
    styleClass="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-lg"
  />

  <!-- Toast Messages -->
  <p-toast position="top-right" />
`,
  styles: [`
  :host ::ng-deep {
    .p-menubar {
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 0 !important;
    }

    .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
    }

    .p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
      background: rgba(59, 130, 246, 0.1);
      color: rgb(59, 130, 246);
    }

    .p-scrolltop {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
`]
})
export class AppLayoutComponent implements OnInit {
  private seoService = inject(SeoService);
  private messageService = inject(MessageService);
  private primengConfig = inject(PRIME_NG_CONFIG);

  showMobileMenu = false;

  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Planes',
      icon: 'pi pi-list',
      routerLink: '/planes',
      badge: 'Nuevo',
      badgeStyleClass: 'bg-blue-500'
    },
    {
      label: 'Servicios',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Internet Fibra',
          icon: 'pi pi-wifi',
          routerLink: '/servicios/internet'
        },
        {
          label: 'Cable TV',
          icon: 'pi pi-tv',
          routerLink: '/servicios/cable-tv'
        },
        {
          label: 'Streaming',
          icon: 'pi pi-play',
          routerLink: '/servicios/streaming'
        }
      ]
    },
    {
      label: 'Cobertura',
      icon: 'pi pi-map',
      routerLink: '/cobertura'
    },
    {
      label: 'Soporte',
      icon: 'pi pi-question-circle',
      routerLink: '/soporte'
    },
    {
      label: 'Nosotros',
      icon: 'pi pi-users',
      routerLink: '/nosotros'
    }
  ];

  mobileMenuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Planes', icon: 'pi pi-list', routerLink: '/planes', badge: 'Nuevo', badgeStyleClass: 'bg-blue-500' },
    { label: 'Internet Fibra', icon: 'pi pi-wifi', routerLink: '/servicios/internet' },
    { label: 'Cable TV', icon: 'pi pi-tv', routerLink: '/servicios/cable-tv' },
    { label: 'Cobertura', icon: 'pi pi-map', routerLink: '/cobertura' },
    { label: 'Soporte', icon: 'pi pi-question-circle', routerLink: '/soporte' },
    { label: 'Nosotros', icon: 'pi pi-users', routerLink: '/nosotros' }
  ];

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.seoService.updateSEO(this.seoService.getHomePageSEO());
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }

  callNow(): void {
    window.open('tel:+51123456789', '_self');
  }

  openContractModal(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Próximamente',
      detail: 'El configurador de planes estará disponible pronto'
    });
  }
}
