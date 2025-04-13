import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { FlowbiteService } from './core/Services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly router = inject(Router);
  private readonly id = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
        }
      });
      document.documentElement.classList.toggle(
        'dark',
        localStorage.getItem('theme') === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
  }
}
