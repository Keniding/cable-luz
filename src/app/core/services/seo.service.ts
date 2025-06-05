import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'CableLuz';
  private readonly defaultImage = '/assets/images/cableluz-og.jpg';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initRouteListener();
  }

  private initRouteListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateCanonicalUrl(event.url);
      });
  }

  updateSEO(data: SEOData): void {
    // Title
    const fullTitle = data.title ? `${data.title} | ${this.siteName}` : this.siteName;
    this.title.setTitle(fullTitle);

    // Basic Meta Tags
    this.updateMetaTag('description', data.description);
    this.updateMetaTag('keywords', data.keywords || '');
    this.updateMetaTag('author', 'CableLuz');
    this.updateMetaTag('robots', 'index, follow');

    // Open Graph
    this.updateMetaTag('og:title', data.ogTitle || fullTitle, 'property');
    this.updateMetaTag('og:description', data.ogDescription || data.description, 'property');
    this.updateMetaTag('og:image', data.ogImage || data.image || this.defaultImage, 'property');
    this.updateMetaTag('og:url', data.url || this.getCurrentUrl(), 'property');
    this.updateMetaTag('og:type', data.type || 'website', 'property');
    this.updateMetaTag('og:site_name', this.siteName, 'property');

    // Twitter Card
    this.updateMetaTag('twitter:card', 'summary_large_image', 'name');
    this.updateMetaTag('twitter:title', data.ogTitle || fullTitle, 'name');
    this.updateMetaTag('twitter:description', data.ogDescription || data.description, 'name');
    this.updateMetaTag('twitter:image', data.ogImage || data.image || this.defaultImage, 'name');

    // Structured Data
    if (data.structuredData) {
      this.addStructuredData(data.structuredData);
    }
  }

  private updateMetaTag(name: string, content: string, attribute: string = 'name'): void {
    if (content) {
      const selector = `${attribute}="${name}"`;
      const existingTag = this.meta.getTag(selector);

      if (existingTag) {
        this.meta.updateTag({ [attribute]: name, content });
      } else {
        this.meta.addTag({ [attribute]: name, content });
      }
    }
  }

  private updateCanonicalUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const head = this.document.getElementsByTagName('head')[0];
      let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

      if (!canonicalLink) {
        canonicalLink = this.document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        head.appendChild(canonicalLink);
      }

      canonicalLink.setAttribute('href', `${window.location.origin}${url}`);
    }
  }

  private getCurrentUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.href;
    }
    return '';
  }

  addStructuredData(data: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);

      // Remove existing structured data
      const existingScript = this.document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      this.document.head.appendChild(script);
    }
  }

// Predefined SEO data for different pages
  getHomePageSEO(): SEOData {
    return {
      title: 'Internet de Alta Velocidad y Cable TV',
      description: 'Descubre los mejores planes de internet fibra óptica y cable TV en Perú. Velocidades desde 100 Mbps, instalación gratis y atención 24/7. ¡Contrata ahora!',
      keywords: 'internet fibra óptica, cable tv, planes internet, velocidad alta, Perú, instalación gratis',
      image: '/assets/images/hero-cableluz.jpg',
      ogTitle: 'CableLuz - El Internet Más Rápido del Perú',
      ogDescription: 'Fibra óptica hasta tu hogar con velocidades de hasta 1000 Mbps. Instalación gratis y soporte 24/7.',
      ogImage: '/assets/images/og-home.jpg',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "TelecommunicationsProvider",
        "name": "CableLuz",
        "description": "Proveedor líder de internet fibra óptica y cable TV en Perú",
        "url": "https://cableluz.com",
        "telephone": "+51-1-234-5678",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PE",
          "addressLocality": "Lima",
          "addressRegion": "Lima"
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Plan Básico Internet",
            "price": "89.90",
            "priceCurrency": "PEN",
            "description": "Internet 100 Mbps + WiFi gratis"
          }
        ],
        "areaServed": {
          "@type": "Country",
          "name": "Perú"
        }
      }
    };
  }

  getPackagesPageSEO(): SEOData {
    return {
      title: 'Planes y Paquetes de Internet y Cable TV',
      description: 'Compara nuestros planes de internet fibra óptica desde S/89.90. Encuentra el paquete perfecto para tu hogar con velocidades de hasta 1000 Mbps.',
      keywords: 'planes internet, paquetes cable tv, fibra óptica, precios internet, comparar planes',
      image: '/assets/images/packages-comparison.jpg'
    };
  }
}
