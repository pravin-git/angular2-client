import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    
    projectName: string;
    username:string;
    password:string;
    error:string;

    constructor(
        private router: Router,
        private dataService: DataService) { }

    ngOnInit() { 
        this.projectName = this.dataService.getProjectName();
    }

    login(){
        this.dataService.authenticate(this.username, this.password)
        .subscribe(
            result => {
                if(result.data === true){
                   // console.log(result.token);
                    localStorage.setItem('token', result.token);
                    console.log(result.usercontext);
                    localStorage.setItem('usercontext', JSON.stringify(result.usercontext));
                    this.router.navigate(['recognition']);
                }else{
                    this.error = "Login failed";
                }
            }
              
        )
   }

}