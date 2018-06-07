import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from '@app/map/components';

const routes: Routes = [
  {path: '', component: MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
