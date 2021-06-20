import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng';

  ngOnInit() {
    const a = 'aa';
    const b = 'bb';
  }

  onClick() {
    const a = 'aa';
    const b = 'bb';
  }
}
