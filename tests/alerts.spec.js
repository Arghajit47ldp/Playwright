import { test, expect } from "@playwright/test";

test("new Confirm Alert accessing", async ({ page }) => {
  // Create window one object
  await page.goto(
    "https://automatenow.io/sandbox-automation-testing-practice-website/popups/"
  );
  await page.locator("#confirm").click();

  page.on("dialog", (dialog) => {
    dialog.accept(); //click 'ok' button
    expect(page.getByText("OK it is!")).toBeVisible();
  });
  page.on("dialog", (dialog) => {
    dialog.dismiss(); //click 'cancel' button
    expect(page.getByText("Cancel it is!")).toBeVisible();
  });
});

test("new Alret popup accessing", async ({ page }) => {
  await page.goto(
    "https://automatenow.io/sandbox-automation-testing-practice-website/popups/"
  );
  await page.locator("#alert").click();

  page.on("dialog", (dialog) => {
    dialog.accept(); //click 'ok' button
  });
});

test("new Prompt popup accessing", async ({ page }) => {
  await page.goto(
    "https://automatenow.io/sandbox-automation-testing-practice-website/popups/"
  );
  await page.locator("#prompt").click();

  page.on("dialog", (dialog) => {
    dialog.fill("Hello Brother");
    dialog.accept(); //click 'ok' button
    expect(page.locator("#promptResult")).toHaveText(
      "Nice to meet you, Hello Brother!"
    );
  });
});

test("Drag-Drop", async ({ page }) => {
  await page.goto("https://letcode.in/dropable");
  const src = await page.locator("#draggable");
  const dst = await page.locator("#droppable");
  if (src && dst) {
    const srcBound = await src.boundingBox();
    const dstBound = await dst.boundingBox();
    if (srcBound && dstBound) {
      await page.mouse.move(
        srcBound.x + srcBound.width / 2,
        srcBound.y + srcBound.height / 2
      );
      await page.mouse.down();
      await page.mouse.move(
        dstBound.x + dstBound.width / 2,
        dstBound.y + dstBound.height / 2
      );
      await page.mouse.down();
    }
  }
});
