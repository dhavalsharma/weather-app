/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';

import { TestBed, ComponentFixture, async }      from '@angular/core/testing';

import { By }           from '@angular/platform-browser';

import { LocationFormComponent } from './location-form/location-form.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

////////  SPECS  /////////////

describe('AppComponent with TCB', function () {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, LocationFormComponent],
      imports: [FormsModule, HttpModule]
    })
      .compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });

  xit('should have expected <h1> text', () => {
      fixture.detectChanges();
      let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works
      //h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred
      expect(h1.innerText).toMatch(/your location/i, '<h1>Please provide your location.</h1>');
  });

});
