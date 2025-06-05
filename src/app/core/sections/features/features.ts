import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Zap, Film, Wifi, Smartphone, Shield, Gamepad2 } from 'lucide-angular';

interface Feature {
  icon: any;
  title: string;
  description: string;
  iconBg: string;           // Fondo del icono
  iconColor: string;        // Color del icono
  iconBorder: string;       // Borde del contenedor
  iconGlow: string;         // Efecto glow
  gradientBg: string;       // Gradiente de fondo de la card
  hoverBorder: string;      // Borde en hover
  delay: string;
  size: 'normal' | 'large';
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './features.html',
  styleUrls: ['./features.scss']
})
export class Features {
// Iconos importados de Lucide
  readonly ZapIcon = Zap;
  readonly FilmIcon = Film;
  readonly WifiIcon = Wifi;
  readonly SmartphoneIcon = Smartphone;
  readonly ShieldIcon = Shield;
  readonly Gamepad2Icon = Gamepad2;

  features: Feature[] = [
    {
      icon: this.ZapIcon,
      title: 'Fibra Óptica',
      description: 'Tecnología de última generación con conexión directa por fibra óptica para máxima velocidad y estabilidad sin interrupciones.',
      iconBg: 'bg-primary-600/20',
      iconColor: 'text-primary-300',
      iconBorder: 'border-primary-400/30',
      iconGlow: 'bg-primary-500/30',
      gradientBg: 'from-primary-600/20 to-primary-800/10',
      hoverBorder: 'border-primary-400',
      delay: '0ms',
      size: 'large'
    },
    {
      icon: this.FilmIcon,
      title: 'Contenido Premium',
      description: 'Acceso a Netflix, HBO Max, Disney+ y más plataformas integradas en tu decodificador inteligente.',
      iconBg: 'bg-secondary-600/20',
      iconColor: 'text-secondary-300',
      iconBorder: 'border-secondary-400/30',
      iconGlow: 'bg-secondary-500/30',
      gradientBg: 'from-secondary-600/20 to-secondary-800/10',
      hoverBorder: 'border-secondary-400',
      delay: '100ms',
      size: 'normal'
    },
    {
      icon: this.WifiIcon,
      title: 'WiFi 6 Avanzado',
      description: 'Cobertura total en tu hogar con la última tecnología WiFi 6 para múltiples dispositivos simultáneos.',
      iconBg: 'bg-accent-600/20',
      iconColor: 'text-accent-300',
      iconBorder: 'border-accent-400/30',
      iconGlow: 'bg-accent-500/30',
      gradientBg: 'from-accent-600/20 to-accent-800/10',
      hoverBorder: 'border-accent-400',
      delay: '200ms',
      size: 'normal'
    },
    {
      icon: this.SmartphoneIcon,
      title: 'App de Control',
      description: 'Gestiona tu red, programa grabaciones y controla el contenido desde tu smartphone con nuestra app exclusiva.',
      iconBg: 'bg-primary-600/20',
      iconColor: 'text-primary-300',
      iconBorder: 'border-primary-400/30',
      iconGlow: 'bg-primary-500/30',
      gradientBg: 'from-primary-600/20 to-secondary-700/10',
      hoverBorder: 'border-primary-400',
      delay: '300ms',
      size: 'normal'
    },
    {
      icon: this.ShieldIcon,
      title: 'Seguridad Digital',
      description: 'Protección avanzada contra malware y phishing para todos tus dispositivos conectados las 24 horas.',
      iconBg: 'bg-secondary-600/20',
      iconColor: 'text-secondary-300',
      iconBorder: 'border-secondary-400/30',
      iconGlow: 'bg-secondary-500/30',
      gradientBg: 'from-secondary-600/20 to-accent-700/10',
      hoverBorder: 'border-secondary-400',
      delay: '400ms',
      size: 'normal'
    },
    {
      icon: this.Gamepad2Icon,
      title: 'Gaming Sin Lag',
      description: 'Priorización de tráfico para gaming con ping ultra bajo para una experiencia competitiva profesional.',
      iconBg: 'bg-accent-600/20',
      iconColor: 'text-accent-300',
      iconBorder: 'border-accent-400/30',
      iconGlow: 'bg-accent-500/30',
      gradientBg: 'from-accent-600/20 to-primary-800/10',
      hoverBorder: 'border-accent-400',
      delay: '500ms',
      size: 'large'
    }
  ];
}
