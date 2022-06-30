import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Part } from '../../../../interfaces/parts.interface';
import { ServicesService } from '../../../../services/services.service';
import { DialogsService } from '../../../../../../../core/services/dialogs.service';

@Component({
  selector: 'app-ser-card-part-details-v1',
  templateUrl: './ser-card-part-details-v1.component.html',
  styleUrls: ['./ser-card-part-details-v1.component.scss'],
})
export class SerCardPartDetailsV1Component implements OnInit {
  @Input() part: Part | undefined = undefined;
  @Output() emitDelete: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private servicesService: ServicesService,
    private dialogsService: DialogsService
  ) {}

  ngOnInit(): void {}

  deletePart() {
    this.emitDelete.emit(true);
  }
}
