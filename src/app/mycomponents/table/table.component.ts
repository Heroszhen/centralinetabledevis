import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../myservices/api.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users:Array<object> = [];
  tab1:Array<string> = ["email","cell","gender","nat","phone"];
  tab2:Array<string> = [];
  userindex:number = null;
  userindex_hover:number = null;
  userindex_modify:number = null;
  tab1index:number = null;
  tab2index:number = null;
  constructor(private as:ApiService) {
    this.as.getGetUsers().subscribe((data)=>{
      this.users = data["results"];
    });
   }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tab1, event.previousIndex, event.currentIndex);
  }

  stopPropagation(e:any):void{
    e.stopPropagation();
    e.preventDefault();
  }

  hoverOneUser(key:number=null):void{
    this.userindex_hover = key;
  }

  chooseOneUser(e:any,key:number=null):void{
    this.stopPropagation(e);
    this.userindex = key;
  }

  /**
   * users
   * 1 : up ; 0 : down
   * @param n number
   */
  changePosition(e:any,n:number):void{
    this.stopPropagation(e);
    this.userindex_modify = null;
    if(this.userindex != null){
      //up
      if(n == 1){
        if(this.userindex != 0){
          let nextindex:number = this.userindex - 1;
          let ob:object = this.users[this.userindex];
          this.users[this.userindex] = this.users[nextindex];
          this.users[nextindex] = ob;
          this.userindex = nextindex;
        }
      }
      //down
      if(n == 0){
        if(this.userindex != (this.users.length - 1)){
          let nextindex:number = this.userindex + 1;
          let ob:object = this.users[this.userindex];
          this.users[this.userindex] = this.users[nextindex];
          this.users[nextindex] = ob;
          this.userindex = nextindex;
        }
      }
    }
  }

  //modify one user
  setUserindex_modify(e:any,key:number=null):void{
    this.stopPropagation(e);
    this.userindex_modify = key;
    this.chooseOneUser(e,key);
  }
  setUserindex_modify2():void{
    this.userindex_modify = null;
  }
  insertOneUser(e:any):void{
    this.stopPropagation(e);
    if(this.userindex != null){
      let ob = {
        email:"",
        cell:"",
        gender:"",
        nat:"",
        phone:""
      }
      if(this.userindex == 0){
        this.users.unshift(ob);
        this.userindex_modify = 0;
      }else{
        this.users.splice( this.userindex_modify, 0, ob );
      }
    }
  }


  //modal1
  chooseOneElementOfTabs(e:any,tab:number,key:number){
    this.stopPropagation(e);
    this.tab1index = null;
    this.tab2index = null;
    if(tab == 1)this.tab1index = key;
    if(tab == 2)this.tab2index = key;
  }
  /**
   * 1 : to tab1 ; 2 : to tab2
   * @param n number
   */
  displayTab1(e:any,n:number):void{
    this.stopPropagation(e);
    if(this.tab1index != null || this.tab2index != null){
      //to tab1
      if(n == 1){
        if(this.tab2index != null){
          let elm:string = this.tab2[this.tab2index];
          this.tab1.push(elm);
          this.tab2.splice(this.tab2index,1);
          this.tab2index = null;
        }
      }
      //to tab2
      if(n == 2){
        if(this.tab1index != null){
          let elm:string = this.tab1[this.tab1index];
          this.tab2.push(elm);
          this.tab1.splice(this.tab1index,1);
          this.tab1index = null;
        }
      }
    }
  }

  changePosition2(e:any,n:number):void{
    this.stopPropagation(e);
    if(this.tab1index != null){
      //up
      if(n == 1){
        if(this.tab1index != 0){
          let nextindex:number = this.tab1index - 1;
          let ob:string = this.tab1[this.tab1index];
          this.tab1[this.tab1index ] = this.tab1[nextindex];
          this.tab1[nextindex] = ob;
          this.tab1index  = nextindex;
        }
      }
      //down
      if(n == 0){
        if(this.tab1index != (this.tab1.length - 1)){
          let nextindex:number = this.tab1index + 1;
          let ob:string = this.tab1[this.tab1index];
          this.tab1[this.tab1index ] = this.tab1[nextindex];
          this.tab1[nextindex] = ob;
          this.tab1index  = nextindex;
        }
      }
    }
  }


  
}
