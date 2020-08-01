import { Injectable } from '@angular/core';
import { Move } from "../models/move/move.model";
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { NavigationExtras } from '@angular/router';
import { SharedMove } from '../models/shared-move/shared-move.model';

@Injectable({
  providedIn: 'root'
})
export class MoveDetailsService {
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

  populateSharedMove(sharedMove: SharedMove, sharedKey: String) {
    let navigationExtras : NavigationExtras = {
      state: {
        sharedMove: sharedMove,
        sharedKey: sharedKey
      }
    }

    return navigationExtras;
  }
}
