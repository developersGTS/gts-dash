import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentsService } from './services/equipments.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
})
export class EquipmentsComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private router: Router,
    private equipmentsService: EquipmentsService
  ) {
    this.navLinks = [
      {
        label: 'Dashboard',
        link: './',
        index: 0,
      },
      {
        label: 'Listado',
        link: './list',
        index: 1,
      },
      {
        label: 'En Contrato',
        link: './contract',
        index: 2,
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

  addNewEquipment() {
    this.equipmentsService.openNewEquipment();
  }
}
