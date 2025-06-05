import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactInfo {
  icon: string;
  title: string;
  info: string[];
}

interface FormData {
  email: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  newsletterForm: FormData = {
    email: ''
  };

  contactInfo: ContactInfo[] = [
    {
      icon: 'phone',
      title: 'Teléfono',
      info: ['01 700 8500', 'Cel: 987 654 321']
    },
    {
      icon: 'mail',
      title: 'Email',
      info: ['ventas@cableluz.com', 'soporte@cableluz.com']
    },
    {
      icon: 'location',
      title: 'Oficinas',
      info: ['Av. Javier Prado 1234, San Isidro', 'Lima, Perú']
    },
    {
      icon: 'clock',
      title: 'Horario de atención',
      info: ['Lunes a Viernes: 8am - 10pm', 'Sábados y Domingos: 9am - 8pm']
    }
  ];

  quickLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Paquetes', href: '#paquetes' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
    { label: 'Área de clientes', href: '#' },
    { label: 'Soporte técnico', href: '#' }
  ];

  services = [
    'Internet Fibra Óptica',
    'Cable HD',
    'Streaming Premium',
    'WiFi Mesh',
    'Empresarial',
    'Gaming'
  ];

  socialLinks = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Pinterest', href: '#', icon: 'pinterest' },
    { name: 'Instagram', href: '#', icon: 'instagram' }
  ];

  onNewsletterSubmit(): void {
    if (this.newsletterForm.email) {
      console.log('Newsletter subscription:', this.newsletterForm.email);
      // Aquí iría la lógica para suscribir al newsletter
      alert('¡Gracias por suscribirte a nuestro newsletter!');
      this.newsletterForm.email = '';
    }
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
