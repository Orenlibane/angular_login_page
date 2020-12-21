import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  state = 'Signup';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  loginForm = this.fb.group({
    userName: (['', Validators.required]),
    password: (['', Validators.required]),
  });

  signupForm = this.fb.group({
    email: (['', Validators.required]),
    userName: (['', Validators.required]),
    password: (['', Validators.required]),
    password2: (['', Validators.required]),
  });

  ngOnInit(): void {
  }


  submit(): any {
    if (this.state === 'Login') {
      // login()
    } else if (this.state === 'Signup') {
      this.authService.signup(this.signupForm.value).subscribe((res) => {
        console.log('res from post', res);
        this.router.navigate(['/afterLogin']);
        console.log('Signed and logged');
      }, (err) => {
          console.log('ERROR!', err);
      });
    }
  }

}
