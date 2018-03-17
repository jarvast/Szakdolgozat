import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Location } from '../model/Location';
import { Server, Routes } from '../utils/ServerRoutes';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(id:number): Observable<Location[]>{
    return this.http.get<Location[]>(Server.routeTo(Routes.LOCATION) + '/' + id);
  }

}