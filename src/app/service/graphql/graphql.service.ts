import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { variable } from '@angular/compiler/src/output/output_ast';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class graphqlService {

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

  getUserByEmailOrPhone(input: string): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query ($input: String!){
          userByEmailOrPhone(input: $input){
            firstName
            lastName
            email
            password
            phoneNumber
            cityName
            address
            postcode
        }
      }
        `,
      variables:{
        "input":input
      }
    })
  }

  insertRegisterUser(email: string, firstName: string, lastName: string, password: string, phoneNumber: string): Observable<any>{
    return this.apollo.mutate<any>({
      mutation:gql`
      mutation insertUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $phoneNumber: String!){
        insertUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, phoneNumber: $phoneNumber){
          firstName
          lastName
          email
          password
          phoneNumber
        }
      }
    `,
    variables:{
      "firstName": firstName,
      "lastName": lastName,
      "password": password,
      "email": email,
      "phoneNumber": phoneNumber
    }
    })

  }
}
