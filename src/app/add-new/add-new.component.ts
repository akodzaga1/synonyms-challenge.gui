import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  submitDisabled: boolean = true;
  public form: FormGroup;
  @ViewChild('formChild') formChild: any;

  get insertedWords() { return this.form.get('insertedWords'); }

  @Input() isNew!: boolean;
  @Output() isNewChange = new EventEmitter<boolean>();

  @Input() myCollection!: string[][];
  @Output() myCollectionChange = new EventEmitter<string[][]>();

  constructor(private fb: FormBuilder,
    private snackService: SnackService) {
    this.form = this.fb.group({
      insertedWords: [[], Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    // Initially add two inputs for synonyms
    this.addIW();
    this.addIW();
  }

  // Reset form after submitting
  resetForm() {
    this.formChild.resetForm();
    this.form = this.fb.group({
      insertedWords: [[], Validators.compose([Validators.required])]
    });

    this.addIW();
    this.addIW();
  }

  onSubmit() {
    var iw: Array<string> = new Array<string>();
    var hasInvalid: boolean = false;
    if (this.insertedWords) {
      this.insertedWords.value.forEach((el: any) => {
        if (el.status != "INVALID")
          iw.push(el.controls.word.value);
        else {
          hasInvalid = true;
          return;
        }
      });
      if (!hasInvalid) {
        this.myCollection.push(iw);
        this.snackService.showSnack('Synonyms successfully added!', 'Success', 5000);
        this.resetForm();
      }

    }
  }

  validateForm() {
    var isValid: boolean = true;
    if (this.insertedWords) {
      this.insertedWords.value.forEach((element: any) => {
        if (element.value.word == null || element.value.word == "") {
          this.submitDisabled = true;
          isValid = false;
        }
      });
      if (isValid)
        this.submitDisabled = false;
    }
    else {
      this.submitDisabled = true;
    }
  }

  // Adds input field for synonym insert
  addIW() {
    if (this.insertedWords) {
      this.insertedWords.value.push(this.fb.group({
        word: [null, Validators.compose([Validators.required])]
      }))
      this.submitDisabled = true;
    }

  }

  // Removes input field for synonym insert in respective row
  removeIW(i: number) {
    if (this.insertedWords) {
      this.insertedWords.value.splice(i, 1);
      this.validateForm();
    }

  }

}
