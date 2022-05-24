import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComPreviewComponent } from '../components/modals/com-preview/com-preview.component';

// INTERFACE
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanysService {
  private api_base = `${environment.api_gts}companys`;
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  getCompanys() {
    return this.http.get<Company[]>(`${this.api_base}`).pipe(
      map((res: Company[]) => {
        return res.sort(function (a, b) {
          if (a.nickname > b.nickname) {
            return 1;
          }

          if (a.nickname < b.nickname) {
            return -1;
          }

          return 0;
        });
      })
    );
  }

  getCompanyById(id: string) {
    return this.http.get<Company>(`${this.api_base}/${id}`);
  }

  newCompany(payload: Company) {
    return this.http.post<Company>(`${this.api_base}`, payload);
  }

  // ==================== UPDATE ====================

  updateCompany(payload: Company) {
    return this.http.put<Company>(`${this.api_base}`, payload);
  }

  // ==================== DIALOGS ====================
  openCompanyPreview(company: Company): void {
    const dialogRef = this.dialog.open(ComPreviewComponent, {
      width: '50vw',
      data: company,
    });
  }
}
