import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  visibleComponent:string= 'Recipes';

  OnFeatureClicked(feature: string) {
    this.visibleComponent = feature;
  }

}
