import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box } from '../../models/box-model/box.model';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireDatabase, AngularFireList } from '../../../node_modules/angularfire2/database';
import { map } from '../../../node_modules/rxjs/operators';


@Injectable()
export class BoxDetailsProvider {
  box: Observable<Box[]>
  dataRef: AngularFireList<Box>;
  constructor(public http: HttpClient, private db: AngularFireDatabase) {
  }

  getBoxDetails(key) {
    this.dataRef = this.db.list<Box>('/move/' + key + '/box');
    this.box = this.dataRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.box;
  }

  addBoxToDB(tempBox: Box) {
    this.dataRef.push(tempBox);
  }

  removeBox(key) {
    this.dataRef.remove(key);
  }

}
