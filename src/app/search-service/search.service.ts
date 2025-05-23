import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Products } from '../store/vegCart.state';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchText$ = new BehaviorSubject<string>('');
  searchText$ = this._searchText$.asObservable();

  private _allProducts$ = new BehaviorSubject<Products[]>([]);
  allProducts$ = this._allProducts$.asObservable();

  private _vegCat$ = new BehaviorSubject<string>('');
  vegCat$ = this._vegCat$.asObservable();
  
  private _leafyCat$ = new BehaviorSubject<string>('');
  leafyCat$ = this._leafyCat$.asObservable();

  private _fruitCat$ = new BehaviorSubject<string>('');
  fruitCat$ = this._fruitCat$.asObservable();

  private _grainsCat$ = new BehaviorSubject<string>('');
  grainstCat$ = this._grainsCat$.asObservable();

  private _spiceCat$ = new BehaviorSubject<string>('');
  spiceCat$ = this._spiceCat$.asObservable();



  constructor() {}

  setSearchText(searchText: string) {
    this._searchText$.next(searchText)
  }

  setAllProducts(products: Products[]) {
    this._allProducts$.next(products);
  }

  setVegCat(freshVegCat : string){
    this._vegCat$.next(freshVegCat)
  }

  setFruitCat(freshfruitCat : string){
    this._fruitCat$.next(freshfruitCat)
  }

  setLeafyCat(freshfruitCat : string){
    this._leafyCat$.next(freshfruitCat)
  }

  setGrainsCat(freshfruitCat : string){
    this._grainsCat$.next(freshfruitCat)
  }

  setSpicesCat(freshfruitCat : string){
    this._spiceCat$.next(freshfruitCat)
  }


}
