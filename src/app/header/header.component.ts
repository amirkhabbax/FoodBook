import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureClicked = new EventEmitter<string>();


  OnSelect(feature: string) {
    this.featureClicked.emit(feature);
  }

}
