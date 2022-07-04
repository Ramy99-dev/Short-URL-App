import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private _httpClient: HttpClient) { }

  shortLink(longUrl:string):Observable<any>
  {
    return this._httpClient.post('http://localhost:8000/shorten',{"longUrl":longUrl});
  }
  getUrls():Observable<any>
  {
    return this._httpClient.get('http://localhost:8000/urls');
  }

  deleteUrl(id:String)
  {
    return this._httpClient.delete('http://localhost:8000/delete/'+id);
  }

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: any) {
    this.messageSource.next(message)
  }
}
