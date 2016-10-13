import { Component, OnInit } from '@angular/core';
import { Location } from './location.model';
import { CountryService } from '../service/country.service';
import { Country } from '../service/country.model';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../service/weather.model';

@Component({
  moduleId: module.id,
  selector: 'location-form',
  templateUrl: 'location-form.component.html',
  providers: [CountryService, WeatherService]
})
export class LocationFormComponent implements OnInit{
  submitted: Boolean = false;
  location:Location = new Location(false);
  countries: Country[];
  weather: Weather;

  constructor(
      private countryService: CountryService,
      private weatherService: WeatherService
      )
    {
    }

  private getCountries(){
      this.countryService.getCountries()
        .then((countries) => this.countries = countries)
        .catch((error) => {
            this.countries = [];
            console.log("Error ", error);
        })
  }

  private getCurrentLocation = (position:Position) => {    
      this.location.allowed = true;
      this.location.lat = Math.round(position.coords.latitude*100)/100;
      this.location.lng = Math.round(position.coords.longitude*100)/100;
      console.log("getCurrentLocation ", this.location);
      //todo call weather service

      this.weatherService
        .getWeatherByGeo(this.location.lat, this.location.lng)
        .then(weather => {
            this.weather = weather;
            console.dir(weather);
        })
        .catch(error => {
            console.log("Error ", error);
            this.submitted = false;
        }); 
  }

  private handleGeolocationError(error:PositionError) {
      console.log("handleGeolocationError", error);
      this.submitted = false;
      let err_msg:String;
      switch(error.code) {
          case error.PERMISSION_DENIED:
              err_msg = "User denied the request for Geolocation.";
              break;
          case error.POSITION_UNAVAILABLE:
              err_msg = "Location information is unavailable.";
              break;
          case error.TIMEOUT:
              err_msg = "The request to get user location timed out.";
              break;
          default:
              err_msg = "An unknown error occurred.";
              break;
      }    
      console.log("Error while getting location => ", err_msg);
  }

  ngOnInit(){
      if(navigator.geolocation){
        //toggle view as if user has submitted
        this.submitted = true;          
        navigator.geolocation.getCurrentPosition(this.getCurrentLocation,
            this.handleGeolocationError.bind(this));
      }
      this.getCountries();
  }

  onSubmit() { 
      this.submitted = true;

      this.weatherService
        .getWeatherByZip(this.location.zip, this.location.selected_country['alpha-2'])
        .then(weather => this.weather = weather)
        .catch(error => {
            console.log("Error ", error);
            this.submitted = false;
        }); 
    }
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.location); }  
}
