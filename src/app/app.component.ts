import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from './services/rest-api.service';
import { PostData } from './models/post-data';
import { SynonymsList } from './models/synonyms-list';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SnackService } from './services/snack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'synonyms-challenge';

  isNew: boolean = false;
  isSearch: boolean = false;
  isLoading: boolean = false;
  submitDisabled: boolean = true;
  public formSearch: FormGroup;
  public form: FormGroup;
  resultList: SynonymsList = { synonyms: [] };
  myCollection: string[][] = [[]];
  hasMore: boolean | undefined = false;

  @ViewChild('formChild') formChild: any;
  retrievedList: string[] = [];
  getAll: boolean = false;
  skip: number = 0;
  searchWord: string = "";

  constructor(public restApi: RestApiService,
    private fb: FormBuilder,
    private snackService: SnackService) {
    this.formSearch = this.fb.group({
      word: [null, Validators.compose([Validators.required])]
    });
    this.form = this.fb.group({
      insertedWords: [[], Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.addIW();
    this.addIW();
  }

  resetForm() {
    this.formChild.resetForm();
    this.form = this.fb.group({
      insertedWords: [[], Validators.compose([Validators.required])]
    });

    this.addIW();
    this.addIW();
  }



  get word() { return this.formSearch.get('word'); }
  get insertedWords() { return this.form.get('insertedWords'); }

  onSubmitSearch(obj: string) {
    var word: string = this.word ? this.word.value : "";
    
    if (obj == "allsynonyms") {
      var postDataAll: PostData = { word: word, myCollection: this.myCollection, retrievedList: this.retrievedList, getAll: this.getAll, skip: this.skip };
      this.isLoading = true;
      this.restApi.getAllSynonyms(postDataAll).subscribe((data: SynonymsList) => {
        this.resultList = data;
        this.skip = this.retrievedList.length
        this.retrievedList = data.synonyms;
        this.isLoading = false;
        this.hasMore = data.hasMore;
        if (data.synonyms.length == 0)
          this.snackService.showSnack('No synonyms for that word', 'Info', 5000);
      }, error => {
        this.snackService.showSnack("Error on retrieving synonyms", 'Error', 5000);
        this.isLoading = false;
      });
    }
    else if (obj == "mysynonyms") {
      var postData: PostData = { word: word, myCollection: this.myCollection };
      this.isLoading = true;
      this.restApi.getMySynonyms(postData).subscribe((data: SynonymsList) => {
        this.resultList = data;
        this.isLoading = false;
        this.hasMore = false;
        if (data.synonyms.length == 0)
          this.snackService.showSnack('No synonyms for that word', 'Info', 5000);
      }, error => {
        this.snackService.showSnack("Error on retrieving synonyms", 'Error', 5000);
        this.isLoading = false;
      });
    }

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

  resetSearch() {
    this.resultList = { synonyms: [] };
    this.retrievedList = [];
    this.getAll = false;
    this.skip = 0;
    this.searchWord = this.word ? this.word.value : "";
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

  addIW() {
    if (this.insertedWords) {
      this.insertedWords.value.push(this.fb.group({
        word: [null, Validators.compose([Validators.required])]
      }))
      this.submitDisabled = true;
    }

  }

  removeIW(i: any) {
    if (this.insertedWords) {
      this.insertedWords.value.splice(i, 1);
      this.validateForm();
    }

  }
}
