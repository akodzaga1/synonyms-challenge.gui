import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SynonymsList } from '../models/synonyms-list';
import { RestApiService } from '../services/rest-api.service';
import { SnackService } from '../services/snack.service';
import { PostData } from '../models/post-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public formSearch: FormGroup;
  hasMore: boolean | undefined = false;
  resultList: SynonymsList = { synonyms: [] };
  retrievedList: string[] = [];
  getAll: boolean = false;
  skip: number = 0;
  searchWord: string = "";

  get word() { return this.formSearch.get('word'); }

  @Input() isLoading!: boolean;
  @Output() isLoadingChange = new EventEmitter<boolean>();

  @Input() isSearch!: boolean;
  @Output() isSearchChange = new EventEmitter<boolean>();

  @Input() myCollection!: string[][];
  @Output() myCollectionChange = new EventEmitter<string[][]>();

  constructor(public restApi: RestApiService,
    private fb: FormBuilder,
    private snackService: SnackService) {
    this.formSearch = this.fb.group({
      word: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  onSubmitSearch(obj: string) {
    var word: string = this.word ? this.word.value : "";

    if (obj == "allsynonyms") {
      var postDataAll: PostData = { word: word, myCollection: this.myCollection, retrievedList: this.retrievedList, getAll: this.getAll, skip: this.skip };
      this.isLoadingChange.emit(true);
      this.restApi.getAllSynonyms(postDataAll).subscribe((data: SynonymsList) => {
        this.resultList = data;
        this.skip = this.retrievedList.length
        this.retrievedList = data.synonyms;
        this.isLoadingChange.emit(false);
        this.hasMore = data.hasMore;
        if (data.synonyms.length == 0)
          this.snackService.showSnack('No synonyms for that word', 'Info', 5000);
      }, error => {
        this.snackService.showSnack("Error on retrieving synonyms", 'Error', 5000);
        this.isLoadingChange.emit(false);
      });
    }
    else if (obj == "mysynonyms") {
      var postData: PostData = { word: word, myCollection: this.myCollection };
      this.isLoadingChange.emit(true);
      this.restApi.getMySynonyms(postData).subscribe((data: SynonymsList) => {
        this.resultList = data;
        this.isLoadingChange.emit(false);
        this.hasMore = false;
        if (data.synonyms.length == 0)
          this.snackService.showSnack('No synonyms for that word', 'Info', 5000);
      }, error => {
        this.snackService.showSnack("Error on retrieving synonyms", 'Error', 5000);
        this.isLoadingChange.emit(false);
      });
    }

  }

  resetSearch() {
    this.resultList = { synonyms: [] };
    this.retrievedList = [];
    this.getAll = false;
    this.skip = 0;
    this.searchWord = this.word ? this.word.value : "";
  }

}
