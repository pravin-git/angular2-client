import { Component, OnInit } from '@angular/core';
import { TagInputModule  } from 'ng2-tag-input';


@Component({
    moduleId: module.id,
    selector: 'ng2',
    templateUrl: 'ng2tag.component.html'
})
export class Ng2TagComponent implements OnInit {

    items = ['Pizza', 'Pasta', 'Parmesan'];

    ngOnInit(): void {
        
    }


}
