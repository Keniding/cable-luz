import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class Faq {
  openFaq: number | null = null;

  faqs: FAQ[] = [
    {
      question: '¿Qué diferencia a CableLuz de otros proveedores?',
      answer: 'CableLuz ofrece conexión 100% por fibra óptica directa a tu hogar (FTTH), a diferencia de otros proveedores que usan tecnologías híbridas. Esto garantiza velocidades simétricas, menor latencia y mayor estabilidad.'
    },
    {
      question: '¿Hay contratos de permanencia?',
      answer: 'No. En CableLuz no creemos en atar a nuestros clientes con contratos de permanencia. Puedes cancelar cuando quieras sin penalidades.'
    },
    {
      question: '¿Cómo es el proceso de instalación?',
      answer: 'Nuestro técnico especializado agenda una cita a tu conveniencia y realiza la instalación en promedio en 2 horas. La instalación es totalmente gratis en todos nuestros paquetes.'
    },
    {
      question: '¿Qué pasa si no estoy satisfecho con el servicio?',
      answer: 'Ofrecemos una garantía de satisfacción de 60 días. Si en ese periodo no estás completamente satisfecho, te devolvemos tu dinero sin preguntas.'
    },
    {
      question: '¿Puedo llevar mi servicio si me mudo?',
      answer: 'Sí, el traslado de servicio es gratuito dentro de nuestra área de cobertura. Solo debes notificarnos con 3 días de anticipación.'
    }
  ];

  toggleFaq(index: number): void {
    this.openFaq = this.openFaq === index ? null : index;
  }
}
