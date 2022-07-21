import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }
  registerForm=this.fb.group({
    user_name:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    user_id:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
    user_password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
  })
  ngOnInit(): void {
  }
  register(){
    var user_id=this.registerForm.value.user_id
    var user_name=this.registerForm.value.user_name
    var user_password=this.registerForm.value.user_password
    if(this.registerForm.valid){
      this.ds.register(user_name,user_id,user_password).subscribe((result:any)=>{
        if(result)
        alert(result.message)
        this.router.navigateByUrl('')
      },result=>alert(result.error.message))
       
        
    }else{
      alert("Invalid form")
    }
  }
}
