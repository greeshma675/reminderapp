import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 event_data:any
 btn_name:any
 event_id:any
 rem_date:any
 rem_desc:any
 index:any
  constructor(private fb:FormBuilder,private ds:DataService,private router:Router,private ar:ActivatedRoute) { 
    console.log(this.ar.snapshot.paramMap.get('my_object'));
    console.log(this.ar.snapshot.paramMap.get('index'));
    if(this.ar.snapshot.paramMap.get('my_object')==null)
    {
      this.btn_name="Add event"
    }
    else{
      this.event_data=JSON.parse(this.ar.snapshot.paramMap.get('my_object')||'')
      this.index=this.ar.snapshot.paramMap.get('index')
      this.btn_name="Update event"
      this.rem_desc=this.event_data.event_desc
      this.rem_date=this.event_data.event_date
      this.event_id=this.event_data.event_id
    }
  //   if(this.event_data===''){
  //     this.btn_name="Add event"
  //     // this.rem_desc=this.event_data.event_desc
  //     // this.rem_date=this.event_data.event_date
  //   }
  //   else{
  //     this.btn_name="Update event"}
  }

  eventForm=this.fb.group({
    rem_date:['',[Validators.required]],
    rem_desc:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
  ngOnInit(): void {
    
    // this.event_data = JSON.parse(this.ar.snapshot.paramMap.get('my_object')||'');

        
    if(!localStorage.getItem("token")){
      alert("Please login")
      this.router.navigateByUrl('')
    }
    
  }
  
  addevent(){
    var rem_date=this.eventForm.value.rem_date
    var rem_desc=this.eventForm.value.rem_desc
   if(this.eventForm.valid){
    var user_id=localStorage.getItem("currentUserId")
    if(this.btn_name=='Add event'){
      this.ds.addevent(user_id,rem_date,rem_desc).subscribe((result:any)=>{
        if(result){
          alert(result.message)
          this.router.navigateByUrl('events')
        }
      },result=>alert(result.error.message))
    }else{
      this.ds.updatevent(user_id,this.index,this.event_id,rem_date,rem_desc).subscribe((result:any)=>{
        if(result){
          alert(result.message)
          this.router.navigateByUrl('events')
        }
      },result=>alert(result.error.message))
    }
   }else{
    alert("Invalid form")
   }
  }
  deleteAcc(){
    this.router.navigateByUrl('delacc')
  }
  logout(){
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }
}
