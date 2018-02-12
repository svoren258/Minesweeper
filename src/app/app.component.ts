import {Component, OnInit} from '@angular/core';
import {WindowService} from "./window.service";
import {WindowComponent} from "./window/window.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Minesweeper';

  // window: WindowComponent;

  constructor(/*private windowService:WindowService*/) {
  }

  ngOnInit(): void {
    /*if (this.windowService.isSavedGame()) {
      this.loadGame();
    }*/
  }

  public reset: any[] = [{}];

  public newGame() {
    this.reset[0] = {};
  }

/*  public saveGame(window: WindowComponent) : void {
    this.windowService.saveGame(window);
  }

  loadGame(): void {
    this.window = this.windowService.loadGame();
  }*/


}
