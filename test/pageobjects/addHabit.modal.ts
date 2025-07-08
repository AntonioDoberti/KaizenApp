import { $ } from '@wdio/globals';
import Page from './page';

class AddHabitModal extends Page {
  public get nameInput() { return $('//*[@placeholder="Nombre"]'); }
  public get addButton() { return $('//*[@text="Agregar"]'); }

  async submitHabit(name: string) {
    await this.nameInput.setValue(name);
    await this.addButton.click();
  }
}

export default new AddHabitModal();
