import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  _id: string;
  name: string;
  gender: string;
  age: number;
  address: string;
  city: string;
  country: string;
  status: string;
  updated: Date;

  displayedColumns: string[] = ['name', 'age', 'status'];
  data: CasesComponent[] = [];
  isLoadingResults = true;
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCases()
    .subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
