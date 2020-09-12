import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonResponse } from './../../../shared/interface/common.d';
import { BlogService } from 'src/app/shared/service/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/shared/interface/blog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less'],
})
export class DetailsComponent implements OnInit {
  blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.blogService.getBlogInfo(id).subscribe((res: CommonResponse<Blog>) => {
      if (res.code === 0) {
        this.blog = res.data;
      }
    });
  }
}
