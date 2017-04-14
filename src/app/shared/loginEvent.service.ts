import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginEventService {

  private onUserLogin = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  onLoginEvent = this.onUserLogin.asObservable();
  // service command
  changeNav(isLogin:boolean) {
    this.onUserLogin.next(isLogin);
  }
}