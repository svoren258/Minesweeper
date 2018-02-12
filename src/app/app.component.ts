import {Component, OnInit} from '@angular/core';
import {WindowService} from "./window.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Minesweeper';

  constructor(private windowService:WindowService) {}

  ngOnInit(): void {}

  public reset: any[] = [{}];

  public newGame() {
    this.windowService.initAll();
    this.windowService.placeBombs();
    this.reset[0] = {};
  }
}
