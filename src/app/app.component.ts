import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Find Restaurants';
  radius = '1500';
  type = 'restaurant';
  key = '&key=AlzaSyDWC7KV-XxyHpDWGlzpV4BjM5iyr2bNM-A';
  placesLink = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+';
  city;
  state;
  locationList;
  http: Http;
  places = [];

  constructor(http: Http) {
    this.http = http;
  }

  performSearch(location): void {
    this.locationList = location.value.split(', ');
    this.city = this.locationList[0];
    this.state = this.locationList[1];
    this.placesLink = this.placesLink + this.city + ',+' + this.state + this.key;
    this.http.request(this.placesLink).subscribe((res: Response) => {
      this.places = res.json().data.candidates;
    });

  }
}
