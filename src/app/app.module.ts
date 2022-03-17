import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../environments/environment';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WalletComponent } from './wallet/wallet.component';
import { SocialComponent } from './social/social.component';
import { FormsModule } from '@angular/forms';
import { TransfersComponent } from './transfers/transfers.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { KeyCreatorComponent } from './key-creator/key-creator.component';
import { MatInputModule } from '@angular/material/input';
import { KeyImporterComponent } from './key-importer/key-importer.component';
import { UsernameFormComponent } from './username-form/username-form.component';
import { GotoLoginComponent } from './goto-login/goto-login.component';
import { TosJokeComponent } from './tos-joke/tos-joke.component';
import { SolanaPayProcessorComponent } from './solana-pay-processor/solana-pay-processor.component';
import { SelectAndPayComponent } from './select-and-pay/select-and-pay.component';
import { ShowQrComponent } from './show-qr/show-qr.component';
import { FindFriendComponent } from './find-friend/find-friend.component';
import { UsernamePayComponent } from './username-pay/username-pay.component';
import { ConversationComponent } from './conversation/conversation.component';
import { BackButtonComponent } from './back-button/back-button.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      scopes: ['public_profile', 'email'],
      // customParameters: {
      //   auth_type: 'reauthenticate',
      // },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  tosUrl: '/tos',
  privacyPolicyUrl: '/tos',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

@NgModule({
  declarations: [
    AppComponent,
    QrScannerComponent,
    NavBarComponent,
    WalletComponent,
    SocialComponent,
    TransfersComponent,
    LoginPageComponent,
    LogoutButtonComponent,
    KeyCreatorComponent,
    KeyImporterComponent,
    UsernameFormComponent,
    GotoLoginComponent,
    TosJokeComponent,
    SolanaPayProcessorComponent,
    SelectAndPayComponent,
    ShowQrComponent,
    FindFriendComponent,
    UsernamePayComponent,
    ConversationComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    ClipboardModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  providers: [
    // {
    //   provide: USE_AUTH_EMULATOR,
    //   useValue: !environment.production ? ['http://localhost:9099'] : undefined,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
