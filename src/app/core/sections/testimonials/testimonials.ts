import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Quote, Star, ChevronLeft, ChevronRight, Users, MessageCircle, TrendingUp, Heart } from 'lucide-angular';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  location: string;
  package: string;
}

interface SatisfactionStat {
  title: string;
  value: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  gradientBg: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss']
})
export class Testimonials {
  currentTestimonial = 0;

// Iconos importados de Lucide
  readonly QuoteIcon = Quote;
  readonly StarIcon = Star;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly UsersIcon = Users;
  readonly MessageCircleIcon = MessageCircle;
  readonly TrendingUpIcon = TrendingUp;
  readonly HeartIcon = Heart;

  testimonials: Testimonial[] = [
    {
      text: 'Desde que contraté CableLuz, mi experiencia con el internet cambió completamente. Trabajo desde casa y necesito conexión estable, aquí nunca me ha fallado. Además, el soporte técnico responde en minutos y siempre resuelven todo de manera profesional.',
      name: 'Carlos Mendoza',
      role: 'Ingeniero de Sistemas',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      location: 'Lima, Perú',
      package: 'Avanzado'
    },
    {
      text: 'La mejor relación calidad-precio que he encontrado. Mis hijos pueden ver Netflix en 4K mientras yo trabajo y mi esposa hace videollamadas, sin ningún problema de velocidad. La instalación fue súper rápida y profesional.',
      name: 'Laura Torres',
      role: 'Madre de familia',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      location: 'Arequipa, Perú',
      package: 'Premium'
    },
    {
      text: 'Como gamer profesional, necesito el mínimo ping posible. CableLuz me da una conexión estable con menos de 10ms en servidores locales. Además, el paquete premium incluye todas las plataformas que uso. ¡Increíble servicio!',
      name: 'Javier Rojas',
      role: 'Gamer profesional',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      rating: 5,
      location: 'Cusco, Perú',
      package: 'Premium'
    },
    {
      text: 'Excelente servicio al cliente y tecnología de primera. La app móvil es muy intuitiva y puedo controlar todo desde mi celular. Los canales en 4K se ven espectaculares. Definitivamente recomiendo CableLuz a todos.',
      name: 'Ana Vásquez',
      role: 'Diseñadora Gráfica',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      location: 'Trujillo, Perú',
      package: 'Básico'
    }
  ];

  satisfactionStats: SatisfactionStat[] = [
    {
      title: 'Satisfacción del Cliente',
      value: '98%',
      icon: this.HeartIcon,
      iconBg: 'bg-gradient-to-r from-accent-500/20 to-accent-600/20 border border-accent-400/30',
      iconColor: 'text-accent-300',
      gradientBg: 'from-accent-500/10 to-accent-600/5'
    },
    {
      title: 'Clientes Activos',
      value: '50K+',
      icon: this.UsersIcon,
      iconBg: 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-400/30',
      iconColor: 'text-primary-300',
      gradientBg: 'from-primary-500/10 to-primary-600/5'
    },
    {
      title: 'Nos Recomiendan',
      value: '96%',
      icon: this.TrendingUpIcon,
      iconBg: 'bg-gradient-to-r from-secondary-500/20 to-secondary-600/20 border border-secondary-400/30',
      iconColor: 'text-secondary-300',
      gradientBg: 'from-secondary-500/10 to-secondary-600/5'
    }
  ];

// 🔧 MÉTODO CORREGIDO para evitar doble salto
  goToTestimonial(index: number): void {
    // Solo cambiar si el índice es diferente al actual
    if (index !== this.currentTestimonial) {
      this.currentTestimonial = index;
    }
  }

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonial = this.currentTestimonial === 0
      ? this.testimonials.length - 1
      : this.currentTestimonial - 1;
  }

// Método para generar array de estrellas
  getStarArray(rating: number): number[] {
    return Array(rating).fill(0).map((_, i) => i);
  }
}
