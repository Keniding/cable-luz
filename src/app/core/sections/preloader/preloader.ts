import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.html',
  styleUrls: ['./preloader.scss']
})
export class Preloader implements OnInit, OnDestroy {
  @Input() isLoading = true;

  private isBrowser: boolean;
  private animationFrame: number = 0;

  // Progreso de carga simulado
  loadingProgress = 0;
  loadingText = 'Iniciando...';

  private loadingMessages = [
    'Iniciando...',
    'Conectando energía...',
    'Preparando servicios...',
    'Casi listo...'
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startLoadingAnimation();
    }
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private startLoadingAnimation() {
    const duration = 3000; // 3 segundos
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.loadingProgress = progress * 100;

      const messageIndex = Math.floor(progress * this.loadingMessages.length);
      this.loadingText = this.loadingMessages[Math.min(messageIndex, this.loadingMessages.length - 1)];

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();
  }
}
