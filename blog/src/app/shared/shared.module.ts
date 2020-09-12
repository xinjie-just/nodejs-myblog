import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

const COMPONENTS = [];
const DIRECTIVES = [];
const PIPES = [];

const SERVICES = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...SHARED_ZORRO_MODULES,
  ],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...SHARED_ZORRO_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  providers: [...SERVICES],
})
export class SharedModule {}
