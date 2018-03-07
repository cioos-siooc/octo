import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './catalog/catalog.component';
import {MapComponent} from './map/map.component';

const routes: Routes = [
  {path: '', component: MapComponent},
  {path: 'catalog', component: CatalogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
