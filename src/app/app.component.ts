import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: "Today's Fixtures", url: 'todays-fixtures', icon: 'calendar' },
    { title: 'Explore', url: 'explore', icon: 'infinite' },
  ];
  constructor() {}
}
