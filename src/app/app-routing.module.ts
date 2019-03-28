import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';


const routes: Routes = [
  { path: '', component: CompanyComponent, /* canActivate: [AuthGuard] */ },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
