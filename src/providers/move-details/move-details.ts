import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Move } from '../../models/new-move/new-move.model';
import { AngularFireDatabase, AngularFireList } from '../../../node_modules/angularfire2/database';
import { Observable } from '../../../node_modules/rxjs/Rx';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable()
export class MoveDetailsProvider {
  move: Observable<Move[]>;
  dataRef: AngularFireList<Move>;
  constructor(public http: HttpClient,
    private db: AngularFireDatabase) {
  }

  initializeUser(userid) {
    this.dataRef = this.db.list<Move>(userid + '/move');
    this.move = this.dataRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  updateMove(key, data) {
    this.dataRef.update(key, data);
  }

  getMove() {
    return this.move;
  }

  addMove(move: Move) {
    this.dataRef.push(move);
  }

  removeMove(key: string) {
    this.dataRef.remove(key);
  }

}
