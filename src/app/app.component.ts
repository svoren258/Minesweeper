import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Minesweeper';

  public reset: any[] = [{}];

  public onRecreate() {
    this.reset[0] = {};
  }
}
