import { ViewChild, ElementRef, AfterViewInit, Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'feature',
    templateUrl: 'feature.component.html'
})
export class FeatureComponent implements OnInit, AfterViewInit {

    @ViewChild('input') input: ElementRef;

    

    private countries = [
        { id: 1, name: "United States" },
        { id: 2, name: "Australia" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Brazil" },
        { id: 5, name: "England" }
    ];
    private selectedValue: null;

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit');
        jQuery(this.input.nativeElement).tokenize2({
            datas: this.countries
        });
    }

    constructor() { console.log('constructor'); }

    ngOnInit() {
        console.log('ngOnInit');
    }

    getTokens() {
        console.log(jQuery(this.input.nativeElement).tokenize2().toArray());
    }

}