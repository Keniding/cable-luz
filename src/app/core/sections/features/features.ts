import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrls: ['./features.scss']
})
export class Features {
  features: Feature[] = [
    {
      icon: 'rocket',
      title: 'Fibra Óptica',
      description: 'Tecnología de última generación con conexión directa por fibra óptica para máxima velocidad y estabilidad.'
    },
    {
      icon: 'film',
      title: 'Contenido Premium',
      description: 'Acceso a Netflix, HBO Max, Disney+ y más plataformas integradas en tu decodificador.'
    },
    {
      icon: 'wifi',
      title: 'WiFi 6',
      description: 'Cobertura total en tu hogar con la última tecnología WiFi 6 para múltiples dispositivos.'
    },
    {
      icon: 'smartphone',
      title: 'App de Control',
      description: 'Gestiona tu red, programa grabaciones y controla el contenido desde tu smartphone.'
    },
    {
      icon: 'shield',
      title: 'Seguridad Digital',
      description: 'Protección avanzada contra malware y phishing para todos tus dispositivos conectados.'
    },
    {
      icon: 'gamepad',
      title: 'Gaming Sin Lag',
      description: 'Priorización de tráfico para gaming con ping ultra bajo para una experiencia competitiva.'
    }
  ];
}
