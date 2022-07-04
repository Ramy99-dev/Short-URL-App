import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { CustomValidators } from './customValidator';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errMsg!:String;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
      [CustomValidators.MatchValidator('password', 'confirmPassword')])
  }

  get passwordMatchError() {

    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  ngOnInit(): void {
  }

  register() {
    let user = new User(this.registerForm.value.email, this.registerForm.value.password)
    this.userService.addUser(user).subscribe((result) => {
      if (result.created == true) {
        this.router.navigate(['login']);

      }
      else{
        console.log(result)
        this.errMsg = result.msg;
      }
    })
  }

}
