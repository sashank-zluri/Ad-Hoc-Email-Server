import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import {SharedModule} from '../shared/shared.module';
import { BlogPostPageComponent } from './blog-post-page/blog-post-page.component';
import {BlogService} from './blog.service';
import { MatDividerModule } from '@angular/material/divider';
import { HowToSetUpYourOwnDisposableMailServerComponent } from './posts/how-to-set-up-your-own-disposable-mail-server/how-to-set-up-your-own-disposable-mail-server.component';
import { RunAhemOnDockerComponent } from './posts/run-ahem-on-docker/run-ahem-on-docker.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatDividerModule,
    BlogRoutingModule
  ],
  providers: [
    BlogService
  ],
  declarations: [BlogComponent, BlogEntryComponent, BlogPostPageComponent, HowToSetUpYourOwnDisposableMailServerComponent, RunAhemOnDockerComponent]
})
export class BlogModule { }

