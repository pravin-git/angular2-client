import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    
    projectName: string;
    username:string;
    password:string;
    email:string;
    error:string;

    constructor(
        private router: Router,
        private dataService: DataService) { }

    ngOnInit() { 
        
    }

    register(){
        console.log('inside register');
         this.dataService.register(this.username, this.password, this.email).subscribe(
            result => {
                if(result.data === true){
                    
                    this.router.navigate(['login']);
                }else{
                    this.error = "Login failed";
                }
            }
        )
    }


}