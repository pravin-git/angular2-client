import { Component, OnDestroy } from '@angular/core';
import { LoginEventService } from './shared/loginEvent.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
    selector: 'app-component',
    template: `
  <header class="navbar navbar-inner navbar-fixed-top">
    <nav class="container">
        <div class="navbar-header">
            <a routerLink="recognition">
            <span class="app-title">Labs Recognition System</span>
            </a>
        </div>
        <ul class="nav navbar-nav pull-right" *ngIf="isUserloggedIn">
            <li class="nav-item"><a class="nav-link" routerLink="feature">Home</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="home">About</a></li>
            <li class="nav-item"><a class="nav-link" (click)=logout()>Logout</a></li>
        </ul>
    </nav>
</header>

<main class="container">
  <router-outlet></router-outlet>
</main>

<footer>
    <div class="navbar navbar-fixed-bottom">
        <div class="navbar-inner footer">
            <div class="container">
                <footer>
                    @Labs Recognition System
                </footer>
            </div>
        </div>
    </div>
</footer>`
})
export class AppComponent implements OnDestroy {

    private isUserloggedIn: boolean;
    subscription: Subscription;

    constructor(
        private loginService: LoginEventService,
        private router: Router, ) {
            console.log('in app component constructor');
            this.toggleNavbarItems();
            this.subscription = this.loginService.onLoginEvent.subscribe(item => this.isUserloggedIn = item);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    toggleNavbarItems() {
        var usercontext = localStorage.getItem('usercontext');
        this.isUserloggedIn = usercontext != null;
    }

    logout() {
        console.log('logout called');
        localStorage.removeItem('token');
        localStorage.removeItem('usercontext');
        this.isUserloggedIn = false;
        this.router.navigateByUrl('/login');
    }

}