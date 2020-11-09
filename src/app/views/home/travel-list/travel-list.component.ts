import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/service/travel.service';
import { Flights } from 'src/app/model/flights.model';
import { hotels } from 'src/app/model/hotels.model';
import { Iata } from 'src/app/model/Iata.model';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {

  Flights: Flights[];
  Hotels: hotels[];
  Iatas: Iata[];
  PackagesFiltered: any[];


  constructor(
    public travelService: TravelService 
  ) { }

  ngOnInit(): void {
    this.getPackages();
  }


  getPackages(){
    this.travelService.getFlights().subscribe(data => {
      this.Flights = [data];       

      this.travelService.getHotels().subscribe(data => {
        this.Hotels = [data];
        
        let packages = [];
        let arr = [];
        let arrFly = Object.values(this.Flights[0])
        let arrHotel = Object.values(this.Hotels[0])
        let Flights = arrFly.filter(f => f.departureAirport == "CNF"); 
        let filterPackages = Flights.map(f => {
          let hotel = arrHotel.filter(h => h.iata == f.arrivalAirport)
                              
          console.log(hotel);
          hotel.map(a => {
             f.hotel = a.name;
             f.price += a.pricePerNight;
          });
          arr = hotel;
          return Flights;
        });
        console.log(Flights);
        packages = filterPackages;
        
        this.travelService.getIata().subscribe(data => {
          this.Iatas = [data];
          let arrIatas = Object.values(this.Iatas[0])
          let groupByIataCode = arrIatas.map(i => {
          let p = packages[0].filter(p => p.arrivalAirport == i.id);
          p.filter(p => {
            p.imageUrl = i.imageUrl;
            return (p.city = i.city);
          });
          return p[0];
        });
        var filtered = groupByIataCode.filter(function (el) {
          return el != null;
        });
        this.PackagesFiltered = filtered;
        console.log(this.PackagesFiltered);
      })
    })
  })
}
  
}
