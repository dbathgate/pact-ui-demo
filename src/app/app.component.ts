import { Component } from '@angular/core';
import { StuffService } from './service/stuff.service';
import { Stuff } from './model/stuff.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StuffService
  ]
})
export class AppComponent {

  constructor(private stuffService: StuffService) {
    stuffService.getStuff().subscribe((stuff) => {
      this.stuffs = stuff;
    });
  }

  stuffs: Stuff[];
  title = 'pact-ui-demo';
}
