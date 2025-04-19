import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuAbierto = false;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      setTimeout(() => {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          this.scrollToAnchor(fragment);
        }
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  closeMenu(): void {
    this.menuAbierto = false;
  }

  scrollTo(sectionId: string): void {
    this.closeMenu(); // Cierra el menú al hacer click
    
    if (this.router.url.split('#')[0] !== '/') {
      this.router.navigate(['/'], { fragment: sectionId });
    } else {
      this.scrollToAnchor(sectionId);
    }
  }

  private scrollToAnchor(anchor: string): void {
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        const yOffset = -80; // Ajuste para el navbar fijo
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  }
}