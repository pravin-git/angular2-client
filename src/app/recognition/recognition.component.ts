import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';



@Component({
    moduleId: module.id,
    selector: 'my-recognition',
    templateUrl: 'recognition.component.html'
})
export class RecognitionComponent implements OnInit {

    @Input() userId:Number;
    @Input() refreshRecognitions:Boolean;

    userdata: any;
    recongnitions: any[];
    
    constructor(
        private router: Router,
        private dataService: DataService) {
        this.setUsersFromStorage();
    }

    ngOnInit() {
        this.getRecognitions();
    }

    setUsersFromStorage() {
        var users = localStorage.getItem('usercontext');
        this.userdata = JSON.parse(users);
    }

    getRecognitions() {
        this.dataService.getRecognitions().subscribe(
            (result) => {
                this.recongnitions = result.data;
            },
            (err) => {
                if (err === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        )
    }


    





}