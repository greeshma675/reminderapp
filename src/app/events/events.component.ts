import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  user_id=JSON.parse(localStorage.getItem("currentUserId")||'')  
  event_array:any
  flag:boolean=false
  
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { 
    this.ds.events(this.user_id).subscribe((result:any)=>{
      if(result){        
        this.event_array=result.event    
        if(this.event_array.length>0) 
        this.flag=true
        else
        this.flag=false
        // console.log(this.event_array);  
      }
    },result=>alert(result.error.message))
    
  }
  chooseForm=this.fb.group({
    event_date:['']
  })
  ngOnInit(): void {
  }
  deleteEvent(event:any){   
    this.ds.deleteEvent(this.user_id,event).subscribe((result:any)=>{
      if(result){
        alert(result.message)
        window.location.reload()
      }
    },result=>alert(result.error.message))
  }
  editEvent(event:any,event_array:any){    
    // console.log(event);
    
    this.router.navigate(['home', {my_object: JSON.stringify(event),index:event_array.indexOf(event)}])
  }
  chooseDate(){
    var event_date=this.chooseForm.value.event_date
    // alert(event_date)
    var newarray:any=this.event_array
    this.event_array=[]
    var array_=[]
    for(let i=0;i<newarray.length;i++){
      if(newarray[i].event_date==event_date)
      array_.push(newarray[i])
      this.event_array=array_
      if(this.event_array.length>0)
      this.flag=true
      else
      this.flag=false
    }
      
  //   this.ds.chooseDate(this.user_id,event_date).subscribe((result:any)=>{
  //     if(result){
  //       this.event_array=result.event    
  //               console.log(this.event_array);  

  //     }
  //   },result=>alert(result.error.message))
  }
}
