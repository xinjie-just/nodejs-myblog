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
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  value = '';
  author = '';

  tableLoading = false;
  blogList: Blog[] = [];
  allowHandle = true;

  constructor(
    private blogService: BlogService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.author = localStorage.getItem('author');
    /* this.route.queryParams.subscribe((value) => {
      if (value.author !== this.author) {
        this.allowHandle = false;
      }
    }); */
    this.getBlogList({ title: '' });
  }

  search() {
    this.getBlogList({ title: this.value });
  }

  getBlogList(value?: SearchBlogRequestParams) {
    this.tableLoading = true;
    const params: SearchBlogRequestParams = {
      title: value.title,
    };
    params.author = this.author;
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

  deleteBlog(blog: Blog) {
    const deleteMadel = this.modal.confirm({
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
          this.getBlogList({ title: this.value });
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
        this.getBlogList({ title: this.value });
      }
    });
  }
}
