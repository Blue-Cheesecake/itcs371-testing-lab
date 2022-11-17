// 6388004, 6388073
const puppeteer = require("puppeteer");

describe("Test: System Testing.", () => {
  test("Test: Getting student by ID 4 through user interface", async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: ["--window-size=1920,1080"],
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    const page = await browser.newPage();

    await page.goto("http://127.0.0.1:3100/");
    await page.click("input#STU_ID");
    await page.type("input#STU_ID", "4");

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    // 6388004, 6388073
    await page.click("input#select");

    const studentObject = await page.evaluate(() => {
      return {
        firstName: document.getElementById("STU_FNAME").value,
        lastName: document.getElementById("STU_LNAME").value,
        age: document.getElementById("STU_AGE").value,
      };
    });

    const expected = {
      firstName: "Benjamin",
      lastName: "Duncan",
      age: "25",
    };
    expect(expected).toEqual(studentObject);
  }, 20000);
});
