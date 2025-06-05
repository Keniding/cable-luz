import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-support-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    AccordionModule,
    InputTextModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Centro de Ayuda</h1>
          <p class="text-xl text-gray-600">Encuentra respuestas rápidas a tus preguntas</p>
        </div>

        <!-- Search -->
        <div class="max-w-2xl mx-auto mb-12">
          <div class="relative">
            <input
              pInputText
              placeholder="Buscar en el centro de ayuda..."
              class="w-full pl-12 pr-4 py-3 text-lg"
            />
            <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <p-card class="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <i class="pi pi-wifi text-4xl text-blue-500 mb-3"></i>
            <h3 class="font-bold mb-2">Problemas de Conexión</h3>
            <p class="text-sm text-gray-600">Soluciona problemas de internet</p>
          </p-card>

          <p-card class="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <i class="pi pi-credit-card text-4xl text-green-500 mb-3"></i>
            <h3 class="font-bold mb-2">Facturación</h3>
            <p class="text-sm text-gray-600">Consultas sobre tu factura</p>
          </p-card>

          <p-card class="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <i class="pi pi-cog text-4xl text-purple-500 mb-3"></i>
            <h3 class="font-bold mb-2">Configuración</h3>
            <p class="text-sm text-gray-600">Configura tu equipo</p>
          </p-card>

          <p-card class="text-center cursor-pointer hover:shadow-lg transition-shadow">
            <i class="pi pi-phone text-4xl text-red-500 mb-3"></i>
            <h3 class="font-bold mb-2">Contactar Soporte</h3>
            <p class="text-sm text-gray-600">Habla con un técnico</p>
          </p-card>
        </div>

        <!-- FAQ -->
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h2>

          <p-accordion>
            <p-accordion-panel>
              <p-accordion-header>
                <span>¿Cómo puedo verificar la velocidad de mi internet?</span>
              </p-accordion-header>
              <p-accordion-content>
                <p>Puedes verificar la velocidad de tu conexión utilizando nuestro test de velocidad oficial o herramientas como Speedtest.net. Asegúrate de estar conectado por cable ethernet para obtener mediciones más precisas.</p>
              </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel>
              <p-accordion-header>
                <span>¿Qué hacer si mi internet está lento?</span>
              </p-accordion-header>
              <p-accordion-content>
                <p>Primero, reinicia tu módem y router desconectándolos por 30 segundos. Verifica que no haya muchos dispositivos conectados simultáneamente. Si el problema persiste, contacta a nuestro soporte técnico.</p>
              </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel>
              <p-accordion-header>
                <span>¿Cómo cambio la contraseña de mi WiFi?</span>
              </p-accordion-header>
              <p-accordion-content>
                <p>Accede a la configuración de tu router ingresando 192.168.1.1 en tu navegador. Usa las credenciales de administrador (usuario: admin, contraseña: admin por defecto) y busca la sección de configuración inalámbrica.</p>
              </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel>
              <p-accordion-header>
                <span>¿Cuándo llega mi factura?</span>
              </p-accordion-header>
              <p-accordion-content>
                <p>Las facturas se generan mensualmente y llegan entre el día 1 y 5 de cada mes. Puedes consultar tu factura en línea a través de nuestro portal de clientes o recibirla por email.</p>
              </p-accordion-content>
            </p-accordion-panel>

            <p-accordion-panel>
              <p-accordion-header>
                <span>¿Cómo puedo cambiar mi plan?</span>
              </p-accordion-header>
              <p-accordion-content>
                <p>Puedes cambiar tu plan contactando a nuestro servicio al cliente al 01-234-5678 o a través de nuestro portal web. Los cambios de plan se hacen efectivos en el siguiente ciclo de facturación.</p>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>

        <!-- Contact Support -->
        <div class="text-center mt-12">
          <h3 class="text-xl font-bold mb-4">¿No encontraste lo que buscabas?</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <p-button
              label="Chat en Vivo"
              icon="pi pi-comments"
              [raised]="true"
            />
            <p-button
              label="Llamar Soporte"
              icon="pi pi-phone"
              [outlined]="true"
            />
            <p-button
              label="Enviar Ticket"
              icon="pi pi-envelope"
              [outlined]="true"
              routerLink="/contacto"
            />
          </div>
        </div>
      </div>
    </div>
  `
})
export class SupportPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Soporte y Ayuda - CableLuz',
      description: 'Centro de ayuda con preguntas frecuentes, guías de configuración y soporte técnico para tu internet.',
      keywords: 'soporte tecnico, ayuda internet, configuracion wifi, problemas conexion'
    });
  }
}
