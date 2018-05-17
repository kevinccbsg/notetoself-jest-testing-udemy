const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const props = {
  titleAPP: 'Note to self', 
  newNote: 'New note text',
  cookieName: 'NOTES',
};

const { URL, HEADLESS } = process.env;

const browserConfig = {
  launch: {
    headless: (HEADLESS === 'false') ? false : true,
    devtools: (HEADLESS === 'false') ? true : false,
  },
  urlGoTo: URL,
  gotoConfig: { waitUntil: 'load' },
};

jest.setTimeout(10000);

describe('UI test for create note functionality', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(browserConfig.launch);
    page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(browserConfig.urlGoTo, browserConfig.gotoConfig);
  });

  it('Load the page with title `Note to self`', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain(props.titleAPP);
  });

  it('Render one form', async () => {
    const formCounts = await page.$$eval('form', form => form.length);
    expect(formCounts).toEqual(1);
  });

  it(`Complete form and create new note: '${props.newNote}' and save it into cookies`, async () => {
    const button = await page.$('form button');
    const input = await page.$('form input');
    await input.tap();
    await page.keyboard.type(props.newNote, { delay: 100 });
    await button.tap();
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain(props.newNote);
    const cookies = await page.cookies();
    const isCookies = !!cookies.length;
    expect(isCookies).toBe(true);
    const { name } = cookies[0];
    expect(name).toEqual(props.cookieName);
  });

  it('Delete all cookies', async () => {
    const input = await page.$('form input');
    const [button, deleteButton] = await page.$$('button');
    await input.tap();
    await page.keyboard.type(props.newNote, { delay: 100 });
    await button.tap();
    await page.waitFor(1000);
    await deleteButton.tap();
    const cookies = await page.cookies();
    const isCookies = !!cookies.length;
    expect(false).toBe(false);
  });

  afterAll(async () => {
    if (browserConfig.launch.headless === false) {
      await page.waitFor(2000);
    }
    browser.close();
  });
});
