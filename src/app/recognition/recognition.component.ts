import { Component, OnInit } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { TagInputModule } from 'ng2-tag-input';


@Component({
    moduleId: module.id,
    selector: 'recognition',
    templateUrl: 'recognition.component.html'
})
export class RecognitionComponent implements OnInit {

    userdata: any;
    recongnitions: any[];
    mynominationText: string;
    error: string;


    users: any[];
    selectedUsers = new Array();

    constructor(
        private router: Router,
        private dataService: DataService) {
        this.setUsersFromStorage();
    }

    ngOnInit() {
        this.getRecognitions();
        this.getUsers();
    }

    onItemAdded(e: any) {
        this.selectedUsers.push(e.value);
        console.log(e.value);
    }

    onItemRemoved(e: any) {
        let index: number = this.selectedUsers.indexOf(e.value);
        if (index !== -1) {
            this.selectedUsers.splice(index, 1);
        }
    }

    getUsers() {
        this.dataService.getUsers().subscribe(
            (result) => {
                this.users = result.data;
            },
            (err) => {
                if (err === 'Unauthorized') {
                    this.router.navigateByUrl('/login');
                }
            }
        )
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


    addRecongnition() {

        this.dataService.postRecognitions(this.mynominationText, this.userdata._id, this.selectedUsers).subscribe(
            result => {
                if (result.data === true) {
                    this.getRecognitions();
                    this.mynominationText = "";
                    this.selectedUsers = new Array();
                } else {
                    this.error = "Login failed";
                }
            }
        )
    }





}