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
  sharedKey: string;
  sharedMoveKey: string;
  constructor(private db: AngularFireDatabase) {
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

  getSharedBoxDetails(sharedKey, key) {
    this.dataRef = this.db.list<Box>('shared/' + sharedKey + '/' + key + '/box');
    this.sharedMoveKey = key;
    this.sharedKey = sharedKey;
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

  createSharedBox() {
    return this.db.database.ref('shared/').child(this.sharedKey).child(this.sharedMoveKey).child('Box').push().key
    // return this.db.database.ref('shared/' + this.sharedKey + '/' + this.sharedMoveKey + '/box/').push().key
  }

  updateBox(key, tempBox: Box) {
    this.dataRef.update(key, tempBox);
  }

  // updateSharedBox(key, tempBox: Box) {
  //   this.dataRef.update(key, tempBox);
  // }

  addBoxToDB(key, tempBox: Box) {
    this.db.database.ref(this.uid + '/move/' + this.moveKey + '/box').child(key).set(tempBox);
  }

  addSharedBoxToDB(key, tempBox: Box) {
    this.db.database.ref('shared/' + this.sharedKey + '/' + this.sharedMoveKey + '/box').child(key).set(tempBox);
  }

  removeBox(key) {
    this.dataRef.remove(key);
  }

  getMoveKey() {
    return this.moveKey;
  }

  getSharedMoveKey() {
    return this.sharedMoveKey;
  }

}
