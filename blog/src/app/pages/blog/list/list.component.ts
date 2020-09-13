import { AddUpdateComponent } from './../add-update/add-update.component';
import { Component, OnInit } from '@angular/core';
import {
  Blog,
  SearchBlogRequestParams,
  DeleteBlogRequestParams,
} from 'src/app/shared/interface/blog';
import { BlogService } from 'src/app/shared/service/blog.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonResponse } from 'src/app/shared/interface/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  value = '';
  author = '';
  total = 0;
  pageIndex = 1;
  pageSize = 10;

  tableLoading = false;
  blogList: Blog[] = [];
  allowHandle = true;

  constructor(
    private blogService: BlogService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.author = localStorage.getItem('author');
    this.getBlogList();
  }

  search() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.getBlogList();
  }

  getBlogList() {
    this.tableLoading = true;
    const params: SearchBlogRequestParams = {
      title: this.value,
      pageIndex: this.pageIndex - 1,
      pageSize: this.pageSize,
      author: this.author,
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
        this.tableLoading = false;
        this.msg.error(error);
      },
      () => {
        this.tableLoading = false;
      }
    );
  }

  deleteBlog(blog: Blog) {
    this.modal.confirm({
      nzTitle: `你确认要删除博客 <i>${blog.title}</i> 吗？`,
      nzOnOk: () => this.delete(blog),
    });
  }
  delete(blog: Blog) {
    const params: DeleteBlogRequestParams = {
      id: blog.id,
      author: blog.author,
    };
    this.blogService.deleteBlog(params).subscribe(
      (res: CommonResponse<{}>) => {
        if (res.code === 0) {
          this.msg.success(res.message);
          this.search();
        } else {
          this.msg.error(res.message);
        }
      },
      (error) => {
        this.msg.error(error);
      }
    );
  }

  viewBlog(id: number) {
    this.router.navigateByUrl(`/blog/details/${id}`);
  }

  handleBlog(blog = {}) {
    const handleModal = this.modal.create({
      nzTitle: Object.keys(blog).length ? '修改博客' : '新建博客',
      nzContent: AddUpdateComponent,
      nzComponentParams: {
        blog: Object.keys(blog).length ? blog : {},
      },
      nzFooter: null,
    });

    handleModal.afterClose.subscribe((result) => {
      if (result && result.data === 'success') {
        this.search();
      }
    });
  }
}
