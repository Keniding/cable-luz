// footer.component.ts - VERSIÓN TECNOLÓGICA MEJORADA
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule,
  Zap, Mail, Phone, Clock, Send, ArrowRight, ShieldCheck, FileText, Eye, Award, MapPin,
  Home, Package, MessageCircle, Users, Headphones, Settings,
  Wifi, Monitor, Gamepad2, Shield, Smartphone, Globe,
  Twitter, Facebook, Instagram, Linkedin
} from 'lucide-angular';

interface ContactInfo {
  icon: string;
  title: string;
  info: string[];
}

interface FormData {
  email: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

interface QuickLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {

// Iconos importados de Lucide
  readonly ZapIcon = Zap;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly ClockIcon = Clock;
  readonly SendIcon = Send;
  readonly ArrowRightIcon = ArrowRight;
  readonly ShieldCheckIcon = ShieldCheck;
  readonly FileTextIcon = FileText;
  readonly EyeIcon = Eye;
  readonly AwardIcon = Award;
  readonly MapPinIcon = MapPin;
  readonly HomeIcon = Home;
  readonly PackageIcon = Package;
  readonly MessageCircleIcon = MessageCircle;
  readonly UsersIcon = Users;
  readonly HeadphonesIcon = Headphones;
  readonly SettingsIcon = Settings;
  readonly WifiIcon = Wifi;
  readonly MonitorIcon = Monitor;
  readonly Gamepad2Icon = Gamepad2;
  readonly ShieldIcon = Shield;
  readonly SmartphoneIcon = Smartphone;
  readonly GlobeIcon = Globe;
  readonly TwitterIcon = Twitter;
  readonly FacebookIcon = Facebook;
  readonly InstagramIcon = Instagram;
  readonly LinkedinIcon = Linkedin;

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

  quickLinks: QuickLink[] = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Paquetes', href: '#paquetes' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
    { label: 'Área de clientes', href: '#' },
    { label: 'Soporte técnico', href: '#' }
  ];

  services: string[] = [
    'Internet Fibra Óptica',
    'Cable HD',
    'Streaming Premium',
    'WiFi Mesh',
    'Empresarial',
    'Gaming'
  ];

  socialLinks: SocialLink[] = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' }
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

// Métodos para obtener iconos dinámicos
  getSocialIcon(iconName: string): any {
    const iconMap: { [key: string]: any } = {
      'twitter': this.TwitterIcon,
      'facebook': this.FacebookIcon,
      'instagram': this.InstagramIcon,
      'linkedin': this.LinkedinIcon
    };
    return iconMap[iconName] || this.GlobeIcon;
  }

  getQuickLinkIcon(label: string): any {
    const iconMap: { [key: string]: any } = {
      'Inicio': this.HomeIcon,
      'Paquetes': this.PackageIcon,
      'Testimonios': this.MessageCircleIcon,
      'Contacto': this.PhoneIcon,
      'Área de clientes': this.UsersIcon,
      'Soporte técnico': this.HeadphonesIcon
    };
    return iconMap[label] || this.SettingsIcon;
  }

  getServiceIcon(index: number): any {
    const icons = [
      this.WifiIcon,        // Internet Fibra Óptica
      this.MonitorIcon,     // Cable HD
      this.SmartphoneIcon,  // Streaming Premium
      this.WifiIcon,        // WiFi Mesh
      this.SettingsIcon,    // Empresarial
      this.Gamepad2Icon     // Gaming
    ];
    return icons[index] || this.SettingsIcon;
  }

  getContactIcon(iconName: string): any {
    const iconMap: { [key: string]: any } = {
      'phone': this.PhoneIcon,
      'mail': this.MailIcon,
      'location': this.MapPinIcon,
      'clock': this.ClockIcon
    };
    return iconMap[iconName] || this.SettingsIcon;
  }
}
