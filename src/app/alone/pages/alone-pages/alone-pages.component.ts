import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  standalone: true,
  imports: [CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-pages.component.html',
  styleUrl: './alone-pages.component.css'
})
export class AlonePagesComponent {

}
