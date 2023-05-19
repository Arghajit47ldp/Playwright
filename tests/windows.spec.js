import { test, expect } from "@playwright/test";

test("new tab accessing", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://automationpanda.com/bdd/");

  const [newtab] = await Promise.all([
    context.waitForEvent("page"), //listener
    page.locator('a[href="https://cucumber.io/"]').click(), //event on the promise page
  ]);

  console.log(await newtab.title()); //child tab
  console.log(await page.title()); //parent tab
});
