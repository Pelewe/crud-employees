import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employees/employee.service';
import { CommunicationService } from 'src/app/services/utility/communication.service';
import { Employee } from 'src/app/services/employees/employee.state.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit,AfterViewInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  results:any = [];
  loading: boolean = false;
  noDataMessage = 'There is no employee here...'
  constructor(
    private commService: CommunicationService,
    private employeeService: EmployeeService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.commService.trigger$.subscribe((data) => {
      this.loading = true;
      if(data.length > 0){
        let params2 = new HttpParams().set('q',data)
        this.employeeService.searchEmployee(params2).subscribe((response) => {
          this.length = response.total;
          this.results = response.data;
          this.pageSize = response.data.length
          if(response.data.length == 0){
            this.noDataMessage = `No search results for ${data}`
          }
          this.loading = false;
        })
      } else {
        this.length = 0;
        this.results = [];
        this.pageSize = 0
        this.loading = false;
      }
    })
    
  }

  // To Get List Of Employee
  getEmployees() {
    this.employeeService
      .getAllEmployees()
      .subscribe((data: Employee[]) => {
        this.results = data;
     //   this.MyDataSource = new MatTableDataSource();
    //    this.MyDataSource.data = data;
    //    this.MyDataSource.paginator = this.paginator;
    //    this.MyDataSource.sort = this.sort;
      });
  }
  pageEvent(event: any){
    console.log(event)
    
  }

  viewEmployee(artist:any){
    this.route.navigate([`/home/${artist.id}`])
    
  }


}
