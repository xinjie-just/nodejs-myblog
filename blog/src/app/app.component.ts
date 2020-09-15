import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  routerUrl = '';

  templateType = 'blink';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe((res: NavigationEnd) => {
        this.routerUrl = res.url;
        if (
          this.routerUrl.startsWith('/index') ||
          !this.routerUrl.includes('/blog')
        ) {
          this.templateType = 'blank';
        } else {
          this.templateType = 'sidebar';
        }
      });
  }
}
