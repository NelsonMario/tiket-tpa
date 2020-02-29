import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-footer',
  templateUrl: './customer-footer.component.html',
  styleUrls: ['./customer-footer.component.scss']
})
export class CustomerFooterComponent implements OnInit {

  product: string[] = [];
  support: {name: String, url: String}[] = [];
  company: {name: String, url: String}[] = [];

  constructor() {
    /*
    * Company List
    */
    this.company.push({name: 'Blog', url: 'localhost:4200/blog'});
    this.company.push({name: 'Karir', url: 'https://www.tiket.com/careers/'});
    this.company.push({name: 'Corporate', url: 'https://www.tiket.com/corporate'});
    this.company.push({name: 'Partner', url: 'https://www.tiket.com/partner'});
    this.company.push({name: 'Tix Point', url: 'https://www.tiket.com/tix'});
    this.company.push({name: 'Perlindungan', url: 'https://www.tiket.com/insurance'});
    this.company.push({name: 'Cicilan', url: 'https://www.tiket.com/info/cicilan'});

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
    this.support.push({name: 'Pusat Bantuan', url: 'https://www.tiket.com/help-center'})
    this.support.push({name: 'Syarat dan Ketentuan', url: 'https://www.tiket.com/info'})
    this.support.push({name: 'Kebijakan dan Privasi', url: 'https://www.tiket.com/info/privacy-policy'})
    this.support.push({name: 'Tiket Anti Galau', url: 'https://tix.tiket.com/register'})
    this.support.push({name: 'Daftarkan Hotel Anda', url: 'https://www.tiket.com/info/tiket-anti-galau'})
    this.support.push({name: 'Group Booking', url: 'https://www.tiket.com/info/group-booking'})
  }

  ngOnInit() {
  }
}
