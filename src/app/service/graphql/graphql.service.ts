import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { variable } from '@angular/compiler/src/output/output_ast';
import { query } from '@angular/animations';
import { identifierModuleUrl } from '@angular/compiler';

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
            id
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

  insertFlight(airlineRefer, from, to, arrival, departure, duration, price, tax, serviceCharge): Observable<any>{
    return this.apollo.mutate<any>({
      mutation:gql`
      mutation insertFlight($airlineRefer: Int!, $fromRefer: Int!, $toRefer: Int!, $depature: DateTime!, $arrival: DateTime!, $duration: Int!, $price: Int!, $tax: Int!, $serviceCharge: Int!){
        insertFlight(airlineRefer: $airlineRefer, fromRefer: $fromRefer, toRefer: $toRefer, departure: $depature, arrival: $arrival, duration: $duration, price: $price, tax: $tax, serviceCharge: $serviceCharge){
          airlineRefer
          fromRefer
          toRefer
          departure
          arrival
          duration
          price
          serviceCharge
          tax
        }
      }
    `,
    variables:{
      "airlineRefer": airlineRefer,
      "arrival": arrival,
      "depature": departure,
      "duration": duration,
      "fromRefer": from,
      "serviceCharge": serviceCharge,
      "price": price,
      "tax": tax,
      "toRefer": to
    }
    })

  }

  updateFlight(id, airlineRefer, from, to, arrival, departure, duration, price, tax, serviceCharge): Observable<any>{
    return this.apollo.mutate<any>({
      mutation:gql`
      mutation updateFlight($id: Int!, $airlineRefer:Int!, $fromRefer: Int!, $toRefer: Int!, $arrival: DateTime!, $departure: DateTime!, $duration: Int!, $price: Int!, $tax: Int!, $serviceCharge: Int!){
        updateFlight(id: $id, airline_refer: $airlineRefer, from_refer: $fromRefer, to_refer:$toRefer, arrival:$arrival, departure:$departure, duration:$duration, price: $price, tax: $tax, service_charge: $serviceCharge){
          id
        }
      }
    `,
    variables:{
      "id": id,
      "airlineRefer": airlineRefer,
      "arrival": arrival,
      "departure": departure,
      "duration": duration,
      "fromRefer": from,
      "serviceCharge": serviceCharge,
      "price": price,
      "tax": tax,
      "toRefer": to
    }
    })

  }

  removeFlight(id){
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation($id: Int!){
        removeFlight(id: $id){
          id
        }
      }
      `,
      variables:{
        "id": id
      }
    })
  }

  updateUser(id, firstName, lastName, phoneNumber, email, cityName, address, postCode){
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation updateUser($id: Int!, $firstName: String!, $lastName: String!, $phoneNumber: String!,$email: String!, $cityName: String!, $address: String!, $postCode: String!){
        updateUser(id: $id, first_name: $firstName, last_name: $lastName, phone_number: $phoneNumber,email: $email, city_name: $cityName, address: $address, post_code: $postCode){
          id
          firstName
          lastName
          email
          phoneNumber
          cityName
          address
          postcode
        }
      }
      `,
      variables:{
        "address": address,
        "cityName": cityName,
        "email": email,
        "firstName": firstName,
        "id": id,
        "lastName": lastName,
        "postCode": postCode,
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



  getAirlines(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          airlines{
            id
            name
          }
        }
      `
    })
  }

  getAirports(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          airports{
            id
            name
            city
            country
            cityCode
            province
            code
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
            class
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
            class
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

  getCarByLocation(location): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query carByLocation($location: String!){
          carByLocation(location:$location){
            name
            model
            passanger
            price
            vendorCar{
              vendor{
                name
                vendorLocation{
                  location{
                    city
                    country
                    lat
                    lng
                  }
                }
              }
            }
          }
        }
      `,
      variables:{
        "location": location
      }
    })
  }

  getAllLocation(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
      query{
        location{
          city
          country
          lat
          lng
        }
        }
      `
    })
  }


  getNearestHotelByLocation(location): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
      query getNearestHotelByLocation($location: String!){
        nearestHotels(location: $location){
          name
          rating
          location{
            id
            city
            lat
            lng
          }
          hotelFacility{
            facility{
              id
              name
            }
          }
          hotelRoom{
            room{
              id
              checkIn
              checkOut
              maxGuest
              bed
              roomFacility{
                id
                facilityType
                facility{
                  id
                  name
                }
              }
              size
              price
            }
          }
        }
      }
      `,
      variables: {
        "location": location
      }
    })
  }

  getHotelByLocation(location): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
      query getHotelByLocation($location: String!){
        hotelByLocation(location: $location){
          name
          rating
          hotelLat
          hotelLng
          location{
            id
            city
            lat
            lng
          }
          hotelFacility{
            facility{
              id
              name
            }
          }
          hotelRoom{
            room{
              id
              checkIn
              checkOut
              maxGuest
              bed
              roomFacility{
                id
                facilityType
                facility{
                  id
                  name
                }
              }
              size
              price
            }
          }
        }
      }
      `,
      variables: {
        "location": location
      }
    })
  }
}
