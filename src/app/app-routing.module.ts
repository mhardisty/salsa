import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ConversationComponent } from './conversation/conversation.component';
import { KeyCreatorComponent } from './key-creator/key-creator.component';
import { KeyImporterComponent } from './key-importer/key-importer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ShowQrComponent } from './show-qr/show-qr.component';
import { SocialComponent } from './social/social.component';
import { TosJokeComponent } from './tos-joke/tos-joke.component';
import { TransfersComponent } from './transfers/transfers.component';
import { UsernameFormComponent } from './username-form/username-form.component';
import { UsernamePayComponent } from './username-pay/username-pay.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  { path: '', component: NavBarComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'username-form',
    component: UsernameFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'key-creator',
    component: KeyCreatorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'key-importer',
    component: KeyImporterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transfers',
    component: TransfersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'social',
    component: SocialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tos',
    component: TosJokeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'scan',
    component: QrScannerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'display-QR',
    component: ShowQrComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'username-pay',
    component: UsernamePayComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tx',
    component: ConversationComponent,
    canActivate: [AuthGuard],
    children: [{ path: '**', component: ConversationComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
