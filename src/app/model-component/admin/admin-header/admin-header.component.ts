import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  flight(){
    this.route.navigate(['admin-flight'])
  }

}
