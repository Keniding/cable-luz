import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    Tooltip
  ],
  template: `
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-lg w-full">
      <p-card class="text-center shadow-2xl">
        <ng-template pTemplate="header">
          <div class="p-8 pb-4">
            <!-- 404 Animation -->
            <div class="relative mb-6">
              <div class="text-8xl font-bold text-blue-500 opacity-20">404</div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-bounce">
                  <i class="pi pi-exclamation-triangle text-white text-3xl"></i>
                </div>
              </div>
            </div>

            <h1 class="text-3xl font-bold text-gray-800 mb-4">
              ¡Oops! Página no encontrada
            </h1>

            <p class="text-gray-600 mb-6 leading-relaxed">
              La página que buscas no existe o ha sido movida.
              No te preocupes, te ayudamos a encontrar lo que necesitas.
            </p>
          </div>
        </ng-template>

        <div class="space-y-4">
          <!-- Quick Actions -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p-button
              label="Ir al Inicio"
              icon="pi pi-home"
              routerLink="/"
              [raised]="true"
              class="w-full"
              severity="primary"
            />

            <p-button
              label="Ver Planes"
              icon="pi pi-list"
              routerLink="/planes"
              [outlined]="true"
              class="w-full"
              severity="primary"
            />
          </div>

          <!-- Popular Links -->
          <div class="pt-4 border-t border-gray-200">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Enlaces populares:</h3>
            <div class="flex flex-wrap gap-2 justify-center">
              <a
                routerLink="/servicios/internet"
                class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Internet Fibra
              </a>
              <span class="text-gray-300">•</span>
              <a
                routerLink="/servicios/cable-tv"
                class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Cable TV
              </a>
              <span class="text-gray-300">•</span>
              <a
                routerLink="/soporte"
                class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Soporte
              </a>
              <span class="text-gray-300">•</span>
              <a
                routerLink="/cobertura"
                class="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Cobertura
              </a>
            </div>
          </div>

          <!-- Contact Support -->
          <div class="pt-4 border-t border-gray-200">
            <p class="text-sm text-gray-600 mb-3">
              ¿Necesitas ayuda? Contáctanos:
            </p>
            <div class="flex justify-center space-x-4">
              <p-button
                icon="pi pi-phone"
                [text]="true"
                [rounded]="true"
                pTooltip="Llamar ahora"
                tooltipPosition="top"
                (onClick)="callSupport()"
              />
              <p-button
                icon="pi pi-comments"
                [text]="true"
                [rounded]="true"
                pTooltip="Chat en vivo"
                tooltipPosition="top"
                routerLink="/soporte/chat"
              />
              <p-button
                icon="pi pi-envelope"
                [text]="true"
                [rounded]="true"
                pTooltip="Enviar email"
                tooltipPosition="top"
                (onClick)="sendEmail()"
              />
            </div>
          </div>
        </div>
      </p-card>
    </div>
  </div>
`,
  styles: [`
  :host ::ng-deep {
    .p-card {
      border-radius: 1rem;
      overflow: hidden;
    }

    .p-card .p-card-body {
      padding: 0;
    }

    .p-button {
      transition: all 0.3s ease;
    }

    .p-button:hover {
      transform: translateY(-2px);
    }

    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0,-30px,0);
      }
      70% {
        transform: translate3d(0,-15px,0);
      }
      90% {
        transform: translate3d(0,-4px,0);
      }
    }

    .animate-bounce {
      animation: bounce 2s infinite;
    }
  }
`]
})
export class NotFoundComponent {

  callSupport(): void {
    window.open('tel:+51123456789', '_self');
  }

  sendEmail(): void {
    window.open('mailto:soporte@cableluz.com?subject=Ayuda - Página no encontrada', '_self');
  }
}
