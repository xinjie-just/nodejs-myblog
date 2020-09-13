import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import {
  Blog,
  AddUpdateBlogRequestParams,
} from 'src/app/shared/interface/blog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/shared/service/blog.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonResponse } from 'src/app/shared/interface/common';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.less'],
})
export class AddUpdateComponent implements OnInit {
  @Input() blog: {
    id?: number;
    author?: string;
    title?: string;
    content?: string;
  } = {};

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private msg: NzMessageService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
    });
    if (Object.keys(this.blog).length) {
      this.form.patchValue({
        title: this.blog.title,
        content: this.blog.content,
      });
    }
  }
  submit(): void {
    this.loading = true;
    // tslint:disable-next-line: forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    const params: AddUpdateBlogRequestParams = {
      author: localStorage.getItem('author'),
      title: this.form.get('title').value,
      content: this.form.get('content').value,
    };
    let observer: Observable<CommonResponse<{}>>;
    // let observer;
    if (Object.keys(this.blog).length) {
      // 修改
      observer = this.blogService.updateBlog(this.blog.id, params);
    } else {
      // 新增
      observer = this.blogService.createBlog(params);
    }
    observer.subscribe(
      (res: CommonResponse<{}>) => {
        if (res.code === 0) {
          this.modal.destroy({ data: 'success' });
          this.msg.success(res.message);
        } else {
          this.modal.destroy({ data: 'error' });
          this.msg.error(res.message);
        }
      },
      (error) => {
        this.modal.destroy({ data: 'error' });
        this.loading = false;
        this.msg.error(error);
      },
      () => {
        this.loading = false;
      }
    );
  }

  cancel() {
    this.modal.destroy({ data: 'cancel' });
  }
}
