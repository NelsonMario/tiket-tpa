import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { graphqlService } from 'src/app/service/graphql/graphql.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-pages',
  templateUrl: './blog-pages.component.html',
  styleUrls: ['./blog-pages.component.scss']
})
export class BlogPagesComponent implements OnInit {

  blog$: Subscription;
  blogs: any[] = [];
  cookieValue: string;
  login: boolean;
  user : any
  dataCount: any
  tempCount: any
  pollingData: any;
  constructor(private grahpqlService: graphqlService, private router: Router, private http: HttpClient) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

      if (this.user == null) {
          this.login = false;
      } else {
          this.login = true;
      }


      this.blog$ = this.grahpqlService.getAllBlogs().subscribe(async query => {
          this.blogs = query.data.blogs;
          await
          console.log(this.blogs['length'])
          this.tempCount = this.blogs.length
      }
      );

      this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/?query=%7B%0Ablogs%7B%0A%20%20value%0A%7D%7D')).map((data) => JSON.stringify(data['data']['blogs']))
        .subscribe((data) => {
          let blogsData = JSON.parse(data)
          this.dataCount = blogsData['length']
          console.log(this.dataCount + " " + this.tempCount)
          if(this.tempCount != this.dataCount){
            alert("New Blog Has Publish")
            this.tempCount = this.dataCount
            return this.tempCount,  window.location.reload()
          }
        });
    }

    count(n) {
        return new Array(n);
    }

    goToDetail(id) {
        this.router.navigate(['blog', id]);
    }

    goToUpdate(id) {
      this.router.navigate(['text-editor', id]);
  }

  remove(id){
    this.blog$ = this.grahpqlService.removeBlog(id).subscribe(async query => {
      alert('Success Remove Blog')
      await
      window.location.reload()
    })
  }
// setValue() {
//     document.getElementById('content').innerHTML = this.blogs[0].value;
// }

}
