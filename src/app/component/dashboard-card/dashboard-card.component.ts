import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totaRecovered')
  totaRecovered;
  @Input('totalDeath')
  totalDeath;
  @Input('totalActive')
  totalActive;
  constructor() { }

  ngOnInit(): void {
  }
}
