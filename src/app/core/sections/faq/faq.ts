import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, HelpCircle, ChevronDown, CheckCircle, Info, MessageCircle, Phone, MessageSquare, Zap, Wifi, Shield, Monitor, Headphones, Package, Users, Clock, Star } from 'lucide-angular';

interface FAQ {
  question: string;
  answer: string;
  additionalInfo?: string;
}

interface Particle {
  x: number;
  y: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class Faq implements OnInit {
  openFaq: number | null = null;
  particles: Particle[] = [];

// Iconos importados de Lucide
  readonly HelpCircleIcon = HelpCircle;
  readonly ChevronDownIcon = ChevronDown;
  readonly CheckCircleIcon = CheckCircle;
  readonly InfoIcon = Info;
  readonly MessageCircleIcon = MessageCircle;
  readonly PhoneIcon = Phone;
  readonly MessageSquareIcon = MessageSquare;
  readonly ZapIcon = Zap;
  readonly WifiIcon = Wifi;
  readonly ShieldIcon = Shield;
  readonly MonitorIcon = Monitor;
  readonly HeadphonesIcon = Headphones;
  readonly PackageIcon = Package;
  readonly UsersIcon = Users;
  readonly ClockIcon = Clock;
  readonly StarIcon = Star;

  faqs: FAQ[] = [
    {
      question: '¿Qué diferencia a CableLuz de otros proveedores?',
      answer: 'CableLuz ofrece conexión 100% por fibra óptica directa a tu hogar (FTTH), a diferencia de otros proveedores que usan tecnologías híbridas. Esto garantiza velocidades simétricas, menor latencia y mayor estabilidad las 24 horas del día, sin importar la hora o la demanda de la zona.',
      additionalInfo: 'Además, incluimos WiFi 6, soporte técnico 24/7 y acceso a plataformas premium sin costo adicional durante los primeros 6 meses.'
    },
    {
      question: '¿Hay contratos de permanencia obligatorios?',
      answer: 'No. En CableLuz no creemos en atar a nuestros clientes con contratos de permanencia. Puedes cancelar cuando quieras sin penalidades ni costos ocultos. Tu satisfacción es nuestra prioridad y confiamos en que te quedarás por la calidad de nuestro servicio.',
      additionalInfo: 'Ofrecemos flexibilidad total porque confiamos en la calidad de nuestro servicio y en tu satisfacción.'
    },
    {
      question: '¿Cómo es el proceso de instalación técnica?',
      answer: 'Nuestro técnico especializado agenda una cita a tu conveniencia y realiza la instalación en promedio en 2 horas. La instalación es totalmente gratis en todos nuestros paquetes e incluye configuración completa del WiFi, pruebas de velocidad y optimización de la red.',
      additionalInfo: 'También realizamos una prueba completa de velocidad y te enseñamos a usar todos los servicios incluidos.'
    },
    {
      question: '¿Qué pasa si no estoy satisfecho con el servicio?',
      answer: 'Ofrecemos una garantía de satisfacción de 60 días. Si en ese periodo no estás completamente satisfecho con la velocidad, estabilidad o calidad del servicio, te devolvemos tu dinero sin preguntas ni trámites complicados.',
      additionalInfo: 'Nuestro índice de satisfacción es del 98%, pero tu tranquilidad es lo más importante para nosotros.'
    },
    {
      question: '¿Puedo trasladar mi servicio si me mudo de casa?',
      answer: 'Sí, el traslado de servicio es completamente gratuito dentro de nuestra área de cobertura. Solo debes notificarnos con 3 días de anticipación y coordinaremos la nueva instalación sin interrumpir tu servicio durante el proceso.',
      additionalInfo: 'Si te mudas fuera de nuestra cobertura, puedes cancelar sin penalidades ni costos adicionales.'
    },
    {
      question: '¿Qué incluye exactamente el soporte técnico 24/7?',
      answer: 'Nuestro soporte técnico especializado está disponible las 24 horas, los 7 días de la semana. Incluye asistencia remota, diagnóstico de problemas, optimización de red, soporte para todos los dispositivos conectados y resolución de incidencias.',
      additionalInfo: 'Tiempo promedio de respuesta: 2 minutos por chat en vivo y 30 segundos por teléfono directo.'
    }
  ];

  ngOnInit() {
    this.generateParticles();
  }

  generateParticles() {
    this.particles = [];
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4
      });
    }
  }

  toggleFaq(index: number): void {
    if (this.openFaq === index) {
      this.openFaq = null;
    } else {
      this.openFaq = index;
      // Regenerar partículas cuando se abre un FAQ
      this.generateParticles();
    }
  }

// Métodos para iconos temáticos según la pregunta
  getQuestionIcon(index: number): any {
    const icons = [
      this.ZapIcon,        // Diferencias
      this.ShieldIcon,     // Contratos
      this.WifiIcon,       // Instalación
      this.StarIcon,       // Satisfacción
      this.PackageIcon,    // Mudanza
      this.HeadphonesIcon  // Soporte
    ];
    return icons[index] || this.HelpCircleIcon;
  }

// Clases de fondo para iconos con mejor contraste
  getIconBgClass(index: number): string {
    const bgClasses = [
      'bg-primary-500/15 border-primary-400/25',     // Azul
      'bg-secondary-500/15 border-secondary-400/25', // Cian
      'bg-accent-500/15 border-accent-400/25',       // Verde
      'bg-highlight-500/15 border-highlight-400/25', // Naranja
      'bg-primary-500/15 border-primary-400/25',     // Azul
      'bg-secondary-500/15 border-secondary-400/25'  // Cian
    ];
    return bgClasses[index] || 'bg-neutral-500/15 border-neutral-400/25';
  }

// Clases de color para iconos
  getIconColorClass(index: number): string {
    const colorClasses = [
      'text-primary-300',
      'text-secondary-300',
      'text-accent-300',
      'text-highlight-300',
      'text-primary-300',
      'text-secondary-300'
    ];
    return colorClasses[index] || 'text-neutral-300';
  }

// Gradientes para sombras dinámicas
  getShadowGradient(index: number): string {
    const gradients = [
      'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(8, 145, 178, 0.3) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(8, 145, 178, 0.3) 0%, transparent 70%)'
    ];
    return gradients[index] || 'radial-gradient(circle, rgba(115, 115, 115, 0.3) 0%, transparent 70%)';
  }

// Gradientes para cartas
  getCardGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%)',
      'linear-gradient(135deg, rgba(8, 145, 178, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)',
      'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
      'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)',
      'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%)',
      'linear-gradient(135deg, rgba(8, 145, 178, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)'
    ];
    return gradients[index] || 'linear-gradient(135deg, rgba(115, 115, 115, 0.15) 0%, rgba(75, 75, 75, 0.1) 100%)';
  }

// Gradientes para iconos con pulso de energía
  getIconGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(8, 145, 178, 0.2) 100%)',
      'linear-gradient(135deg, rgba(8, 145, 178, 0.4) 0%, rgba(16, 185, 129, 0.2) 100%)',
      'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(245, 158, 11, 0.2) 100%)',
      'linear-gradient(135deg, rgba(245, 158, 11, 0.4) 0%, rgba(59, 130, 246, 0.2) 100%)',
      'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(8, 145, 178, 0.2) 100%)',
      'linear-gradient(135deg, rgba(8, 145, 178, 0.4) 0%, rgba(16, 185, 129, 0.2) 100%)'
    ];
    return gradients[index] || 'linear-gradient(135deg, rgba(115, 115, 115, 0.4) 0%, rgba(75, 75, 75, 0.2) 100%)';
  }
}
