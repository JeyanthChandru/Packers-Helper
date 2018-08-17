import { Injectable } from '@angular/core';
import { Move } from '../../models/new-move/new-move.model';
import { AngularFireDatabase, AngularFireList } from '../../../node_modules/angularfire2/database';
import { Observable } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable()
export class MoveDetailsProvider {
  move: Observable<Move[]>;
  dataRef: AngularFireList<Move>;
  constructor(private db: AngularFireDatabase) {
  }

  getMoveDetails(userid) {
    this.dataRef = this.db.list<Move>(userid + '/move');
    this.move = this.dataRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      )
    );
    return this.move;
  }

  updateMove(key, data) {
    this.dataRef.update(key, data);
  }

  addMove(move: Move) {
    this.dataRef.push(move);
  }

  removeMove(key: string) {
    this.dataRef.remove(key);
  }

}
