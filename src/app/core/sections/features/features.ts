import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Zap, Film, Wifi, Smartphone, Shield, Gamepad2 } from 'lucide-angular';

interface Feature {
  icon: any;
  title: string;
  description: string;
  gradient: string;
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
      gradient: 'from-primary-500 to-secondary-500',
      delay: '0ms',
      size: 'large'
    },
    {
      icon: this.FilmIcon,
      title: 'Contenido Premium',
      description: 'Acceso a Netflix, HBO Max, Disney+ y más plataformas integradas en tu decodificador inteligente.',
      gradient: 'from-secondary-500 to-accent-500',
      delay: '100ms',
      size: 'normal'
    },
    {
      icon: this.WifiIcon,
      title: 'WiFi 6 Avanzado',
      description: 'Cobertura total en tu hogar con la última tecnología WiFi 6 para múltiples dispositivos simultáneos.',
      gradient: 'from-accent-500 to-primary-600',
      delay: '200ms',
      size: 'normal'
    },
    {
      icon: this.SmartphoneIcon,
      title: 'App de Control',
      description: 'Gestiona tu red, programa grabaciones y controla el contenido desde tu smartphone con nuestra app exclusiva.',
      gradient: 'from-primary-600 to-highlight-500',
      delay: '300ms',
      size: 'normal'
    },
    {
      icon: this.ShieldIcon,
      title: 'Seguridad Digital',
      description: 'Protección avanzada contra malware y phishing para todos tus dispositivos conectados las 24 horas.',
      gradient: 'from-highlight-500 to-accent-600',
      delay: '400ms',
      size: 'normal'
    },
    {
      icon: this.Gamepad2Icon,
      title: 'Gaming Sin Lag',
      description: 'Priorización de tráfico para gaming con ping ultra bajo para una experiencia competitiva profesional.',
      gradient: 'from-accent-600 to-secondary-600',
      delay: '500ms',
      size: 'large'
    }
  ];
}
