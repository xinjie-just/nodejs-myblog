import { CommonResponse } from './../../shared/interface/common.d';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/service/blog.service';
import { Blog } from 'src/app/shared/interface/blog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  value = '';
  author = '';

  tableLoading = false;
  blogList: Blog[] = [];
  total = 0;

  pageIndex = 1;
  pageSize = 10;

  constructor(
    private blogService: BlogService,
    private msg: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBlogList();
  }

  search() {
    this.getBlogList();
  }

  getBlogList() {
    this.tableLoading = true;
    const params = {
      title: this.value,
      author: this.author,
      pageIndex: this.pageIndex - 1,
      pageSize: this.pageSize,
    };
    this.blogService.getBlogList(params).subscribe(
      (res: CommonResponse<Blog[]>) => {
        if (res.code === 0) {
          this.total = res.data.total;
          this.blogList = res.data.results;
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
