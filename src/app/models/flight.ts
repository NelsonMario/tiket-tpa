import { Airport } from './airport'
import { Time } from '@angular/common'
import { Airline } from './airline'

export class Flight {
  id: number
  airline: Airline
  flightRoutes: any [] = []
  flightFacility: any [] = []
  from: Airport
  to: Airport
  departure: number
  arrival: number
  duration: string
  price: number
  tax: number
  serviceCharge: number
}
