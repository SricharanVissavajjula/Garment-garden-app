import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  input =  [{
    name : 'apple',
    value : 10
},{
    name : 'orange',
    value : 20
}]

  arr = [];
  l = this.arr.length - 1
  newobj = {};
}
