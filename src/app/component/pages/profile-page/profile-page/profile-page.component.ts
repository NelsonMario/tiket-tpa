import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  user: User = JSON.parse(localStorage.getItem('currentUser'))
  profiles : any = [
    {"logo": "A", "desc": "Account"},
    {"logo": "M", "desc": "My Order"},
    {"logo": "T", "desc": "Tix Point"},
    {"logo": "SP", "desc": "Smart Profile"},
    {"logo": "SPA", "desc": "Smart Pay"},
    {"logo": "DR", "desc": "Daftar Refund"},
    {"logo": "LP", "desc": "Loyalty Program"},
    {"logo": "P", "desc": "Pengaturan"},
    {"logo": "PB", "desc": "Pusat Bantuan"},
    {"logo": "K", "desc": "Keluar"},
  ]

  constructor() {
  }

  ngOnInit() {
  }

  logout(){
    localStorage.clear()
    window.location.reload()
  }
}
