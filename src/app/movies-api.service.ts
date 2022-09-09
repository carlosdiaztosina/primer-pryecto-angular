import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable, range, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  pipe(arg0: MonoTypeOperatorFunction<unknown>) {
    throw new Error('Method not implemented.');
  }
  path ="";
  apiKey="api_key=f160e6dfe95f15b5bf585afa806632f9";
  rootURL = 'https://api.themoviedb.org/3';
  
  constructor(private http: HttpClient, private route: Router) { }


  getMovies():Observable<any>{
    this.path = this.rootURL + "/discover/movie" ;
    return this.http.get(`${this.path}?${this.apiKey}`);
  }

  getMoviesPag(page:any):Observable<any>{
    this.path = this.rootURL + "/discover/movie" ;
    return this.http.get(`${this.path}?${this.apiKey}` + "&page=" + page);
  }

  getMovieDeteils(id:any):Observable<any>{
    this.path = this.rootURL + "/movie/" + id ;
    return this.http.get(`${this.path}?${this.apiKey}`);
  }

  getMoviesSearch(title:string): Observable<any>{
    this.path = this.rootURL + "/search/movie?query=" + title ;
    return this.http.get( `${this.path}&${this.apiKey}`);
  }

  getMoviesSearchPage(page:any,title:string):Observable<any> {
      this.path = this.rootURL + "/search/movie?query=" + title ;
      return this.http.get(`${this.path}&${this.apiKey}` + "&page=" + page);
    }

    getToken():Observable<any>{
      this.path = this.rootURL + "/authentication/token/new" ;
      return this.http.get(`${this.path}?${this.apiKey}`);
    }

    getLogin(user:any,token:any): Observable<any> {
      this.path = this.rootURL + "/authentication/token/validate_with_login?" + this.apiKey;
      return this.http.post(this.path,{username:user.name,password:user.password,request_token:token});
    }

    getSessionId(tokenValidate:any): Observable<any>{
      this.path = this.rootURL + "/authentication/session/new?" + this.apiKey;
      return this.http.post(this.path,{request_token:tokenValidate});
    }

    setLogout(){
      sessionStorage.removeItem('sessionId');
    }

    getUser(session_id:any):Observable<any>{
      this.path = this.rootURL + "/account?" + this.apiKey + "&session_id=" + session_id;
      return this.http.get(this.path);
    }

    setRate(){
      this.path = this.rootURL + "/movie/"+ "id_movie"+"/rating?" + this.apiKey + "&session_id=" + "session_id";
      return this.http.post(this.path,{value:"rate_value"});
    }
  }
