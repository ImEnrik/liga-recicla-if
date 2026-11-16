import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { firebaseConfig } from './firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);

  cadastrar(email: string, senha: string) {
    return createUserWithEmailAndPassword(this.auth, email, senha);
  }

  entrar(email: string, senha: string) {
    return signInWithEmailAndPassword(this.auth, email, senha);
  }

  entrarComGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  sair() {
    return signOut(this.auth);
  }

  get usuario() {
    return this.auth.currentUser;
  }
}