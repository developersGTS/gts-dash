import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Part } from '../../../interfaces/parts.interface';
import { ServicePopulated } from '../../../interfaces/service.interface';
import { ServicesService } from '../../../services/services.service';
import { DialogsService } from '../../../../../../core/services/dialogs.service';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';

@Component({
  selector: 'app-ser-preview-parts-list',
  templateUrl: './ser-preview-parts-list.component.html',
  styleUrls: ['./ser-preview-parts-list.component.scss'],
})
export class SerPreviewPartsListComponent implements OnInit {
  service: ServicePopulated | undefined = undefined;
  installed: boolean = false;

  parts: Part[] = [];

  constructor(
    private servicesService: ServicesService,
    private dialogsService: DialogsService,
    public dialogRef: MatDialogRef<SerPreviewPartsListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      service: ServicePopulated;
      installed: boolean;
    }
  ) {
    console.log('this.data', this.data);

    if (this.data) {
      this.service = this.data.service;
      this.installed = this.data.installed;

      if (this.installed) {
        this.parts = this.service.installed_parts || [];
      } else {
        this.parts = this.service.required_parts || [];
      }
    }
  }

  ngOnInit(): void {}

  registerPart() {
    if (this.service) {
      this.servicesService.registerPart(this.service, this.installed);
    }
  }

  deletePart(index: number, confirm: boolean) {
    if (confirm) {
      // DELETE PART
      if (this.installed) {
        this.service?.installed_parts?.splice(index, 1);
      } else {
        this.service?.required_parts?.splice(index, 1);
      }

      // SAVE CHANGES
      this.servicesService
        .updateService({
          _id: this.service?._id || '',
          required_parts: this.service?.required_parts,
          installed_parts: this.service?.installed_parts,
        })
        .subscribe((ser) => {
          if (ser && ser._id) {
            this.service = ser;
            this.dialogsService.openNotificationV1({
              message: 'Parte eliminada correctamente',
              status: StatusMessage.success,
            });
          } else {
            this.dialogsService.openNotificationV1({
              message: 'No se pudo eliminar la parte, intente mas tarde.',
              status: StatusMessage.danger,
            });
          }
        });
    }
  }
}
