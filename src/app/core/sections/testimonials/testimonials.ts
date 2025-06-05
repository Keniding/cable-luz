import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentTestimonial = 0;
  private testimonialInterval: any;

  testimonials: Testimonial[] = [
    {
      text: 'Desde que contraté CableLuz, mi experiencia con el internet cambió completamente. Trabajo desde casa y necesito conexión estable, aquí nunca me ha fallado. Además, el soporte técnico responde en minutos.',
      name: 'Carlos Mendoza',
      role: 'Ingeniero de Sistemas',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      text: 'La mejor relación calidad-precio que he encontrado. Mis hijos pueden ver Netflix en 4K mientras yo trabajo y mi esposa hace videollamadas, sin ningún problema de velocidad.',
      name: 'Laura Torres',
      role: 'Madre de familia',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      text: 'Como gamer profesional, necesito el mínimo ping posible. CableLuz me da una conexión estable con menos de 10ms en servidores locales. Además, el paquete premium incluye todas las plataformas que uso.',
      name: 'Javier Rojas',
      role: 'Gamer profesional',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ];

  ngOnInit(): void {
    this.startAutoRotation();
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  setCurrentTestimonial(index: number): void {
    this.currentTestimonial = index;
    this.resetInterval();
  }

  private startAutoRotation(): void {
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  private stopAutoRotation(): void {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  private resetInterval(): void {
    this.stopAutoRotation();
    this.startAutoRotation();
  }
}
