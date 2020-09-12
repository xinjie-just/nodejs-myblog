import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/pages/user/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  loginStatus = 0; // 0 未登录，1 已登录
  author = '';

  constructor(private modal: NzModalService, private router: Router) {}

  ngOnInit(): void {
    const author = localStorage.getItem('author');
    this.author = author;
    this.loginStatus = author ? 1 : 0;
  }

  login() {
    const LoginModal = this.modal.create({
      nzTitle: '登录',
      nzContent: LoginComponent,
      nzFooter: null,
    });

    LoginModal.afterClose.subscribe((result) => {
      if (result && result.data === 'success') {
        this.loginStatus = 1;
      }
    });
  }

  logout() {
    this.loginStatus = 0;
    localStorage.clear();
    this.router.navigateByUrl('index');
  }
}
