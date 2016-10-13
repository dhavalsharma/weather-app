import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
    private api_key: string = '122dfd8229f6d83ef5e9e661d15706ed';
    //http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=122dfd8229f6d83ef5e9e661d15706ed
    
    constructor(private http: Http){}

    private getWeather(weatherUrl: string): Promise<Weather>{
        return this.http.get(weatherUrl)
                .toPromise()
                .then(response => response.json() as Weather)
                .catch(this.handleError);
    }

    getWeatherByZip(zip:string, code:string): Promise<Weather> {
        let weatherUrl: string = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${code}&appid=${this.api_key}`;
        console.log("weatherUrl", weatherUrl);
        return this.getWeather(weatherUrl);
    }

    private handleError(error: any) : Promise<any>{
        console.log("Error ", error);
        return Promise.reject(error.message || error);
    }

    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
    getWeatherByGeo(lat:number, lon:number){
        let weatherUrl: string = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.api_key}`;
        console.log("weatherUrl", weatherUrl);
        return this.getWeather(weatherUrl);
    }

}
