import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {
  user_id=localStorage.getItem("currentUserId")
  constructor(private router:Router,private fb:FormBuilder,private ds:DataService) { }

  ngOnInit(): void {
  }
  deleteForm=this.fb.group({
    user_id:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
  logout(){
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }
  deleteAcc(){
    var del_userid=this.deleteForm.value.user_id
    if(this.deleteForm.valid){
      if(del_userid==this.user_id){
        this.ds.deleteAcc(this.user_id).subscribe((result:any)=>{
          if(result){
            alert(result.message)
            this.logout()
          }
        },result=>alert(result.error.message))
      }else{
        alert("Invalid user Id")
      }
    }else{
      alert("Invalid form")
    }
  }
}
