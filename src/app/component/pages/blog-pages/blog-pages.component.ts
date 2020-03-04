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

  realBlog : any[] = []
  showData = 5


  paginationBlog : any[] = []
  pageCount : any[] = []

  constructor(private grahpqlService: graphqlService, private router: Router, private http: HttpClient) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'))

      if (this.user == null) {
          this.login = false;
      } else {
          this.login = true;
      }


      this.blog$ = this.grahpqlService.getAllBlogs().subscribe(async query => {
          this.realBlog = query.data.blogs;
          await
          console.log(this.realBlog['length'])
          this.tempCount = this.realBlog.length
          this.pushToPagination()
          this.loadData()
        }
      );

      this.pollingData = Observable.interval(5000).switchMap(() => this.http.get('http://localhost:8080/api/success?query=%7B%0Ablogs%7B%0A%20%20value%0A%7D%7D')).map((data) => JSON.stringify(data['data']['blogs']))
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
        window.onscroll = this.scroll
    }

    scroll = (event): void => {
      console.log(window.scrollY + window.innerHeight)
      console.log(document.body.scrollHeight)
      if(window.scrollY + window.innerHeight + 2 >= document.body.scrollHeight) {
        this.showData += 5
        if(this.realBlog.length >= this.showData) {
          for (let index = this.showData-5; index < this.showData; index++) {
            this.blogs.push(this.realBlog[index])
          }
        } else {
          for (let index = this.showData-5; index < this.realBlog.length; index++) {
            this.blogs.push(this.realBlog[index])
          }
        }
      }
    }

    public loadData() {
      if(this.realBlog.length >= this.showData) {
        for (let index = 0; index < this.showData; index++) {
          this.blogs.push(this.realBlog[index])
        }
      }
      else {
        for (let index = 0; index < this.realBlog.length; index++) {
          this.blogs.push(this.realBlog[index])
        }
      }
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

  pushToPagination() {
    for (let i = 0; i < this.realBlog.length; i++) {
      if(i < 5) this.paginationBlog.push(this.realBlog[i])
      if(i % 5 == 0) this.pageCount.push(1 + (i/5))
    }
  }

  changePage(currPage) {
    this.paginationBlog = []
    for (let i = currPage * 5; i < (currPage+1) * 5 && i < this.realBlog.length; i++) {
      this.paginationBlog.push(this.realBlog[i])
      }
    }
// setValue() {
//     document.getElementById('content').innerHTML = this.blogs[0].value;
// }

}
