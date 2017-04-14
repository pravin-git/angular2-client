import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'my-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

    constructor(
        private router: Router,
        private dataService: DataService) { }

    ngOnInit() {

    }
}