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


    constructor(
        private router: Router,
        private dataService: DataService) { }




    ngOnInit(): void {
        this.getCommentCount();
        this.getlikeCount();
        this.getComment();
    }

    getComment() {
        //console.log(this.recognitionId);
        this.dataService.getComments(this.recognitionId)

            .subscribe(
            (result) => {
                this.allComment = result.data;
                //console.log( result.data);
            },
            (err) => {
                if (err === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
            )
        var user = localStorage.getItem('usercontext');
        this.userdata = JSON.parse(user);
        // console.log(this.userdata);
    }




    postAllComment() {
        // alert();
        //console.log(this.commentCounter++);

        debugger;
        this.dataService.postComments(this.myComment, this.userdata._id, this.recognitionId).subscribe(
            result => {
                if (result.data === true) {

                    this.getComment();
                    this.getCommentCount();

                } else {
                    this.error = "fail to post your comment";
                }
            }
        )


    }




    getCommentCount() {

        this.dataService.getCommentCount(this.recognitionId)
            .subscribe(
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
        this.dataService.getLikeCount(this.recognitionId)
            .subscribe(
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
        debugger;
        //alert();
        this.dataService.postLikeCount(this.userdata._id, this.recognitionId).subscribe(
            result => {
                if (result.data === true) {

                    this.getlikeCount();

                } else {
                    this.error = "Login failed";
                }
            }
        )
    }


}