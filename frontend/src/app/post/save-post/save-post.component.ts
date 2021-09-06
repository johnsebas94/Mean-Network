import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.component.html',
  styleUrls: ['./save-post.component.css'],
})
export class SavePostComponent implements OnInit {
  registerData: any;
  selectedFile: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  selecteFile: any;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this.message = '';
    this.selectedFile = null;
  }

  ngOnInit(): void {}

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
  savePost() {
    if (!this.registerData.text) {
      console.log('Failed process: Complete the description about your post');
      this.message = 'Failed process:Complete the description about your post';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      const data = new FormData();
      if (this.selectedFile != null) {
        data.append('image', this.selectedFile, this.selectedFile.name);
      }
      if (this.registerData.hashtag != undefined) {
        data.append('hashtag', this.registerData.hashtag);
      }
      data.append('text', this.registerData.text);

      this._postService.savePost(data).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listPost']);
          this.message = 'Post Created';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
