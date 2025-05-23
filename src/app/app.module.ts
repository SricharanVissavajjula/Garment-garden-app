import { APP_INITIALIZER, ApplicationRef, NgModule, NgModuleRef, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { FreshVegComponent } from './fresh-veg/fresh-veg.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FreshFruitsComponent } from './fresh-fruits/fresh-fruits.component';
import { LeafyGreensComponent } from './leafy-greens/leafy-greens.component';
import { SpicesComponent } from './spices/spices.component';
import { GrainsComponent } from './grains/grains.component';
import { Store, StoreModule } from '@ngrx/store';
import { CartpageComponent } from './cartpage/cartpage.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { cartReducer } from './store/vegCart.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatRadioModule} from '@angular/material/radio';
//import { CartEffects } from './store/vegCart.effects';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { TestComponent } from './test/test.component';

export function initializeApp(store: Store<any>) {
  return () => {
    store.dispatch({ type: 'LOAD_CART_ACTION' }); // Dispatch the action here
  };
 }

@NgModule({
  declarations: [
    AppComponent,
    FreshVegComponent,
    FreshFruitsComponent,
    LeafyGreensComponent,
    SpicesComponent,
    GrainsComponent,
    CartpageComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatSidenavModule,
    MatSelectModule,
    //EffectsModule.forRoot([CartEffects]),
    ReactiveFormsModule,
    StoreModule.forRoot({ cart: cartReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    SweetAlert2Module,
    ToastrModule.forRoot()
    ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Store],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
