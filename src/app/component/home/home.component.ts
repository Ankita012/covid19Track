import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from '../../models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeath = 0;
  totaRecovered = 0;
  loading = true;
  globalData : GlobalDataSummary[];
  dataTable = [];
  chart = {
    PieChart : "PieChart",
    ColumnChart : "ColumnChart",
    height: 500,
    options:{
      animation:{
        duration:1000,
        easing:'out'
      },
      is3D:true
    }
  }
  constructor(private dataService:DataServiceService) { }

  initChart(caseType: string){
    this.dataTable = [];
    this.globalData.forEach(cs=>{
      let value : number;
      if (caseType == 'c')
        if(cs.confirmed > 150000)
          value = cs.confirmed

      if (caseType == 'r')
        if(cs.recovered > 10000)  
          value = cs.recovered

      if (caseType == 'd')
        if(cs.deaths > 1000)  
          value = cs.deaths

      if (caseType == 'a')
        if(cs.active > 2000)
          value = cs.active
          
      this.dataTable.push([cs.country, value])    
    })
  }  
  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next : (result)=>{
        this.globalData = result;
        result.forEach(cs=>{
          if(!Number.isNaN(cs.confirmed)){
            this.totalActive += cs.active;
            this.totaRecovered += cs.recovered;
            this.totalConfirmed += cs.confirmed;
            this.totalDeath += cs.deaths;
          }
        })
        this.initChart('c');
      },
      complete : ()=>{
        this.loading = false;
      }
    })
  }
  updateChart(input:HTMLInputElement){
    this.initChart(input.value);
  }
}
