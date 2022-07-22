import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const options={
  headers: new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:HttpClient) { }
  login(user_id:any,user_password:any){
    const data=({
      user_id,user_password
    })
    return this.http.post('http://localhost:3001/login',data)
  }
  register(user_name:any,user_id:any,user_password:any){
    const data=({
      user_name,user_id,user_password
    })
    return this.http.post('http://localhost:3001/register',data)
  }
  addevent(user_id:any,rem_date:any,rem_desc:any){
    const data=({
        user_id,rem_date,rem_desc
    })
    
    return this.http.post('http://localhost:3001/addevent',data,this.getOptions())
  }
  events(user_id:any){    
    const data=({
      user_id
    })
    return this.http.post('http://localhost:3001/events',data,this.getOptions())
  }
  deleteEvent(user_id:any,index:any){
    const data=({
      user_id,index
    })
    return this.http.post('http://localhost:3001/deleteEvent',data,this.getOptions())
  }
  deleteAcc(user_id:any){
    return this.http.delete('http://localhost:3001/deleteAccount/'+user_id,this.getOptions())
  }
  updatevent(user_id:any,index:any,event_id:any,rem_date:any,rem_desc:any){
    
    const data=({
      user_id,index,event_id,rem_date,rem_desc
    })
    return this.http.post('http://localhost:3001/updateEvent',data,this.getOptions())
  }
  // chooseDate(user_id:any,event_date:any){
  //   // const data=({
  //   //   user_id,event_date
  //   // })
  //   return this.http.get('http://localhost:3001/chooseDate'+event_date,this.getOptions())

  // }
  getOptions(){
    const token=localStorage.getItem("token")
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('token',token)
      options.headers=headers
    }
    return options
  }
}
