import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authCheck = new BehaviorSubject<any>(this.checkLogin());

  constructor(private _router: Router, private _cookieService: CookieService, private _http: HttpClient) { }

  login(credentials) {

    this._http.post('http://localhost:7979/authenticate/', credentials).subscribe((resp: any) => {
      if (resp.isLoggedIn) {
        this.$authCheck.next(true);
        this._router.navigate(['/home']);
        this._cookieService.set('token', resp.token);
      }
      else {
        alert(resp.err);
      }
    });

    // if(credentials.username == 'admin' && credentials.password == 'admin'){
    //   this.$authCheck.next(true);
    //   this._router.navigate(['/home']);
    //   this._cookieService.set('isLoggedIn','true');
    // }else{
    //   alert('Invalid Credentials');
    // }

  }

  checkLogin() {
    return this._cookieService.get('token');
  }

  logout() {
    this._cookieService.delete('token');
    this.$authCheck.next(false);
    this._router.navigate(['/login']);
  }

}
