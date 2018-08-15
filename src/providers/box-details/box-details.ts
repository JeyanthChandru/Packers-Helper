import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box } from '../../models/box-model/box.model';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';


@Injectable()
export class BoxDetailsProvider {
  items: Observable<any[]>
  // dataRef: any;
  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    this.items = this.db.list('box').valueChanges();
  }

  getBoxDetails(key) {
    // this.dataRef = this.db.database.ref('move/' + key).child('box')
    return this.items;
  }

  addBoxToDB(tempBox: Box) {
    this.db.list('/box').push(tempBox);
  }

}
