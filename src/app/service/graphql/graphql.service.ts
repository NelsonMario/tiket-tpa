import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { variable } from '@angular/compiler/src/output/output_ast';
import { query } from '@angular/animations';
import { identifierModuleUrl } from '@angular/compiler';
import { FetchType } from 'apollo-client';

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

  getAllFacility(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          facilities{
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

  insertRailroad(trainRefer, from, to, arrival, departure, duration, price, tax, serviceCharge){
    return this.apollo.mutate<any>({
      mutation:gql`
      mutation insertRailroad($trainRefer: Int!, $fromRefer: Int!, $toRefer: Int!, $depature: DateTime!, $arrival: DateTime!, $duration: Int!, $price: Int!, $tax: Int!, $serviceCharge: Int!){
        insertRailroad(trainRefer: $trainRefer, fromRefer: $fromRefer, toRefer: $toRefer, departure: $depature, arrival: $arrival, duration: $duration, price: $price, tax: $tax, serviceCharge: $serviceCharge){
          trainRefer
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
      "trainRefer": trainRefer,
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

  updateRailroad(id, trainRefer, from, to, arrival, departure, duration, price, tax, serviceCharge): Observable<any>{
    return this.apollo.mutate<any>({
      mutation:gql`
      mutation updateRailroad($id: Int!, $train_refer:Int!, $fromRefer: Int!, $toRefer: Int!, $arrival: DateTime!, $departure: DateTime!, $duration: Int!, $price: Int!, $tax: Int!, $serviceCharge: Int!){
        updateRailroad(id: $id, train_refer: $train_refer, from_refer: $fromRefer, to_refer:$toRefer, arrival:$arrival, departure:$departure, duration:$duration, price: $price, tax: $tax, service_charge: $serviceCharge){
          id
        }
      }
    `,
    variables:{
      "id": id,
      "train_refer": trainRefer,
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

  removeRailroad(id){
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation($id: Int!){
        removeRailroad(id: $id){
          id
        }
      }
      `,
      variables:{
        "id": id
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

  getAllHotel(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query{
          hotels{
            id
            name
            rating
            hotelLat
            hotelLng
            type
            hotelFacility{
              facility{
                name
              }
            }
            location{
              id
              city
              country
              lat
              lng
            }
          }
        }
      `
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

  insertHotel(name, rating, type, locationRefer, hotelLat, hotelLng): Observable<any>{
    return this.apollo.mutate<any>({
      mutation:gql`
      mutation insertFlight($name: String!, $rating: Int!, $type: String!, $locationRefer: Int!, $hotelLat: Float!, $hotelLng: Float!){
        insertHotel(name: $name, rating: $rating, type: $type, locationRefer: $locationRefer, hotelLat: $hotelLat , hotelLng: $hotelLng){
          name
        }
      }
    `,
    variables:{
      "name": name,
      "rating": rating,
      "type": type,
      "locationRefer": locationRefer,
      "hotelLat": hotelLat,
      "hotelLng": hotelLng,
      }
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

  getAllRealStation(): Observable<any>{
    return this.apollo.query<any>({
      query: gql`
        query {
          stations{
            id
            code
            name
            city
            cityCode
            province
            country
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
          id
          city
          country
          lat
          lng
          }
        }
      `
    })
  }

  getAllTrain(){
    return this.apollo.query<any>({
      query: gql`
      query{
        trains{
          id
          name
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
            country
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

  removeHotel(id){
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation($id: Int!){
        removeHotel(id: $id){
          id
        }
      }
      `,
      variables:{
        "id": id
      }
    })
  }

  updateHotel(id, name, rating){
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation($id: Int!, $name: String!, $rating: Int!){
        updateHotel(id: $id, name: $name, rating: $rating){
          id
        }
      }
      `,
      variables:{
        "id": id,
        "name": name,
        "rating": rating
      }
    })
  }

  insertBlog(userId, title, value, image, thumbnail, viewer): Observable<any>{
    return this.apollo.mutate<any>({
      mutation:gql`
      mutation insertBlog($userId:Int!, $title:String!, $value:String!, $image:String!, $thumbnail:String!, $viewer:Int!){
        insertBlog(userId:$userId, title:$title, value:$value, image:$image, thumbnail:$thumbnail, viewer: $viewer){
        userId
        title
        value
        image
        thumbnail
    }
  }
    `,
    variables: {
      "image": image,
      "thumbnail": thumbnail,
      "title": title,
      "userId": userId,
      "value": value,
      "viewer": viewer
    },
    fetchPolicy: 'no-cache'
    })
  }

  getAllBlogs(){
    return this.apollo.query<any>({
      query: gql`
      query{
        blogs{
          id
          userId
          title
          value
          image
          thumbnail
        }
      }
      `,
      fetchPolicy: 'no-cache'
    })
  }

  getBlogById(id){
    return this.apollo.query<any>({
      query: gql`
      query blogById($id: Int!){
        blogById(id: $id){
          id
          userId
          title
          value
          image
          thumbnail
        }
      }
      `,
      variables:{
        "id" : id
      },
      fetchPolicy: 'no-cache'
    })
  }

  updateBlog(id, title, thumbnail, value){
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation updateBlog($id: Int!, $title: String!, $thumbnail: String!, $value: String!){
        updateBlog(id:$id, title:$title, thumbnail:$thumbnail, value:$value){
          id
        }
      }
      `,
      variables:{
        "id": id,
        "title": title,
        "thumbnail": thumbnail,
        "value": value
      }
    })
  }

  removeBlog(id){
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation($id: Int!){
        removeBlog(id: $id){
          id
        }
      }
      `,
      variables:{
        "id": id
      }
    })
  }

  getAllEvent(){
    return this.apollo.query<any>({
      query: gql`
      query{
        events(){
          id
          name
          location{
            id
            city
            country
          }
          eventDetail{
            name
          }
          eventLng
          eventLat
          }
        }
      `,
      fetchPolicy: 'no-cache'
    })
  }

  getNearestEvent(location){
    return this.apollo.query<any>({
      query: gql`
      query nearestEvent($location: String!){
        nearestEvent(location: $location){
          id
          name
          location{
            id
            city
            country
          }
          eventDetail{
            name
          }
          eventLng
          eventLat
          }
        }
      `,
      variables:{
        "location" : location
      },
      fetchPolicy: 'no-cache'
    })
  }

  getEventByCategory(category){
    return this.apollo.query<any>({
      query: gql`
      query eventByCategory($category: String!){
        eventsByCategory(category: $category){
          id
          name
          location{
            id
            city
            country
          }
          eventDetail{
            name
          }
          eventLng
          eventLat
          }
        }
      `,
      variables:{
        "category" : category
      },
      fetchPolicy: 'no-cache'
    })
  }
}
