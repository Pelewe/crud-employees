import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeResolver} from 'src/app/services/resolvers/employee.resolver';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Employees',
    component: ListEmployeesComponent,
    // resolve : {
    //   employee: EmployeeResolver,
    // }
  },
  {
    path: 'AddEmployee',
    component: AddEmployeeComponent
  },
  {
    path: 'editEmployee/:id',
    component: AddEmployeeComponent
  },


  // children: [
  //   {
  //       path: "",
  //       loadChildren: './list-employee/index.module#ListEmployeeModule'
  //   },
  //   {
  //       path: "create",
  //       loadChildren: './add-employee/index.module#AddEmployeeModule'
  //   },
  //   {
  //       path: "edit/:id",
  //       loadChildren: './edit-employee/index.module#EditEmployeeModule'
  //   }
//]
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
