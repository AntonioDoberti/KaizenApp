import { $ } from '@wdio/globals';
import Page from './page';

class HomeScreen extends Page {
  public get addHabitTab() { return $('//*[@text="Agregar"]'); }
  public get homeTab() { return $('//*[@text="Inicio"]'); }
  public get ikigaiTab() { return $('//*[@text="Ikigai"]'); }
  public get progressTab() { return $('//*[@text="Progreso"]'); }
  public get accountTab() { return $('//*[@text="Perfil"]'); }

  async openAddHabit() {
    await this.addHabitTab.click();
  }
  async openIkigai() { await this.ikigaiTab.click(); }
  async openProgress() { await this.progressTab.click(); }
  async openAccount() { await this.accountTab.click(); }
}

export default new HomeScreen();
