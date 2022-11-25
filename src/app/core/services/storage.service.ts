import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private keyToken:string = "token";

  

  constructor() {
   }

  setToken(token: string):void{
    localStorage.setItem(this.keyToken, token);
  }

  getToken():string{
    return JSON.parse(localStorage.getItem(this.keyToken) || '');
  }

  setPage(pageData:string, page:number):void{
    switch ( pageData ) {
      case 'parent':
        localStorage.setItem('pageParent',page.toString())
        break;
      case 'teacher':
        localStorage.setItem('pageTeacher',page.toString())
          break;
      case 'student':
        localStorage.setItem('pageStudent',page.toString())
          break;
      case 'course':
        localStorage.setItem('pageCourse',page.toString())
          break;
      case 'period':
        localStorage.setItem('pagePeriod',page.toString())
          break;
      case 'grade':
        localStorage.setItem('pageGrade',page.toString())
          break;
   }
  }

}
