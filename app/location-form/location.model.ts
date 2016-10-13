import { Country } from '../service/country.model';
export class Location {
    constructor(
        public allowed: boolean,
        public lat?: number,
        public lng?: number,
        public zip?: string,
        public country?: string,
        public country_code?: string,
        public selected_country?: {
            name: string,
            'alpha-2': string,
            'country-code': string
        }
    ){

    }
}