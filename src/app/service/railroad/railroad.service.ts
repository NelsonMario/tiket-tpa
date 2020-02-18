import { Injectable } from '@angular/core';
import { Railroad } from 'src/app/models/railroad';

@Injectable({
  providedIn: 'root'
})
export class RailroadService {

  railroad: Railroad[] = []
  from : string
  to : string
  constructor() { }
}
