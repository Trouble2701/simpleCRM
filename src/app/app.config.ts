import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-1b27e","appId":"1:173687221948:web:f34f3fd4ff59e981f26ab9","storageBucket":"simple-crm-1b27e.firebasestorage.app","apiKey":"AIzaSyAP48pAshjZwV_SzkLsYPrg4X99yqMHn4g","authDomain":"simple-crm-1b27e.firebaseapp.com","messagingSenderId":"173687221948"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-1b27e","appId":"1:173687221948:web:f34f3fd4ff59e981f26ab9","storageBucket":"simple-crm-1b27e.firebasestorage.app","apiKey":"AIzaSyAP48pAshjZwV_SzkLsYPrg4X99yqMHn4g","authDomain":"simple-crm-1b27e.firebaseapp.com","messagingSenderId":"173687221948"})), provideFirestore(() => getFirestore())]
};
