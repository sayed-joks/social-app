import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { PostsService } from '../../core/Services/posts/posts.service';
import { IPosts } from '../../shared/interfaces/iposts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from '../../shared/components/comments/comments.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [InfiniteScrollModule, DatePipe, CommentsComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly toastrService = inject(ToastrService);
  readonly loadingBar = inject(LoadingBarService);

  page: number = 1;
  posts: WritableSignal<IPosts[]> = signal([]);
  savedFiles!: File;
  content: string = '';
  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(): void {
    this.postsService.getAllPosts(this.page).subscribe({
      next: (res) => {
        console.log(res.posts);
        this.posts.set(res.posts);
      },
    });
  }
  loadMoreData() {
    this.postsService.getAllPosts(this.page).subscribe((newData) => {
      this.posts().push(...newData.posts);
      this.page++;
    });
  }
  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.savedFiles = input.files[0];
    }
  }
  addPost(): void {
    const formData = new FormData();
    formData.append('body', this.content);
    formData.append('image', this.savedFiles);
    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.toastrService.success(
            'Your post has been published successfully',
            '',
            {
              progressBar: true,
            }
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
    });
  }
}
