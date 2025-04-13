import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommentsService } from '../../../core/Services/comments/comments.service';
import { IComments } from '../../interfaces/icomments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  private readonly commentsService = inject(CommentsService);
  commentsList: WritableSignal<IComments[]> = signal([]);
  @Input({ required: true }) postId!: string;
  commentForm!: FormGroup;
  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(null, Validators.required),
      post: new FormControl(this.postId),
    });
    this.getComments();
  }
  getComments(): void {
    this.commentsService.getPostComments(this.postId).subscribe({
      next: (res) => {
        console.log(res.comments);
        this.commentsList.set(res.comments.reverse());
      },
    });
  }
  setComment(): void {
    this.commentsService.createComment(this.commentForm.value).subscribe({
      next: (res) => {
        this.commentsList.set(res.comments.reverse());
        this.commentForm.get('content')?.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
