import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { SeoService } from '../../../../core/services/seo.service';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    MessageModule,
    Textarea
  ],
  template: `
  <div class="min-h-screen bg-gray-50 py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
        <p class="text-xl text-gray-600">Estamos aquí para ayudarte</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <p-card>
          <ng-template pTemplate="header">
            <div class="p-4">
              <h2 class="text-2xl font-bold">Envíanos un mensaje</h2>
            </div>
          </ng-template>

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                <input
                  pInputText
                  formControlName="name"
                  placeholder="Tu nombre completo"
                  class="w-full"
                  [class.ng-invalid]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
                />
                @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                  <small class="text-red-500">El nombre es requerido</small>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  pInputText
                  formControlName="email"
                  placeholder="tu@email.com"
                  class="w-full"
                  [class.ng-invalid]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                />
                @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                  <small class="text-red-500">Email válido es requerido</small>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                <input
                  pInputText
                  formControlName="phone"
                  placeholder="999 999 999"
                  class="w-full"
                  [class.ng-invalid]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched"
                />
                @if (contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched) {
                  <small class="text-red-500">Teléfono es requerido</small>
                }
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Motivo de consulta</label>
                <p-dropdown
                  formControlName="subject"
                  [options]="subjects"
                  placeholder="Selecciona un motivo"
                  class="w-full"
                  optionLabel="label"
                  optionValue="value"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                <textarea
                  pInputTextarea
                  formControlName="message"
                  placeholder="Escribe tu mensaje aquí..."
                  rows="4"
                  class="w-full"
                  [class.ng-invalid]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
                ></textarea>
                @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                  <small class="text-red-500">El mensaje es requerido</small>
                }
              </div>

              <p-button
                type="submit"
                label="Enviar Mensaje"
                icon="pi pi-send"
                [loading]="isSubmitting"
                [disabled]="contactForm.invalid"
                class="w-full"
              />
            </div>
          </form>
        </p-card>

        <!-- Contact Info -->
        <div class="space-y-6">
          <p-card>
            <ng-template pTemplate="header">
              <div class="p-4">
                <h2 class="text-2xl font-bold">Información de Contacto</h2>
              </div>
            </ng-template>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <i class="pi pi-phone text-blue-500 text-xl"></i>
                <div>
                  <p class="font-semibold">Teléfono</p>
                  <p class="text-gray-600">01 234 5678</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <i class="pi pi-envelope text-blue-500 text-xl"></i>
                <div>
                  <p class="font-semibold">Email</p>
                  <p class="text-gray-600">contacto&#64;cableluz.pe</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <i class="pi pi-map-marker text-blue-500 text-xl"></i>
                <div>
                  <p class="font-semibold">Dirección</p>
                  <p class="text-gray-600">Av. Principal 123, Lima, Perú</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <i class="pi pi-clock text-blue-500 text-xl"></i>
                <div>
                  <p class="font-semibold">Horario de Atención</p>
                  <p class="text-gray-600">Lun - Vie: 8:00 AM - 8:00 PM</p>
                  <p class="text-gray-600">Sáb: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </p-card>

          <p-card>
            <ng-template pTemplate="header">
              <div class="p-4">
                <h2 class="text-2xl font-bold">Canales de Atención</h2>
              </div>
            </ng-template>

            <div class="space-y-3">
              <p-button
                label="Chat en Vivo"
                icon="pi pi-comments"
                [outlined]="true"
                class="w-full"
                (onClick)="openChat()"
              />

              <p-button
                label="WhatsApp"
                icon="pi pi-whatsapp"
                [outlined]="true"
                class="w-full"
                (onClick)="openWhatsApp()"
              />

              <p-button
                label="Llamar Ahora"
                icon="pi pi-phone"
                [outlined]="true"
                class="w-full"
                (onClick)="callNow()"
              />
            </div>
          </p-card>
        </div>
      </div>
    </div>
  </div>
`
})
export class ContactPageComponent implements OnInit {
  private seoService = inject(SeoService);
  private fb = inject(FormBuilder);

  contactForm: FormGroup;
  isSubmitting = false;

  subjects = [
    { label: 'Consulta sobre planes', value: 'planes' },
    { label: 'Soporte técnico', value: 'soporte' },
    { label: 'Facturación', value: 'facturacion' },
    { label: 'Nuevas instalaciones', value: 'instalacion' },
    { label: 'Otros', value: 'otros' }
  ];

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Contacto - CableLuz',
      description: 'Contáctanos para resolver tus dudas sobre nuestros servicios de internet fibra óptica.',
      keywords: 'contacto cableluz, soporte tecnico, atencion cliente'
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        this.contactForm.reset();
      }, 2000);
    }
  }

  openChat(): void {
    console.log('Open chat');
  }

  openWhatsApp(): void {
    window.open('https://wa.me/51987654321', '_blank');
  }

  callNow(): void {
    window.open('tel:+51123456789', '_self');
  }
}
