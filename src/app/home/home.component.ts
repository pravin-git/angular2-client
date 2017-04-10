import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    
    projectName: string;
    matches:any;
    userdata:any;

    constructor(
        private router: Router,
        private dataService: DataService) { }

    ngOnInit() { 
        this.dataService.getMatches()
        .subscribe(
            (result) => {
                this.matches = result.data;
            },
            (err) => {
                if (err === 'Unauthorized') { 
                    this.router.navigateByUrl('/login');
                }
            }
        );
        
    }

    logout(){
        //console.log(localStorage.getItem('token'));
        localStorage.removeItem('token');
        //console.log(localStorage.getItem('token'));
        this.router.navigate(['login']);
    }

}