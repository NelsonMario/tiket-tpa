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

  getAllAirport(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          distinctAirports{
            city
          }
        }
      `
    })
  }

  getAllFlight(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          flights{
            id
            airline{
              id
              name
            }
            from{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            to{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            flightFacility{
              facility{
                name
              }
            }
            flightRoutes{
              airport{
                name
              }
            }
            departure
            arrival
            duration
            price
            tax
            serviceCharge
          }
        }
      `
    })
  }

  getFlightsByOneSchedule(from, to, date): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query GetFlightsByOneSchedule($from: String!, $to: String!, $date: String!){
          flightByOneSchedule(from: $from, to: $to, date: $date){
            id
            airline{
              id
              name
            }
            from{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            to{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            flightFacility{
              facility{
                name
              }
            }
            flightRoutes{
              airport{
                name
              }
            }
            departure
            arrival
            duration
            price
            tax
            serviceCharge
          }
        }
      `,
      variables:{
        "from": from,
        "to": to,
        "date": date,
      }
    })
  }

  getFlightsBySchedule(from, to, departure, arrival): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query GetFlightsBySchedule($from: String!, $to: String!, $departure: String!, $arrival: String!){
          flightBySchedule(from: $from, to: $to, departure: $departure, arrival: $arrival){
            id
            airline{
              id
              name
            }
            from{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            to{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            flightFacility{
              facility{
                name
              }
            }
            flightRoutes{
              airport{
                name
              }
            }
            departure
            arrival
            duration
            price
            tax
            serviceCharge
          }
        }
      `,
      variables:{
        "from": from,
        "to": to,
        "departure": departure,
        "arrival": arrival
      }
    })
  }

  getAllRailroad(): Observable<any>{
    return this.apollo.query<any>({query: gql`
      query{
        railroads{
          id
          station{
            id
            name
          }
          from{
            id
            code
            name
            city
            cityCode
            province
            country
          }
          to{
            id
            code
            name
            city
            cityCode
            province
            country
          }
          railroadRoutes{
            station{
              name
            }
          }
          departure
          arrival
          duration
          price
          tax
          serviceCharge
        }
      }`
    })
  }

  getRailroadByOneSchedule(from, to, date): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query getRailroadByOneSchedule($from: String!, $to: String!, $date: String!){
          railroadsByOneSchedule(from: $from, to: $to, date: $date){
            id
            train{
              id
              name
            }
            from{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            to{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            railroadRoutes{
              station{
                name
              }
            }
            departure
            arrival
            duration
            price
            tax
            serviceCharge
          }
        }
      `,
      variables:{
        "from": from,
        "to": to,
        "date": date,
      }
    })
  }

  getRailroadBySchedule(from, to, departure, arrival): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query getRailroadBySchedule($from: String!, $to: String!, $departure: String!, $arrival: String!){
          railroadsBySchedule(from: $from, to: $to, departure: $departure, arrival: $arrival){
            id
            train{
              id
              name
            }
            from{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            to{
              id
              code
              name
              city
              cityCode
              province
              country
            }
            railroadRoutes{
              station{
                name
              }
            }
            departure
            arrival
            duration
            price
            tax
            serviceCharge
          }
        }
      `,
      variables:{
        "from": from,
        "to": to,
        "departure": departure,
        "arrival": arrival
      }
    })
  }

  getAllStation(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          distinctStation{
            city
          }
        }
      `
    })
  }
}
