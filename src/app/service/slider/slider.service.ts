import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Injectable({
  providedIn: 'root'
})

export class SliderService {

  constructor(private apollo: Apollo) { }

  getAllSlide(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          sliders{
            id
            name
          }
        }
      `
    })
  }
}
