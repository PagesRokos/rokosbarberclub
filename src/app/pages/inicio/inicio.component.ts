import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule], // incluye el componente aquí
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  slides = [
    {
      image: 'assets/1.jpg',
      titulo: 'Vive la experiencia en Rokos',
      descripcion: ''
    },
    {

      image: 'assets/7.jpg',
      titulo: 'Ven y relájate',
      descripcion: ''
    },
    {
      image: 'assets/4.png',
      titulo: 'Un espacio pensado para ti', 
      descripcion: ''
    },
    {
      image: 'assets/5.jpg',
      titulo: 'Profesionales altamente capacitados',
      descripcion: ''
    }
  ];

  currentSlide = 0;
  intervalId: any;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const elementos = document.querySelectorAll('.animada');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(entry.target, 'visible');
            }
          });
        },
        { threshold: 0.2 }
      );
      elementos.forEach((el) => observer.observe(el));

      // iniciar slider
      this.intervalId = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 8000);
    }
  }

  ngOnDestroy(): void {
    // Clear the slider interval to avoid memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  trackBySlide(index: number, slide: any): number {
    return index;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
