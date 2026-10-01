const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, 'docs', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureAll() {
  console.log('Launching Chrome browser from Program Files...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    defaultViewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // 1. Dashboard
  console.log('Capturing 01_dashboard.png...');
  await page.goto('http://localhost:4200/dashboard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_dashboard.png') });

  // 2. Chat UI Initial State
  console.log('Capturing 02_chat_ui.png...');
  await page.goto('http://localhost:4200/chat', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_chat_ui.png') });

  // 3. Chat Component Response
  console.log('Capturing 03_chat_component_response.png...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('.suggest-card')).find(b => b.textContent.includes('Create an Angular component'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_chat_component_response.png') });

  // 4. Chat Service Response
  console.log('Capturing 04_chat_service_response.png...');
  await page.type('.chat-textarea', 'Create an Angular service');
  await page.click('.send-btn');
  await new Promise(r => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_chat_service_response.png') });

  // 5. System Prompt Modal
  console.log('Capturing 05_system_prompt_modal.png...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('View System Prompt'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_system_prompt_modal.png') });
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.btn-close');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // 6. Prompt Library
  console.log('Capturing 06_prompt_library.png...');
  await page.goto('http://localhost:4200/prompt-library', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_prompt_library.png') });

  // 7. Prompt Engineering Theory
  console.log('Capturing 07_prompt_engineering.png...');
  await page.goto('http://localhost:4200/prompt-engineering', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_prompt_engineering.png') });

  // 8. Role-Based - Programmer
  console.log('Capturing 08_role_programmer.png...');
  await page.goto('http://localhost:4200/role-based', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_role_programmer.png') });

  // 9. Role-Based - Language Teacher
  console.log('Capturing 09_role_teacher.png...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('.role-tab-btn')).find(b => b.textContent.includes('Language Teacher'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_role_teacher.png') });

  // 10. Role-Based - Starbucks Marketer
  console.log('Capturing 10_role_marketer.png...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('.role-tab-btn')).find(b => b.textContent.includes('Starbucks Marketer'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_role_marketer.png') });

  // 11. Boolean Logic CoT
  console.log('Capturing 11_boolean_cot.png...');
  await page.goto('http://localhost:4200/boolean-logic', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_boolean_cot.png') });

  // 12. Prompt Optimizer
  console.log('Capturing 12_prompt_optimizer.png...');
  await page.goto('http://localhost:4200/prompt-optimization', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12_prompt_optimizer.png') });

  // 13. Complaint Template (T1)
  console.log('Capturing 13_complaint_template.png...');
  await page.goto('http://localhost:4200/prompt-templates', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13_complaint_template.png') });

  // 14. Sales Report Template (T2)
  console.log('Capturing 14_sales_template.png...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('.template-tab')).find(b => b.textContent.includes('Template 2: Amazon Sales'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '14_sales_template.png') });

  // 15. About Page
  console.log('Capturing 15_about_project.png...');
  await page.goto('http://localhost:4200/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '15_about_project.png') });

  await browser.close();
  console.log('SUCCESS: All 15 authentic application screenshots saved in docs/screenshots/ !');
}

captureAll().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
