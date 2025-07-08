import { browser, expect } from '@wdio/globals';
import AuthScreen from '../pageobjects/auth.screen';
import SignUpScreen from '../pageobjects/signup.screen';
import HomeScreen from '../pageobjects/home.screen';
import AddHabitModal from '../pageobjects/addHabit.modal';

const APP_URL = 'http://localhost:19006';

describe('KaizenApp flows', () => {
  before(async () => {
    await browser.url(APP_URL);
  });

  it('registers a new user', async () => {
    await AuthScreen.goToSignUp();
    await SignUpScreen.signUp('Test User', 'test@example.com', 'password123');
    await browser.pause(1000);
    await expect(HomeScreen.homeTab).toBeExisting();
  });

  it('logs in with the new user', async () => {
    await browser.reloadSession();
    await browser.url(APP_URL);
    await AuthScreen.login('test@example.com', 'password123');
    await browser.pause(1000);
    await expect(HomeScreen.homeTab).toBeExisting();
  });

  it('navigates across tabs', async () => {
    await HomeScreen.openIkigai();
    await browser.pause(500);
    await HomeScreen.openAddHabit();
    await expect($('//*[@text="Plantillas de hábitos"]')).toBeExisting();
    await HomeScreen.homeTab.click();
    await HomeScreen.openProgress();
    await browser.pause(500);
    await HomeScreen.openAccount();
    await browser.pause(500);
  });

  it('adds a habit', async () => {
    await HomeScreen.openAddHabit();
    const openModal = $('//*[@name="add" or @text="add" or @text="Agregar" or @content-desc="add"]');
    await openModal.click();
    await AddHabitModal.submitHabit('Leer');
    await browser.pause(1000);
    await expect(HomeScreen.homeTab).toBeExisting();
  });
});
