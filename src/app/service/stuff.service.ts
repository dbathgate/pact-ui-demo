import { Injectable } from '@angular/core';
import { Stuff } from '../model/stuff.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StuffService {

    constructor(private http: HttpClient) {

    }
    getStuff(): Observable<Stuff[]> {
        return this.http.get<Stuff[]>('/stuff-service/stuff');
    }
}