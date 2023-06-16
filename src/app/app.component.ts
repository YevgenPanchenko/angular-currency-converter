import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container pt-5 pb-5">
      <div class="row justify-content-center">
        <div class="col-6">
          <app-currency-converter></app-currency-converter>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Код вашого AppComponent, якщо є
}
