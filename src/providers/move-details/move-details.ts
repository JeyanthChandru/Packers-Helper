import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Move } from '../../models/new-move/new-move.model';

@Injectable()
export class MoveDetailsProvider {
  move: Move[] = [];
  constructor(public http: HttpClient) {
    this.move.push({ name: 'Houston to Dallas', date: 'Aug 31, 2018' });
    this.move.push({ name: 'Austin to India', date: 'Sep 28, 2018'});
  }

  getMove() {
    return this.move
  }

}
