import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { AddUpdateComponent } from './add-update/add-update.component';

@NgModule({
  imports: [SharedModule, BlogRoutingModule],
  declarations: [ListComponent, DetailsComponent, AddUpdateComponent],
})
export class BlogModule {}
