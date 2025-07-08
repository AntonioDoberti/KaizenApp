import { $ } from '@wdio/globals';
import Page from './page';

class SignUpScreen extends Page {
  public get fullNameInput() { return $('//*[@placeholder="Nombre completo"]'); }
  public get emailInput() { return $('//*[@placeholder="Correo electrónico"]'); }
  public get passwordInput() { return $('//*[@placeholder="Contraseña"]'); }
  public get registerButton() { return $('//*[@text="Registrarse"]'); }

  async signUp(name: string, email: string, password: string) {
    await this.fullNameInput.setValue(name);
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.registerButton.click();
  }
}

export default new SignUpScreen();
