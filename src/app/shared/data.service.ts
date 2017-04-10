import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    constructor(private http: Http, private options: RequestOptions) { }

    getProjectName() {
        return 'Angular 2 Bare Bones';
    }

    getMatches() {
        var token = localStorage.getItem('token');
        this.options.headers.set('token', token);
        return this.http.get('http://localhost:9000/secure/match', this.options)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }


    postRecognitions(myblog: string, _id: string, users:string[]) {

        var data = { recognition: myblog, id: _id, users: users };
        console.log("data is " + data);
        return this.http.post('http://localhost:9000/recognition/add', data).map(res => res.json());
    }

    getRecognitions() {
        var token = localStorage.getItem('token');
        this.options.headers.set('token', token);
        // console.log(token);
        return this.http.get('http://localhost:9000/secure/recognition', this.options)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }

    getUsers() {
        var token = localStorage.getItem('token');
        this.options.headers.set('token', token);
        // console.log(token);
        return this.http.get('http://localhost:9000/secure/user', this.options)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }


    getComments(recognitionId: string) {
        var token = localStorage.getItem('token');
        this.options.headers.set('token', token);
        // console.log(recognitionId);
        return this.http.get('http://localhost:9000/secure/getcomment/' + recognitionId, this.options)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }



    postComments(commentOnPost: string, _id: string, recognitionId: string) {
        var data = { comment: commentOnPost, userId: _id, recognitionId: recognitionId };
        return this.http.post('http://localhost:9000/comment/add', data)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }




    getCommentCount(recognitionId: string) {
        var token = localStorage.getItem('token');
        this.options.headers.set('token', token);
        return this.http.get('http://localhost:9000/secure/comment/count/' + recognitionId, this.options)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }

    postLikeCount(_id: string, recognitionId: string) {
        var data = { userId: _id, recognitionId: recognitionId };
        //console.log(data);
        return this.http.post('http://localhost:9000/like/add', data)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }



    getLikeCount(recognitionId: string) {
        var token = localStorage.getItem('token');
        this.options.headers.set('token', token);
        return this.http.get('http://localhost:9000/secure/like/count/' + recognitionId, this.options)
            .map(res => res.json())
            .catch(e => {
                if (e.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }
    authenticate(username: string, password: string) {
        var data = { username: username, password: password }
        return this.http.post('http://localhost:9000/user/authenticate', data, {}).map(res => res.json());
    }

    register(username: string, password: string, email: string) {
        var data = { username: username, password: password, email: email };
        return this.http.post('http://localhost:9000/user/register', data).map(res => res.json());
    }

}