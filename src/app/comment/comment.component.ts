import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'my-comment',
    templateUrl: 'comment.component.html'
})
export class CommentComponent implements OnInit {

    @Input() recognitionId: string;
    commentCount: Number;
    likeCount: Number;
    allComment: any[];
    userdata: any;
    error: string;
    myComment: string;
    alreadyLiked: boolean;


    constructor(
        private router: Router,
        private dataService: DataService) {

    }

    ngOnInit(): void {
        this.setUser();
        this.getCommentCount();
        this.getlikeCount();
        this.getComment();
        this.isRecognitionLikedByMe();
    }

    isRecognitionLikedByMe() {
        this.dataService.isRecognitionLikedByMe(this.userdata._id, this.recognitionId).subscribe(
            result => {
                this.alreadyLiked = result.count > 0;
            },
            err => {
                if (err === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        )
    }

    getComment() {
        this.dataService.getComments(this.recognitionId).subscribe(
            (result) => {
                this.allComment = result.data;
            },
            (err) => {
                if (err === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        )
    }

    setUser() {
        var user = localStorage.getItem('usercontext');
        this.userdata = JSON.parse(user);
    }

    postAllComment() {
        this.dataService.postComments(this.myComment, this.userdata._id, this.recognitionId).subscribe(
            result => {
                if (result.data === true) {

                    this.getComment();
                    this.getCommentCount();
                    this.myComment = "";

                } else {
                    this.error = "fail to post your comment";
                }
            }
        )
    }

    getCommentCount() {
        this.dataService.getCommentCount(this.recognitionId).subscribe(
            (result) => {
                this.commentCount = result.count;
            },
            (err) => {
                if (err === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        );
    }

    getlikeCount() {
        this.dataService.getLikeCount(this.recognitionId).subscribe(
            (result) => {
                this.likeCount = result.count;
            },
            (err) => {
                if (err === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        );
    }

    postLikeCounts() {
        this.dataService.postLikeCount(this.userdata._id, this.recognitionId).subscribe(
            result => {
                if (result.data === true) {
                    this.getlikeCount();
                    this.isRecognitionLikedByMe();
                } else {
                    this.error = "Login failed";
                }
            }
        )
    }
}