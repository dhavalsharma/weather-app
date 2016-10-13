import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Country} from './country.model';
@Injectable()
export class CountryService {
    private countryCodesUrl = "app/data/slim-2.json";

    constructor(private http: Http){

    }
    getCountries(): Promise<Country[]> {
        return this.http.get(this.countryCodesUrl)
                .toPromise()
                //.then(response => response.json().data as Country[])
                .then(response => response.json() as Country[])
                .catch(this.handleError);
    }
    private handleError(error: any) : Promise<any>{
        console.log("Error ", error);
        return Promise.reject(error.message || error);
    }
}
