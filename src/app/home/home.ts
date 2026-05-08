import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // <--- Importante
@Component({
  selector: 'app-home',
  imports: [
    RouterModule, // <--- Agrégalo aquí
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home { }
