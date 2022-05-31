import { Component, Input, OnInit } from '@angular/core';
import { EquipmentPopulated } from '../../../../interfaces/equipment.interface';
import { EquipmentsService } from '../../../../services/equipments.service';

@Component({
  selector: 'app-equip-card-details-v1',
  templateUrl: './equip-card-details-v1.component.html',
  styleUrls: ['./equip-card-details-v1.component.scss'],
})
export class EquipCardDetailsV1Component implements OnInit {
  @Input() equipment: EquipmentPopulated | undefined;

  constructor(private equipmentsService: EquipmentsService) {}

  ngOnInit(): void {}

  
}
