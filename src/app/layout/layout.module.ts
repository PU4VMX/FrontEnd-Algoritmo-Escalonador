import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TemplateComponent } from './shared/template/template.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent,
    TemplateComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [TemplateComponent],
})
export class LayoutModule {}
