import { CommonResponse } from './../../shared/interface/common.d';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/service/blog.service';
import {
  Blog,
  DeleteBlogRequestParams,
  SearchBlogRequestParams,
} from 'src/app/shared/interface/blog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { resolveCname } from 'dns';
import { NzMenuModeType } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';

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
    private modal: NzModalService
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
          this.getBlogList();
        } else {
          this.msg.error(res.message);
        }
      },
      (error) => {
        this.msg.error(error);
      }
    );
  }
}
