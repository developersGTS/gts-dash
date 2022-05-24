import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { SerPreviewComponent } from '../components/modals/ser-preview/ser-preview.component';
import { ServicePopulated } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private api_base = `${environment.api_gts}services`;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  getServices() {
    return this.http.get<ServicePopulated[]>(`${this.api_base}`);
  }

  getServiceById(id: string) {
    return this.http.get<ServicePopulated>(`${this.api_base}/${id}`);
  }

  // ===================== DIALOGS =====================
  openServicePreview(service: ServicePopulated): void {
    const dialogRef = this.dialog.open(SerPreviewComponent, {
      width: '75vw',
      data: service,
    });
  }
}
