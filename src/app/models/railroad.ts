import { Station } from './station'
import { Train } from './train'

export class Railroad {
  id: number
  train: Train
  railroadRoutes: any [] = []
  from: Station
  to: Station
  departure: String
  arrival: string
  duration: string
  price: number
  tax: number
  serviceCharge: number
  class: string
}
