import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.html',
  styleUrls: ['./preloader.scss']
})
export class Preloader {
  @Input() isLoading = true;
}
