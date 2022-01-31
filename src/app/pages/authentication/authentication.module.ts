import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';
import { AuthvalidateCodeComponent } from './auth-validate-code/auth-validate-code.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RecaptchaV3Module, RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { NextConfig } from '../../shared/config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthOpcionCodeComponent } from './auth-opcion-code/auth-opcion-code.component';
import { CustomPipeModule } from 'src/app/shared/pipe/custom-pipe.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CodeInputModule } from 'angular-code-input';
import { AuthChangePasswordComponent } from './auth-change-password/auth-change-password.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffectsArray } from './store/effects/index';

@NgModule({
  declarations: [
    AuthSigninComponent,
    AuthResetPasswordComponent,
    AuthvalidateCodeComponent,
    AuthSignupComponent,
    AuthOpcionCodeComponent,
    AuthChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    EffectsModule.forFeature(AuthEffectsArray),
    MaterialModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    CustomPipeModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false,
      code: 'abcdef'
    }),
  ],
  providers: [

    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: "es", // use French language
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: NextConfig.config.apiRecapchav2
      } as RecaptchaSettings
    }
  ],
})
export class AuthenticationModule { }
