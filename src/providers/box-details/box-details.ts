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
  moveKey: string;
  uid: string;
  constructor(public http: HttpClient, private db: AngularFireDatabase) {
  }

  getBoxDetails(uid, key) {
    this.dataRef = this.db.list<Box>(uid + '/move/' + key + '/box');
    this.moveKey = key;
    this.uid = uid;
    this.box = this.dataRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.box;
  }

  createBox() {
    return this.db.database.ref(this.uid + '/move/' + this.moveKey + '/box').push().key
  }

  updateBox(key, tempBox: Box) {
    this.dataRef.update(key, tempBox)
  }

  addBoxToDB(key, tempBox: Box) {
    this.db.database.ref(this.uid + '/move/' + this.moveKey + '/box').child(key).set(tempBox);
  }

  removeBox(key) {
    this.dataRef.remove(key);
  }

  getMoveKey() {
    return this.moveKey;
  }

}
