import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=';
  placeId;
  fields = '&fields=formatted_address,name,formatted_phone_number,opening_hours,website,price_level,rating,reviews,user_ratings_total,photos,type';
  key = '&key=AIzaSyDWC7KV-XxyHpDWGIzpV4BjM5iyr2bNM-A';
  photosUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=';
  placeJSON;
  place;
  photosRefrence = [];
  photo;
  splitDay = [];
  days = [{
    day: '',
    hours: ''
  }];
  i: number;
  rating: number;
  ratingStr;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.placeId = params.get('place_id');
    });
    this.detailsUrl = this.detailsUrl + this.placeId + this.fields + this.key;
    this.http.get(this.detailsUrl).subscribe((data: JSON) => {
      this.place = data['result'];
      this.photosUrl = this.photosUrl + this.place['photos'][0]['photo_reference'] + this.key;
      for (this.i = 0; this.i < this.place.opening_hours.weekday_text.length; this.i++) {
        this.splitDay = this.place.opening_hours.weekday_text[this.i].split(': ');
        this.days[this.i] = {day: this.splitDay[0], hours: this.splitDay[1]};
        this.rating = this.place.rating;
        this.ratingStr = this.rating.toFixed(1);
      }
    });
  }
}
