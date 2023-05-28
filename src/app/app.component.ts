import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { markers } from './markers.const';

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('map') mapElement!: ElementRef;

  map!: google.maps.Map;

  async ngOnInit(): Promise<void> {
    this.initMap();
  }

  private async initMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;

    const usLatLng = new google.maps.LatLng(37.0902, -95.7129);

    this.map = new Map(this.mapElement.nativeElement, {
      center: usLatLng,
      zoom: 4,
      streetViewControl: false,
    });

    markers.forEach(marker => {
      const item = new google.maps.Marker({
        position: new google.maps.LatLng(marker.lat, marker.lng),
        title: marker.title
      });

      item.setMap(this.map);
    });
  }
}


