import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SheetResourceService {

  private readonly API_URL: string = 'https://sheets.googleapis.com/v4/spreadsheets';

  constructor(private httpClient: HttpClient) {
  }

  // authtoken as parameter only for demo purpose , better use a UserService to get the token
  public findById(spreadsheetId: string, authtoken: string): Observable<any> {
      return this.httpClient.get(this.API_URL + '/' + spreadsheetId, {
        headers: new HttpHeaders({
              Authorization: `Bearer ${authtoken}`
          })
      });
  }

  public create(authtoken: string): Observable<any> {
      return this.httpClient.post(this.API_URL,{}, {
        headers: new HttpHeaders({
              Authorization: `Bearer ${authtoken}`
          })
      });
  }
}
