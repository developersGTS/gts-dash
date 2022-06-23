import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap, tap } from 'rxjs';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import { environment } from 'src/environments/environment';
import { SerAddComponent } from '../components/modals/ser-add/ser-add.component';
import { SerPreviewComponent } from '../components/modals/ser-preview/ser-preview.component';
import {
  SerUpdateStatusV1Component,
  UpdateStatusServiceV1,
} from '../components/modals/ser-update-status-v1/ser-update-status-v1.component';
import { ServiceStatus } from '../interfaces/service-status.interface';
import { DialogsService } from '../../../../core/services/dialogs.service';
import {
  Service,
  ServicePopulated,
  ServiceSch,
  ServiceUpdate,
} from '../interfaces/service.interface';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { SerSelectServiceByFilterV1Component } from '../components/modals/ser-select-service-by-filter-v1/ser-select-service-by-filter-v1.component';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private api_base = `${environment.api_gts}services`;

  private status: string[] = [
    ServiceStatus.pendiente,
    ServiceStatus.diagnostico,
    ServiceStatus.cotizacion,
    ServiceStatus.espera_autorizacion,
    ServiceStatus.reparacion_autorizada,
    ServiceStatus.rechazado,
    ServiceStatus.espera_partes,
    ServiceStatus.reparado,
    ServiceStatus.listo_entrega,
    ServiceStatus.equipo_entregado,
    ServiceStatus.servicio_realizado,
    ServiceStatus.cobro,
    ServiceStatus.finalizado,
  ];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private dialogsService: DialogsService
  ) {}

  // ===================== GETS =====================

  getServices() {
    return this.http.get<ServicePopulated[]>(`${this.api_base}`);
  }

  getServiceById(id: string) {
    return this.http.get<ServicePopulated>(`${this.api_base}/${id}`);
  }

  getServiceByCustom(payload: ServiceSch) {
    return this.http.post<ServicePopulated[]>(`${this.api_base}/sch`, payload);
  }

  // ===================== CREATE =====================

  createService(service: Service) {
    return this.http.post<Service>(`${this.api_base}`, service);
  }

  // ===================== UPDATE =====================

  updateService(payload: ServiceUpdate) {
    console.log('serviceService->updateService', payload);

    return this.http.put<ServicePopulated>(`${this.api_base}`, payload);
  }

  // ===================== STATUS =====================
  getStatusList(): string[] {
    return [...this.status];
  }

  getColorByStatus(status: string): string {
    switch (status) {
      case ServiceStatus.pendiente:
        return 'primary';
      case ServiceStatus.diagnostico:
        return 'info';
      case ServiceStatus.espera_autorizacion:
        return 'warning';
      case ServiceStatus.espera_partes:
        return 'warning';
      case ServiceStatus.reparacion_autorizada:
        return 'primary';
      case ServiceStatus.rechazado:
        return 'danger';
      case ServiceStatus.reparado:
        return 'success';
      case ServiceStatus.listo_entrega:
        return 'success';
      case ServiceStatus.servicio_realizado:
        return 'success';
      case ServiceStatus.cotizacion:
        return 'warning';
      case ServiceStatus.finalizado:
        return 'dark';
      default:
        return 'secondary';
    }
  }

  orderByStatus(services: ServicePopulated[]) {
    let pending: ServicePopulated[] = [];
    let diagnostic: ServicePopulated[] = [];
    let waiting: ServicePopulated[] = [];
    let follow: ServicePopulated[] = [];
    let discard: ServicePopulated[] = [];
    let ready: ServicePopulated[] = [];
    let collection: ServicePopulated[] = [];
    let finished: ServicePopulated[] = [];

    let others: ServicePopulated[] = [];

    for (let st of services) {
      if (st.status == ServiceStatus.pendiente) {
        pending.push(st);
      } else if (st.status == ServiceStatus.diagnostico) {
        diagnostic.push(st);
      } else if (st.status == ServiceStatus.espera_autorizacion) {
        waiting.push(st);
      } else if (st.status == ServiceStatus.espera_partes) {
        waiting.push(st);
      } else if (st.status == ServiceStatus.reparacion_autorizada) {
        follow.push(st);
      } else if (st.status == ServiceStatus.rechazado) {
        discard.push(st);
      } else if (st.status == ServiceStatus.reparado) {
        ready.push(st);
      } else if (st.status == ServiceStatus.listo_entrega) {
        ready.push(st);
      } else if (st.status == ServiceStatus.equipo_entregado) {
        ready.push(st);
      } else if (st.status == ServiceStatus.servicio_realizado) {
        ready.push(st);
      } else if (st.status == ServiceStatus.cotizacion) {
        waiting.push(st);
      } else if (st.status == ServiceStatus.cobro) {
        collection.push(st);
      } else if (st.status == ServiceStatus.finalizado) {
        finished.push(st);
      } else {
        others.push(st);
      }
    }

    services = [];

    for (let i of pending) {
      services.push(i);
    }

    for (let i of follow) {
      services.push(i);
    }

    for (let i of diagnostic) {
      services.push(i);
    }

    for (let i of waiting) {
      services.push(i);
    }

    for (let i of ready) {
      services.push(i);
    }

    for (let i of collection) {
      services.push(i);
    }

    for (let i of discard) {
      services.push(i);
    }

    for (let i of finished) {
      services.push(i);
    }

    for (let i of others) {
      services.push(i);
    }

    return services;
  }

  updateStatus(_id: string, status: string, status_tracker: StatusTracker[]) {
    status_tracker.push({
      user: '620afd6e9d4b8b4308838aac',
      status,
    });

    return this.http.put<ServicePopulated>(`${this.api_base}`, {
      _id,
      status,
      status_tracker,
    });
  }

  // ===================== DIALOGS =====================
  openServicePreview(service: ServicePopulated): void {
    const dialogRef = this.dialog.open(SerPreviewComponent, {
      width: '75vw',
      data: service,
    });
  }

  openServiceAdd() {
    const dialogRef = this.dialog.open(SerAddComponent, {
      width: '95vw',
      maxHeight: '95vh',
      disableClose: true,
    });
    return dialogRef;
  }

  openUpdateStatus(data: UpdateStatusServiceV1) {
    const dialogRef = this.dialog.open(SerUpdateStatusV1Component, {
      disableClose: true,
      data,
    });
    return dialogRef;
  }

  openOrdsAdd(service: ServicePopulated) {
    const ref = this.dialogsService.openConfirmationV1({
      title: '¿Desea agregar una orden de servicio?',
      buttons: [
        {
          title: 'cancel',
          value: false,
        },
        {
          title: 'confirmar',
          value: true,
          color: 'success',
        },
      ],
    });

    ref.afterClosed().subscribe((res) => {
      if (res) {
        const refORDS = this.dialogsService.openSubmitV1({
          title: 'Ingrese el numero de orden de servicio',
          input: {
            label: 'No ORDS',
          },
          buttons: [
            {
              title: 'cancel',
              value: false,
            },
            {
              title: 'guardar',
              value: true,
              color: 'success',
            },
          ],
        });

        refORDS.afterClosed().subscribe((resOrds) => {
          if (resOrds) {
            this.updateService({
              _id: service._id,
              service_order: resOrds,
            }).subscribe((service_updated) => {
              if (service_updated && service_updated._id) {
                service = service_updated;
                this.dialogsService.openNotificationV1({
                  message: 'ORDS agregada correctamente',
                  status: StatusMessage.success,
                });
              } else {
                this.dialogsService.openNotificationV1({
                  message: 'La ORDS no se agrego correctamente',
                  status: StatusMessage.danger,
                });
              }
            });
          }
        });
      }
    });
  }

  openSelectService() {
    return this.dialog.open(SerSelectServiceByFilterV1Component, {
      width: '95vw',
      height: '95vh',
      disableClose: true
    });
  }
}
