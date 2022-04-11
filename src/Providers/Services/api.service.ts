import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { LocalApiService } from '../Local/local-api.service';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl: any;
  token: string;
  patchurl: string;
  deleteurl: any;

  constructor(public http: HttpClient,
              public localapiservice: LocalApiService
              ) {
    
    this.baseurl = environment.baseurl+'restapi/';
  }

  postdata(url, postParams) {
    this.token = 'OK';
    return this.http.post(this.baseurl + url, postParams,
      {headers: new HttpHeaders({Authorization: this.token})
                                });
  }


  getdata(url, token=null) {
    this.token = token;
    return this.http.get(this.baseurl + url,
      {headers: new HttpHeaders({Authorization: this.token})
                                });
  }


}
