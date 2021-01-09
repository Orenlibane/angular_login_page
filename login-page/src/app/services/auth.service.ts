import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl = 'http://localhost:3000/users/signup';
  loginUrl = 'http://localhost:3000/users/login';
  constructor(private http: HttpClient) {
  }


  login(user): Observable<any> {
    console.log('login try')
    return this.http.post(this.loginUrl, {name: user.userName, password: user.password, password2: user.password2, email: user.email});

  }

  signup(user): Observable<any> {
    console.log('user', user);
    return this.http.post(this.signUpUrl, {name: user.userName, password: user.password, password2: user.password2, email: user.email});
  }
}
