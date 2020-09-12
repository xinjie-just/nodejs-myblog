import { CommonResponse } from './../../shared/interface/common.d';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/service/blog.service';
import {
  Blog,
  DeleteBlogRequestParams,
  SearchBlogRequestParams,
} from 'src/app/shared/interface/blog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  value = '';

  tableLoading = false;
  blogList: Blog[] = [];

  constructor(
    private blogService: BlogService,
    private msg: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBlogList({ title: '', author: '' });
  }

  search() {
    this.getBlogList({ title: this.value, author: '' });
  }

  getBlogList(value?: SearchBlogRequestParams) {
    this.tableLoading = true;
    const params = {
      title: value.title,
      author: value.author,
    };
    this.blogService.getBlogList(params).subscribe(
      (res: CommonResponse<Blog[]>) => {
        if (res.code === 0) {
          this.blogList = res.data;
        } else {
          this.msg.error(res.message);
        }
      },
      (error) => {
        this.msg.error(error);
      },
      () => {
        this.tableLoading = false;
      }
    );
  }
  toBlogList(blog: Blog) {
    this.router.navigateByUrl(`/blog/list?author=${blog.author}`);
  }

  view(id: number) {
    this.router.navigateByUrl(`/blog/details/${id}`);
  }
}
