import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-footer',
  templateUrl: './customer-footer.component.html',
  styleUrls: ['./customer-footer.component.scss']
})
export class CustomerFooterComponent implements OnInit {

  company: string[] = [];
  product: string[] = [];
  support: string[] = [];

  constructor() {
    /*
    * Company List
    */
    this.company.push('Blog');
    this.company.push('Karir');
    this.company.push('Corporate');
    this.company.push('Partner');
    this.company.push('Tix Point');
    this.company.push('Perlindungan');
    this.company.push('Cicilan');
    this.company.push('Daftarkan Hotel Anda');
    /*
    * Product List
    */
    this.product.push('Pesawat');
    this.product.push('Hotel');
    this.product.push('kereta Api');
    this.product.push('Sewa Mobil');
    this.product.push('Hiburan');
    /*
    * Support List
    */
    this.support.push('Pusat Bantuan');
    this.support.push('Syarat dan Ketentuan');
    this.support.push('Kebijakan dan Privasi');
    this.support.push('Tiket Anti Galau');
  }

  ngOnInit() {
  }

}
