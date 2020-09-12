import { NgModule } from '@angular/core';

import { IndexRoutingModule } from './index-routing.module';

import { IndexComponent } from './index.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [IndexRoutingModule, SharedModule],
  declarations: [IndexComponent],
  exports: [IndexComponent],
})
export class IndexModule {}
