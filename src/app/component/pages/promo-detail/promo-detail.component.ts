import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.component.html',
  styleUrls: ['./promo-detail.component.scss']
})
export class PromoDetailComponent implements OnInit {

  id: any
  promo$: Subscription
  promo: any[] = []
  otherPromo$ : Subscription
  otherPromo: any[] = []
  url: any
  constructor(private route: ActivatedRoute, private graphqlService: graphqlService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.promo$ = this.graphqlService.getPromoById(this.id).subscribe(async query => {
      this.promo = query.data.promo;
      await
      console.log(this.promo)
    });

    this.otherPromo$ = this.graphqlService.getAllPromo().subscribe(async query => {
      this.otherPromo = query.data.promos;
      await
      console.log(this.otherPromo)
    });
    this.setShareUrl()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.promo$.unsubscribe()
    this.otherPromo$.unsubscribe()
  }
  goToDetail(id){
    this.router.navigate(['promo', id])
    window.location.reload()
  }

  setShareUrl() {
    this.url = this.router.url;
    document.getElementById('share').innerHTML = document.getElementById('share').innerHTML = `<div class="fb-share-button" data-href="http://127.0.0.1:4200/` + this.url +
    `" data-layout="button_count" data-size="small">` +
    `<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:4200/` + this.url +
    `;src=sdkpreparse"class="fb-xfbml-parse-ignore">Share</a></div>` +
    `<div class="line-it-button" data-lang="en" data-type="share-b" data-ver="3" data-url="http://127.0.0.1:4200/` + this.url +
    `" data-color="default"data-size="small" data-count="true" style="display: none;"></div>` +
    `<a href="whatsapp://send?text=http://127.0.0.1:4200/` + this.url + `">Bagikan ke WhatsApp</a>`;
  }
}
