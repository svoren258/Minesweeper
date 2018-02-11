import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Minesweeper';

  constructor() {

  }

  public reset: any[] = [{}];

  public newGame() {
    this.reset[0] = {};
  }

}
