import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription, interval } from 'rxjs';
import { timer, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {

  id;
  blog: any[]
  blog$: Subscription
  count: any
  tempCount: any
  pollingData: any;

  blogs: any[]
  blogs$: Subscription
  trendingBlog : any[] = []
  url: any

  constructor(private graphql: graphqlService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {


    this.id = this.route.snapshot.paramMap.get('id')
    this.blog$ = this.graphql.getBlogById(parseInt(this.id)).subscribe(async query =>{
      this.blog = query.data.blogById
      await
      console.log(query.data.blogById)
      console.log(this.blog)
      this.graphql.increaseViewer(this.id, this.blog[0].viewer + 1).subscribe(async query => {
        await
        console.log(this.blog[0].viewer)
      })
    })


    this.blog$ = this.graphql.getAllBlogs().subscribe(async query => {
      this.blogs = query.data.blogs;
      await
      console.log(this.blogs['length'])
      this.tempCount = this.blogs.length
      this.trendingBlog = this.blogs
      this.trendingBlog.sort(function(a, b){ return  b.viewer - a.viewer})
    }

    );

    this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/?query=%7B%0Ablogs%7B%0A%20%20value%0A%7D%7D')).map((data) => JSON.stringify(data['data']['blogs']))
    .subscribe((data) => {
      console.log(JSON.parse(data))
      this.count = JSON.parse(data)['length']
      console.log(this.count + " "  + this.tempCount)
      if(this.tempCount != this.count){
        alert("New Blog has published")
        this.tempCount = this.count
        return this.tempCount
      }
      // this.setShareUrl()
    });



  }
  ngOnDestroy() {
    this.pollingData.unsubscribe();
    this.blog$.unsubscribe()
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

  whatsapp(){
    var url = location.href
    window.open('https://api.whatsapp.com/send?text=' + url)

  }

  facebook(){
    var url = location.href
    window.open('http://www.facebook.com/sharer.php?u=http://127.0.0.1:4200/search-hotel'+this.id ,'facebookShare', 'width=626,height=436');
  }

  copy(){
    var url = location.href
    navigator.clipboard.writeText(url)
  }
}
