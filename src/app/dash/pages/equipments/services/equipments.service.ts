import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DialogsService } from '../../../../core/services/dialogs.service';
import { MatDialog } from '@angular/material/dialog';
import {
  Equipment,
  EquipmentSch,
  EquipmentPopulated,
} from '../interfaces/equipment.interface';
import { EquipAddComponent } from '../components/modals/equip-add/equip-add.component';

@Injectable({
  providedIn: 'root',
})
export class EquipmentsService {
  private api_base = `${environment.api_gts}equipments`;

  constructor(
    private http: HttpClient,
    private dialogsService: DialogsService,
    private dialog: MatDialog
  ) {}

  // =========================== GET EQUIPMENTS ===========================
  getEquipments() {
    return this.http.get<EquipmentPopulated[]>(`${this.api_base}`);
  }

  getEquipmentById(id: string) {
    return this.http.get<EquipmentPopulated>(`${this.api_base}/byid/${id}`);
  }

  getEquipmentsByCustomFields(customFields: EquipmentSch | any) {
    return this.http.post<EquipmentPopulated[]>(
      `${this.api_base}/sch`,
      customFields
    );
  }

  // =========================== MODALS ===========================
  openNewEquipment() {
    const dialogRef = this.dialog.open(EquipAddComponent, {
      width: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
