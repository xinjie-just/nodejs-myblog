import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';

@NgModule({
  imports: [SharedModule, BlogRoutingModule],
  declarations: [],
})
export class BlogModule {}
