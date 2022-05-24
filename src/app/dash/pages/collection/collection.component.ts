import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Dashboard',
        link: './',
        index: 0,
      },
      {
        label: 'Pendientes',
        link: './pending',
        index: 2,
      },
      {
        label: 'Resumen',
        link: './resumen',
        index: 4,
      },
      {
        label: 'En Contrarecibo',
        link: './receipt',
        index: 3,
      },
      {
        label: 'Expediente',
        link: './archive',
        index: 5,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }
}
