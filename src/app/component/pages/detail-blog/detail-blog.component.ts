import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Subscription, interval } from 'rxjs';
import { timer, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
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
  constructor(private graphql: graphqlService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.blog$ = this.graphql.getBlogById(parseInt(this.id)).subscribe(async query =>{
      this.blog = query.data.blogById
      await
      console.log(query.data.blogById)
      console.log(this.blog)
    })

    this.blog$ = this.graphql.getAllBlogs().subscribe(async query => {
      this.blogs = query.data.blogs;
      await
      console.log(this.blogs['length'])
      this.tempCount = this.blogs.length
    }
    );

    this.pollingData = Observable.interval(1000).switchMap(() => this.http.get('http://localhost:8080/?query=%7B%0Ablogs%7B%0A%20%20value%0A%7D%7D')).map((data) => JSON.stringify(data['data']['blogs']))
    .subscribe((data) => {
      console.log(JSON.parse(data))
      this.count = JSON.parse(data)['length']
      console.log(this.count + " "  + this.tempCount)
      if(this.tempCount != this.count){
        alert("New Blog has published")
        this.tempCount = this.count
        return this.tempCount
      }
    });
  }
  ngOnDestroy() {
    this.pollingData.unsubscribe();
    this.blog$.unsubscribe()
}
}
