import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box } from '../../models/box-model/box.model';


@Injectable()
export class BoxDetailsProvider {
  box: Box[] = []
  constructor(public http: HttpClient) {
    this.box.push({ name: 'Bathroom Items - 1', content: [{ name: 'Tooth Brush', quantity: 2 }, { name: 'Tooth Paste', quantity: 4 }] });
    this.box.push({ name: 'Toys - 1', content: [{ name: 'Cricket Bat', quantity: 1 }, { name: 'Cricket Ball', quantity: 4 }] })
  }

  getBoxDetails(){
    return this.box
  }

}
