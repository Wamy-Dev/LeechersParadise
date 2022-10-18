import { Builder, By, Key, until } from "selenium-webdriver";


export async function generateLinks(downloadLink) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(downloadLink);
    await driver.findElement(By.className("login-open1")).click();
    await driver.findElement(By.id("LoginForm_email")).sendKeys("cocothehog@protonmail.com");
    await driver.findElement(By.id("LoginForm_password")).sendKeys("qN%se*DR-Pe2@BT");
    await driver.findElement(By.className("btn send-message")).click();
    const premiumLink = await driver.getCurrentUrl();
    return premiumLink;
  } finally {
    await driver.quit();
  }
}
