import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title = 'Find Restaurants';
  type = '&type=restaurant';
  key = '&key=AIzaSyDWC7KV-XxyHpDWGIzpV4BjM5iyr2bNM-A';
  placesLink;
  fields = '&fields=name,rating,photos,place_id';
  query;
  location;
  fullQuery;
  places = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  performSearch() {
    this.placesLink = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
    this.fullQuery = this.query + '+' + this.location;
    this.fullQuery = this.fullQuery.replace(' ', '+');
    this.fullQuery = this.fullQuery.replace(', ', '+');
    this.placesLink = this.placesLink + this.fullQuery + this.fields + this.type + this.key;
    this.http.get('https://cors-anywhere.herokuapp.com/' + this.placesLink).subscribe((data: JSON) => {
      this.places = data['results'];
   });
  }
}
