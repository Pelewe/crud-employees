import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { SearchResultsComponent } from './employees/search-results/search-results.component';



@NgModule({
    imports: [
        CommonModule,
        IndexRoutingModule,
    MaterialModule
        
    
    ],
    declarations: [
        AddEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeesComponent,
    HomeComponent,
    SearchResultsComponent
    ]
})
export class IndexModule { }