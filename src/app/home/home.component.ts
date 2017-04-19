import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { LoginEventService } from '../shared/loginEvent.service';
import { TagInputModule } from 'ng2-tag-input';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    mynominationText: string;
    error: string;
    userdata: any;
    users: any[];
    selectedUsers = new Array();

    @ViewChild('child') childComponent: ElementRef;
   

    constructor(
        private router: Router,
        private dataService: DataService,
        private loginService: LoginEventService) { 
            this.setUsersFromStorage();
        }

    ngOnInit() {
        this.loginService.changeNav(true);
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

    setUsersFromStorage() {
        var users = localStorage.getItem('usercontext');
        this.userdata = JSON.parse(users);
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

    addRecongnition() {

        this.dataService.postRecognitions(this.mynominationText, this.userdata._id, this.selectedUsers).subscribe(
            result => {
                if (result.data === true) {
                    this.childComponent.getRecognitions(); 
                    //this.getRecognitions();
                    this.mynominationText = "";
                    this.selectedUsers = new Array();
                } else {
                    this.error = "Error in Saving nomination";
                }
            }
        )
    }

    logout() {
        //console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
        //console.log(localStorage.getItem('token'));
        this.router.navigate(['login']);
    }

}