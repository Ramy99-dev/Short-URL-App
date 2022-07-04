import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {


  constructor(private activatedroute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let email = this.activatedroute.snapshot.params.email;
    console.log(email)
    this.userService.activateAccount(email).subscribe((result) => {
      console.log(result)
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);

    })
  }

}
