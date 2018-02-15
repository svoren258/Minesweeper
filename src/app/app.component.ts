import {Component, OnInit} from '@angular/core';
import {WindowService} from "./window.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // Hard-coding static texts into the template is completely ok; it doesn't create unnecessary clutter in the component's logic.
  title = 'Minesweeper';

  constructor(private windowService:WindowService) {}

  // Don't be afraid to remove unused lifecycle hooks, even if auto-generated.
  ngOnInit(): void {}

  // Creative hack. However, if the app's architecture is well designed, the need to forcefully re-construct components should usually be
  // avoidable. See the summarizing comment at the start of `button.component.ts`,
  public reset: any[] = [{}];

  // The `public` keyword is unnecessary (and even linted-out in our codebase), as it is the implicit access modifier in TypeScript.
  public newGame() {
    this.windowService.initAll();
    this.windowService.placeBombs();
    this.reset[0] = {};
  }
}
