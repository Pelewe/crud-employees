import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
//import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeService } from '../../../services/employees/employee.service';
import { Employee } from 'src/app/services/employees/employee.state.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
})
export class ListEmployeesComponent implements OnInit {
  @Input() employeeList: Employee[] = [];
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // Important objects
  MyDataSource: any;
  ///employeeList: Employee[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'action'];

  constructor(private service: EmployeeService, private router: Router) {
  }

  ngOnInit() {
  //  this.getEmployees();
  }

  // To Get List Of Employee
  getEmployees() {
    this.service
      .getAllEmployees()
      .subscribe((data: Employee[]) => {
     //   this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = data;
    //    this.MyDataSource.paginator = this.paginator;
    //    this.MyDataSource.sort = this.sort;
      });
  }

  // To Edit Employee
  editEmployee(empid: any) {
    this.router.navigate([`/home/editEmployee/${empid}`]);
  }

  deleteEmployee(empid: any){

  }
  // Search specific result
  filterEmployee(searchstring: string) {
    searchstring = searchstring.trim();
    searchstring = searchstring.toLowerCase();
    this.MyDataSource.filter = searchstring;
  }

    deleteUser(emp: any) {
        const employee = this.employeeList.find(x => x.id == emp.id);
        if (!employee) return;
        employee.isDeleting = true;
        this.service.deleteEmployee(emp.id)
            .pipe(first())
            .subscribe(() => this.employeeList = this.employeeList.filter(x => x.id != emp.id));
    }

    viewEmployee(employee:any){
      this.router.navigate([`/home/editEmployee/${employee.id}`])
    }
}