import { Component, OnInit } from '@angular/core';
import { SharedMove } from 'src/app/models/shared-move/shared-move.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { SharedMoveDetailsService } from 'src/app/service/shared-move-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-shared-move',
  templateUrl: './new-shared-move.page.html',
  styleUrls: ['./new-shared-move.page.scss'],
})
export class NewSharedMovePage implements OnInit {

  private sharedMove: SharedMove = { name: undefined, date: undefined, emails: [], admin: undefined };
  private isAdmin: boolean = true;
  private sharedKey: string;
  form: FormGroup;
  constructor(
    private modalController: ModalController,
    private _FB: FormBuilder,
    private sharedMoveDetails: SharedMoveDetailsService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this._FB.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      date: ['', Validators.compose([Validators.required])],
      emails: this._FB.array([
        this.initContentFields()
      ])
    });
    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.sharedMove != undefined) {
        this.sharedMove = this.router.getCurrentNavigation().extras.state.sharedMove;
        this.isAdmin = this.router.getCurrentNavigation().extras.state.isAdmin;
        this.sharedKey = this.router.getCurrentNavigation().extras.state.sharedKey;
        this.form.controls.name.patchValue(this.sharedMove.name);
      this.sharedMove.date = new Date(this.sharedMove.date).toISOString().substring(0, 10);
      this.form.controls.date.patchValue(this.sharedMove.date);
      this.sharedMove.emails.forEach(email => {
        this.addValuesToInputField(email);
      });
      this.removeInputField(0);
      }
    });
  }

  closeModal() {
    this.modalController.dismiss({ edited: false });
  }

  initContentFields(): FormGroup {
    return this._FB.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  addContentToFields(email): FormGroup {
    return this._FB.group({
      email: [email, Validators.compose([Validators.required, Validators.email])],
    });
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.emails;
    control.removeAt(i);
  }

  checkUniqueEmail(control) {
    let uniqueValues = []
    for (var i = 0; i < control.value.length; i++) {
      if (control.value[i].email != '') {
        if (uniqueValues.indexOf(control.value[i].email) == -1) {
          uniqueValues.push(control.value[i].email);
        } else {
          control.removeAt(i);
        }
      }
    }
    return uniqueValues;
  }

  addNewInputField(): void {
    const control = <FormArray>this.form.controls.emails;
    control.push(this.initContentFields());
    this.checkUniqueEmail(control);
  }

  addValuesToInputField(email): void {
    const control = <FormArray>this.form.controls.emails;
    control.push(this.addContentToFields(email));
  }

  addNewSharedMove(sharedMove: SharedMove) {
    const control = <FormArray>this.form.controls.emails;
    sharedMove.emails = this.checkUniqueEmail(control);
    if (this.isAdmin) {
      if (this.router.getCurrentNavigation().extras.state.isAdmin != undefined) {
        var removedEmails = []
        var addedEmails = []
        this.sharedMove.emails.forEach(email => {
          if (sharedMove.emails.indexOf(email) == -1) {
            removedEmails.push(email);
          }
        });
        sharedMove.emails.forEach(email => {
          if (this.sharedMove.emails.indexOf(email) == -1) {
            addedEmails.push(email);
          }
        });
        this.sharedMoveDetails.updateSharedMove(this.sharedKey, this.sharedMove.$key, removedEmails, addedEmails, sharedMove);
        this.modalController.dismiss({ edited: true });
      }
      else {
        const sharedKey = this.sharedMoveDetails.createSharedMove();
        this.sharedMoveDetails.addMoveToDB(sharedKey, sharedMove);
        this.closeModal();
      }
    }
    else {
      this.sharedMoveDetails.updateSharedMoveOnly(this.sharedKey, this.sharedMove.$key, sharedMove);
      this.modalController.dismiss({ edited: true });
    }

  }

  ngOnInit() {
  }

}
