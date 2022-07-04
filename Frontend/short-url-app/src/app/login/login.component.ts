import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errMsg!:String;
  constructor(private formBuilder: FormBuilder, private userService: UserService ,private router: Router) {
    this.loginForm = this.formBuilder.group({

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  ngOnInit(): void {
  }
  login() {
    let user = new User(this.loginForm.value.email ,this.loginForm.value.password)
    console.log(user)
    this.userService.login(user).subscribe((result) => {
      console.log(result)
      if (result.state == "Connected") {
        localStorage.setItem('token',result.token);
        this.router.navigate(['']);
      }
      else{
        this.errMsg = result.errMsg;
      }
    })
  }

}
