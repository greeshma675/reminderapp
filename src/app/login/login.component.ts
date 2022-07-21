import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private ds:DataService,private route:Router) { }
  loginForm=this.fb.group({
    user_id:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    user_password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
  ngOnInit(): void {
  }
  login(){
    var user_id=this.loginForm.value.user_id
    var user_password=this.loginForm.value.user_password
    if(this.loginForm.valid){
      this.ds.login(user_id,user_password).subscribe((result:any)=>{
        if(result){
          localStorage.setItem("currentUser",result.currentUser)
          localStorage.setItem("currentUserId",result.currentUserid)
          localStorage.setItem("token",result.token)
          alert(result.message)
          this.route.navigateByUrl('home')
        }
      },result=>alert(result.error.message))
    }else{
      alert("Invalid form")
    }
  }
}
