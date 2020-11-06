import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { hotels } from '../model/hotels.model';
import { Iata } from '../model/Iata.model';
import { Flights } from '../model/Flights.model';



@Injectable({
  providedIn: 'root'
})
export class TravelService {

  flightsApi = 'https://5f637566363f0000162d8b16.mockapi.io/milhas321/api/v1/flights';
  iataApi = 'https://5f637566363f0000162d8b16.mockapi.io/milhas321/api/v1/iataCodes';
  hotelsApi = 'https://5f637566363f0000162d8b16.mockapi.io/milhas321/api/v1/hotels';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
) {}

public getFlights(): Observable<Flights> {
    return this.httpClient.get<Flights>(this.flightsApi);
}

public getIata(): Observable<Iata> {
    return this.httpClient.get<Iata>(this.iataApi);
}

public getHotels(): Observable<hotels> {
  return this.httpClient.get<hotels>(this.hotelsApi);
}

}
