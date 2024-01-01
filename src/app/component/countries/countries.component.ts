import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from '../../models/global-data';
import { DateWiseData } from '../../models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data : GlobalDataSummary[] ;
  countries : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeath = 0;
  totaRecovered = 0;
  dateWiseData;
  dataTable = [];
  loading = true;
  page:number = 1;
  selectedCountryData : DateWiseData[];
  chart = {
    LineChart: "LineChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out'
      }
    }
  }
  constructor(private service : DataServiceService) { }
  ngOnInit(): void {
    merge(
      this.service.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result; 
        })
      ),
      this.service.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country);
        })
      }))
    ).subscribe({
      complete : ()=>{
        this.updateValues('India');
        this.updateChart();
        this.loading = false;
      }
    })
  }
  updateChart(){
    this.dataTable.push(['Cases','Date']);
    this.selectedCountryData.forEach(cs=>{
      this.dataTable.push([cs.cases, cs.date])
    })
  }
  updateValues(country:string){
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totaRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
        this.totalDeath = cs.deaths
      }  
    })
    this.selectedCountryData = this.dateWiseData[country];
    this.updateChart();
  }
}
