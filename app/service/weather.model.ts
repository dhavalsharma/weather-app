export class Weather {
    constructor(
        public coord: {
            lon: number,
            lat: number
        },
        public weather: [{
            id: number,
            main: string,
            description: string,
            icon: string,
            fullpath: string
        }]
    ) { 
    }
}