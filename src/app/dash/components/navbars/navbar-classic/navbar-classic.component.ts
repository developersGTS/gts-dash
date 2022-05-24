import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-classic',
  templateUrl: './navbar-classic.component.html',
  styleUrls: ['./navbar-classic.component.scss']
})
export class NavbarClassicComponent implements OnInit {

  @Output() toggle_out = new EventEmitter<string>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggle(){
    this.toggle_out.emit('toggle');
  }

  logOut(){
    // TODO: LOG OUT
    // this.AccountService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
