import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Move } from '../models/new-move/new-move.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
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

  populateMove(move: Move) {
    let navigationExtras : NavigationExtras = {
      state: {
        move: move
      }
    }

    return navigationExtras;
  }
}
