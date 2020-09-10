import { NgModule } from '@angular/core';

import { IndexRoutingModule } from './index-routing.module';

import { IndexComponent } from './index.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [IndexRoutingModule, NgZorroAntdModule],
  declarations: [IndexComponent],
  exports: [IndexComponent],
})
export class IndexModule {}
