import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConPreviewComponent } from '../components/modals/con-preview/con-preview.component';
import { Contact, ContactPopulated } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private api_base = `${environment.api_gts}contacts`;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  getContacts() {
    return this.http.get<Contact[]>(`${this.api_base}`).pipe(
      map((res: Contact[]) => {
        return res.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }

          if (a.name < b.name) {
            return -1;
          }

          return 0;
        });
      })
    );
  }

  getContactById(id: string) {
    return this.http.get<Contact>(`${this.api_base}/${id}`);
  }

  newContact(payload: Contact) {
    return this.http.post(`${this.api_base}`, payload);
  }

  // ====================== DIALOGS ======================
  openContactPreview(contact: ContactPopulated): void {
    const dialogRef = this.dialog.open(ConPreviewComponent, {
      width: '50vw',
      data: contact,
    });
  }
}
