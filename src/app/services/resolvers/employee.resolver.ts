import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, mergeMap, Observable, of, take } from 'rxjs';
import { EmployeeService } from '../employees/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolver implements Resolve<boolean> {
  constructor(
    private employeeService: EmployeeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.employeeService.getEmployee(id).pipe(
      take(1),
      mergeMap(response => {
        if(response){
          return of(response)
        } else {
          return EMPTY;
        }

      })
    )

    
  }
}
