import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryByCallingPhone } from 'src/app/models/country-by-calling-phone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetHttpService {

  url: string;

  constructor(private http: HttpClient) { }

  getCountryCode(string): Observable<CountryByCallingPhone[]>{
    return this.http.get<CountryByCallingPhone[]>(string);
  }
}
