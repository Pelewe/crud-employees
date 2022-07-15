import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: ApiService) { }

  searchEmployee(searchParams:any){
    return this.apiService.get(`/employees/search/`,false,searchParams)
  }
  advancedSearch(searchParams:any){
    return this.apiService.get(`/search`,false,searchParams)
  }
  getAllEmployees(){
    return this.apiService.get(`/employees/`)
  }
  getEmployee(id:any){
    return this.apiService.get(`/employees/${id}`)
  }
  createEmployee(data:any){
    return this.apiService.post(`/employees/addEmployee/`,data);
  }
  upgateEmployee(id:any,data:any){
    return this.apiService.put(`/employees/updateEmployee/${id}`, data)
  }
  deleteEmployee(id:any){
    return this.apiService.get(`/employees/deleteEmployee/${id}`)
  }
}
