import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonResponse } from './../../../shared/interface/common.d';
import { UserService } from './../../../shared/service/user.service';
import { LoginRequestParams } from './../../../shared/interface/user.d';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  passwordVisible = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private msg: NzMessageService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    this.loading = true;
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const params: LoginRequestParams = {
      username: this.validateForm.get('userName').value,
      password: this.validateForm.get('password').value,
    };
    this.userService.login(params).subscribe(
      (res: CommonResponse<{}>) => {
        if (res.code === 0) {
          this.modal.destroy({ data: 'success' });
          localStorage.setItem('author', `${params.username}`);
          this.router.navigateByUrl('/blog/list');
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
