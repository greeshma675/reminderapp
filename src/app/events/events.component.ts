import { Component, OnInit } from '@angular/core';
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
  constructor(private ds:DataService,private router:Router) { 
    this.ds.events(this.user_id).subscribe((result:any)=>{
      if(result){        
        this.event_array=result.event     
        // console.log(this.event_array);  
      }
    },result=>alert(result.error.message))
  }

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
    console.log(event);
    
    this.router.navigate(['home', {my_object: JSON.stringify(event),index:event_array.indexOf(event)}])
  }
}
