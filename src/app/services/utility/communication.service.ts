import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

  private searchTrigger = new Subject<any>();

  // Observable string streams
  trigger$ = this.searchTrigger.asObservable();

  searchTriggerFunction(searchString:any){
    this.searchTrigger.next(searchString)
  }
}
