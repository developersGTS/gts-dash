import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(
    private router: Router
  ) { 
    this.navLinks = [
      {
          label: 'Dashboard',
          link: './',
          index: 0
      }, {
          label: 'Mis Asignados',
          link: './assigned',
          index: 1
      }, {
          label: 'Pendientes',
          link: './pending',
          index: 2
      }, {
        label: 'Req. Seguimiento',
        link: './followup',
        index: 3
      },{
        label: 'Resumen',
        link: './resumen',
        index: 4
      },{
        label: 'Expediente',
        link: './archive',
        index: 5
      },
    ];

  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

}
