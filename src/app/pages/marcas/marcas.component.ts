import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';  // ← Import necesario

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [
    CommonModule                                // ← Añadido aquí
  ],
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  logos = [
    { src: 'assets/marca1.png', alt: 'Logo Marca 1' },
    { src: 'assets/marca3.png', alt: 'Logo Marca 3' },
    { src: 'assets/marca4.png', alt: 'Logo Marca 4' },
    { src: 'assets/marca5.png', alt: 'Logo Marca 5' }
  ];

  private pos = 0;
  private speed = 0.5;
  private animationId = 0;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    const el = this.track.nativeElement;
    this.startScroll();
    el.addEventListener('mouseenter', this.pauseScroll);
    el.addEventListener('mouseleave', this.resumeScroll);
  }

  private startScroll() {
    const el = this.track.nativeElement;
    const step = () => {
      this.pos += this.speed;
      if (this.pos >= el.scrollWidth / 2) this.pos = 0;
      el.style.transform = `translateX(-${this.pos}px)`;
      this.animationId = window.requestAnimationFrame(step);
    };
    window.cancelAnimationFrame(this.animationId);
    this.animationId = window.requestAnimationFrame(step);
  }

  private pauseScroll = () => {
    window.cancelAnimationFrame(this.animationId);
  };

  private resumeScroll = () => {
    this.startScroll();
  };

  ngOnDestroy() {
    if (!this.isBrowser) return;
    window.cancelAnimationFrame(this.animationId);
    const el = this.track.nativeElement;
    el.removeEventListener('mouseenter', this.pauseScroll);
    el.removeEventListener('mouseleave', this.resumeScroll);
  }
}
