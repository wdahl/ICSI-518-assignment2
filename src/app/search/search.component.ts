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
  placesLink = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
  fields = '&fields=name,rating,photos,place_id';
  query;
  places = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  performSearch(query, location): void {
   this.query = query.value + '+' + location.value;
   this.query = this.query.replace(' ', '+');
   this.query = this.query.replace(', ', '+');
   this.placesLink = this.placesLink + this.query + this.fields + this.type + this.key;
   this.http.get(this.placesLink).subscribe((data: JSON) => {
      this.places = data['results'];
      console.log(this.places);
   });
  }
}
