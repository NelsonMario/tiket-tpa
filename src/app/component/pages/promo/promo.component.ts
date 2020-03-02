import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  promo$: Subscription
  promos : any[] = []

  constructor(private graphqlService: graphqlService, private route: Router){}

  ngOnInit(): void {
    this.promo$ = this.graphqlService.getAllPromo().subscribe(async query => {
        this.promos = query.data.promos;
        await
        console.log(this.promos)
      }
    );
  }

  goToDetail(id){
    this.route.navigate(['promo', id])
  }
}
