import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { Http } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    connect: boolean;
    constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(){
      this.connect = this.authenticationService.getStatus();
  }
}
