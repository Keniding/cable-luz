import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  template: `
  <div class="min-h-screen bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Nosotros</h1>
        <p class="text-xl text-gray-600">Conoce más sobre CableLuz</p>
      </div>

      <p-card>
        <div class="prose max-w-none">
          <h2>Nuestra Historia</h2>
          <p>CableLuz es una empresa líder en telecomunicaciones que se dedica a brindar servicios de internet de alta velocidad mediante tecnología de fibra óptica.</p>

          <h2>Nuestra Misión</h2>
          <p>Conectar a las familias y empresas peruanas con la mejor tecnología de internet, proporcionando velocidades ultra rápidas y un servicio confiable.</p>

          <h2>Nuestros Valores</h2>
          <ul>
            <li>Calidad en el servicio</li>
            <li>Innovación tecnológica</li>
            <li>Compromiso con el cliente</li>
            <li>Responsabilidad social</li>
          </ul>
        </div>
      </p-card>
    </div>
  </div>
`
})
export class AboutPageComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Nosotros - CableLuz',
      description: 'Conoce la historia, misión y valores de CableLuz, líder en internet fibra óptica en Perú.',
      keywords: 'cableluz empresa, historia cableluz, mision vision'
    });
  }
}
