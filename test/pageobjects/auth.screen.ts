import { $, browser } from '@wdio/globals';
import Page from './page';

class AuthScreen extends Page {
  public get emailInput() { return $('//*[@placeholder="Correo electrónico"]'); }
  public get passwordInput() { return $('//*[@placeholder="Contraseña"]'); }
  public get loginButton() { return $('//*[@text="Ingresar"]'); }
  public get signUpLink() { return $('//*[@text="Crear Cuenta"]'); }

  async login(email: string, password: string) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async goToSignUp() {
    await this.signUpLink.click();
  }
}

export default new AuthScreen();
