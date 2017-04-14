import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'my-footer',
    templateUrl: 'footer.component.html'
})
export class FooterComponent implements OnInit {

    constructor(
        private router: Router,
        private dataService: DataService) { }

    ngOnInit() {

    }
}