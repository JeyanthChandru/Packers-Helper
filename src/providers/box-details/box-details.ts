import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box } from '../../models/box-model/box.model';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireDatabase, AngularFireList } from '../../../node_modules/angularfire2/database';


@Injectable()
export class BoxDetailsProvider {
  items: Observable<Box[]>
  dataRef: AngularFireList<Box>;
  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    this.items = this.db.list<Box>('box').valueChanges();
  }

  getBoxDetails(key) {
    this.dataRef = this.db.list<Box>('/move/' + key + '/box');
    return this.dataRef.valueChanges();
  }

  addBoxToDB(tempBox: Box) {
    this.dataRef.push(tempBox);
  }

}
