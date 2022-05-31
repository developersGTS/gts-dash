import { Component, OnInit } from '@angular/core';
import {
  Equipment,
  EquipmentPopulated,
} from '../../interfaces/equipment.interface';
import { EquipmentsService } from '../../services/equipments.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  equipments: EquipmentPopulated[] = [];

  constructor(private equipmentsService: EquipmentsService) {}

  ngOnInit(): void {
    this.equipmentsService.getEquipments().subscribe((res) => {
      res ? (this.equipments = res) : null;
    });
  }
}
