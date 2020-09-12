import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class UserModule {}
