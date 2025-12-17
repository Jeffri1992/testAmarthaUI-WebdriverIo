WebdriverIO UI Automation Framework
This project is an automated testing framework built using WebdriverIO (v8), JavaScript, and Cucumber (Gherkin). It utilizes the Page Object Model (POM) design pattern for maintainability and scalability.

📋 Prerequisites
Ensure your environment is set up with the following:

1. Node.js: Version 18.x (Required).

Check version: node -v


2. Google Chrome: Latest version installed.
Check the chromedriver package on npm and choose a version that matches your Google Chrome browser. 
I am currently using version 141.0.0.


🛠 Installation
1. Clone Repo
2. npm install

Running Test
1. npm test -- --cucumberOpts.tags='@addToCart' | npm test -- --cucumberOpts.tags='@checkRedirectionAbout'

📂 Project Structure
Plaintext

website/
├── features/
│   ├── scenarios/          # Gherkin Feature files (.feature)
│   ├── step-definitions/   # Step definition logic (.js)
│   ├── page-objects/       # Page Object Model classes (.js)
│   └── helpers/            # Utility functions
├── report/                 # Test execution reports (HTML/JSON)
├── wdio.conf.js            # Main WebdriverIO Configuration
└── package.json            # Dependencies and Scripts