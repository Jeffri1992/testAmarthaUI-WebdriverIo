import reporter from "cucumber-html-reporter";
import { fileURLToPath } from 'url';
import 'dotenv/config'
import fs from 'fs';
import path from 'path';
import CucumberJsJson from "wdio-cucumberjs-json-reporter";

const platform = "website";
const headless = false;
const jsonDir = './report/';
const rerunDir = './rerun/';

// Function to remove files in a directory
const removeFilesInDirectory = (directory) => {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    } else if (fs.statSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    }
  });
};

export const config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  //
  // Override default path ('/wd/hub') for chromedriver service.
  path: '/',
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    './features/**/*.feature'
  ],

  suites: {
    investment: [
      './features/scenarios/login.feature',
      './features/scenarios/reksadana/fund-list.feature',
      './features/scenarios/reksadana/fund-detail.feature',
      './features/scenarios/reksadana/all-product.feature',
      // './features/scenarios/reksadana/portfolio.feature',
      // './features/scenarios/reksadana/transaction.feature',
    ],
    obligation: [
      './features/scenarios/obligation.feature',
    ],
    backOffice: [
      './features/scenarios/back-office/product.feature',
      './features/scenarios/back-office/login-back-office.feature',
      './features/scenarios/back-office/log.feature',
      './features/scenarios/back-office/transaction.feature',
      './features/scenarios/back-office/registration.feature',
      './features/scenarios/back-office/kyc.feature',
    ]
  },
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances:  1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  //
  capabilities: [],
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'error',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner, @wdio/lambda-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: '',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 30000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 0,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  // services: ['chromedriver'/*,'selenium-standalone'*/],
  services: platform === 'website' ? [] :
    [
      [
        'appium',
        {
          command: 'appium',
          logPath: './',
        }
      ]
    ],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'cucumber',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  //reporters: [['allure', {outputDir: 'allure-results'}]],
  reporters: [
    [
      "spec",
      {
        color: true,
        realtimeReporting: true,
      },
    ],
    ['cucumberjs-json', {
      jsonFolder: 'report/',
      language: 'en',
      reportFilePerRetry: false
    }],
  ],

  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    require: ['./features/step-definitions/**/*.js'],        // <string[]> (file/dir) require files before executing features
    backtrace: false,   // <boolean> show full backtrace for errors
    requireModule: [],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: false,    // <boolean> abort the run on first failure
    format: ['pretty', `rerun:./rerun/rerun_${process.pid}.txt`], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: true,       // <boolean> hide source uris
    profile: [],        // <string[]> (name) specify the profile to use
    strict: false,      // <boolean> fail if there are any undefined or pending steps
    tagExpression: '',  // <string> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 600000,     // <number> timeout for step definitions
    ignoreUndefinedDefinitions: true, // <boolean> Enable this config to treat undefined definitions as warnings.
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    if (platform === 'website') {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const downloadDir = path.resolve(__dirname, 'support');
      const chromeOptions = {
        maxInstances: 5,
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--disable-gpu',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1366,868',
            '--disk-cache-size=1',
            '--ignore-certificate-errors',
            '--user-agent=SEIT-AUTOMATION'
          ],
          prefs: {
            "download.default_directory": downloadDir,
            'download.prompt_for_download': false,
            'profile.default_content_settings.popups': 0,
            'directory_upgrade': true
          }
        }
      };

      if (headless === 'true') {
        chromeOptions['goog:chromeOptions'].args.push('headless');
      }

      capabilities.push(chromeOptions);
    }

    else {
      console.log(`Throw Error: Platform ${platform} is not available. Please fill platform properly`)
    }
    removeFilesInDirectory(jsonDir);
    removeFilesInDirectory(rerunDir);
  },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
    if (capabilities['wdio:options'] && capabilities['wdio:options'].tags) {
      const tags = capabilities['wdio:options'].tags;
      config.cucumberOpts.tags = tags;
    }
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {
    if (platform === 'website') {
      browser.maximizeWindow();
    }
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Runs before a Cucumber feature
   */
  // beforeFeature: function (uri, feature, scenarios) {
  // },
  /**
   * Runs before a Cucumber scenario
   */
  // beforeScenario: function (uri, feature, scenario, sourceLocation) {
  // },
  /**
   * Runs before a Cucumber step
   */
  // beforeStep: function (uri, feature, stepData, context) {
  // },
  /**
   * Runs after a Cucumber step
   */
  // afterStep: function (uri, feature, { error, result, duration, passed }, stepData, context) {
  // },
  /**
   * Runs after a Cucumber scenario
   */
  afterScenario: async function (uri, feature, scenario, result, sourceLocation) {
    const fileName = 'Screenshot-' + Date.now();
    const takeScreenshotFor = "all";
    const results = {
      status: uri.result.status,
      steps: uri.pickle.steps,
      scenarioName: uri.pickle.name
    };

    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    if (takeScreenshotFor === 'failed') {
      if (results.status === 'FAILED') {
        const screenshot = await driver.takeScreenshot();
        await CucumberJsJson.attach(screenshot, 'image/png');
      }
    } else if (takeScreenshotFor === 'passed') {
      if (results.status === 'PASSED') {
        const screenshot = await driver.takeScreenshot();
        await CucumberJsJson.attach(screenshot, 'image/png');
      }
    } else if (takeScreenshotFor === 'all') {
      const screenshot = await driver.takeScreenshot();
      await CucumberJsJson.attach(screenshot, 'image/png');
    } else if (takeScreenshotFor === 'local') {
      await driver.saveScreenshot('./screenshots/' + fileName + '.png');
    }
  },
  // afterScenario: function (uri, feature, scenario, result, sourceLocation) {
  // },
  /**
   * Runs after a Cucumber feature
   */
  // afterFeature: function (uri, feature, scenarios) {
  // },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  // onComplete: function(exitCode, config, capabilities, results) {
  // },
  onComplete: async function (exitCode, config, capabilities, results) {
    if (!fs.existsSync('report')) {
      fs.mkdirSync('report');
    }
    const options = {
      theme: 'bootstrap',
      jsonDir: "report",
      output: "report/cucumber-report.html",
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: true,
      metadata: {
        "Browser name": 'Chrome',
        "Test Environment": `${process.env.TEST_ENV}`
      },
      failedSummaryReport: true,
      screenshotsDirectory: 'screenshots',
      storeScreenshots: true
    };
    await reporter.generate(options);
  },
  /**
  * Gets executed when a refresh happens.
  * @param {String} oldSessionId session ID of the old session
  * @param {String} newSessionId session ID of the new session
  */
  //onReload: function(oldSessionId, newSessionId) {
  //}
}
