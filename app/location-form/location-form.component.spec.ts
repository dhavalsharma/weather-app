import { ComponentFixture, TestBed ,ComponentFixtureAutoDetect, fakeAsync, async, tick} from '@angular/core/testing';

import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { LocationFormComponent } from './location-form.component';
import { WeatherService } from '../service/weather.service';

 

describe("init geo => ", () => {
  let comp:    LocationFormComponent;
  let fixture: ComponentFixture<LocationFormComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;  
  let spyWeather: jasmine.Spy;
  let spyGeo: jasmine.Spy;
  let mockLocation: any, mockLocationFailure: any, mockWeather: any, mockWeatherService: WeatherService;

  beforeEach( async( () => {
    TestBed.configureTestingModule({
      declarations: [LocationFormComponent],
      providers: [WeatherService],
      imports: [FormsModule, HttpModule]  
    }).compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(LocationFormComponent);
      comp = fixture.componentInstance;
      mockWeatherService = fixture.debugElement.injector.get(WeatherService);

      mockLocation = {coords: {}};
      (mockLocation as any).coords.latitude = 37.39;
      (mockLocation as any).coords.longitude = -122.08;
      //from http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=122dfd8229f6d83ef5e9e661d15706ed
      mockWeather = {"coord":{"lon":-122.08,"lat":37.39},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":283.377,"pressure":992.36,"humidity":96,"temp_min":283.377,"temp_max":283.377,"sea_level":1030.93,"grnd_level":992.36},"wind":{"speed":0.96,"deg":286},"clouds":{"all":88},"dt":1476251333,"sys":{"message":0.0079,"country":"US","sunrise":1476281661,"sunset":1476322450},"id":5375480,"name":"Mountain View","cod":200};
      
      spyWeather = spyOn(mockWeatherService, 'getWeatherByGeo')
        .and.returnValue(Promise.resolve(mockWeather).then((loc) => {
          comp.weather = loc;
      }));      

      spyGeo = spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
            //(comp as any).getCurrentLocation(mockLocation);
            arguments[0](mockLocation);
      });
      de = fixture.debugElement.query(By.css('.container'));
      el = de.nativeElement;    
  });

  afterEach( () => {
    fixture.destroy();
  });

  it("before oninit", () => {
    expect(spyGeo.calls.any()).toBe(false, "Navigator Services not yet called");
    expect(spyWeather.calls.any()).toBe(false, "Weather Services not yet called");
    expect(comp.weather).toBeUndefined();
    expect(comp.submitted).toBeFalsy();    
  });

  it('navigator.geolocation.getCurrentPosition called', () => {
    fixture.detectChanges();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(spyGeo.calls.any()).toBe(true, "Navigator Services called");
  });


  it('getWeatherByGeo called ', () => {
    fixture.detectChanges();    
    expect(comp["weatherService"].getWeatherByGeo).toHaveBeenCalled();
    expect(spyWeather.calls.any()).toBe(true, "Weather Services called");
  });

  it('weather is available async', async(() => {
    fixture.detectChanges();    
    fixture.whenStable().then( () => {
      comp.weather = mockWeather;
      fixture.detectChanges();

      let weather_detail_id = el.querySelector('#weather_detail_id');
      expect(weather_detail_id).not.toBeNull();
      expect(comp.weather).not.toBeNull();
      expect(comp.submitted).toBeTruthy();
    });
    
  }));
});


