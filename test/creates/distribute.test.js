const zapier = require('zapier-platform-core');
const should = require('should')

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.distribute', () => {
  it('should run', async () => {
    const bundle = {
      authData: {
        apiKey: process.env.DREAM_API_KEY
      },
      inputData: {
        text: "zapier text" + Date.now(),
        link: "https://agentfoocus.com"
      }
    };

    const results = await appTester(App.creates.distribute.operation.perform, bundle);
    console.log("TEST RESULT: ", results)
    should(results.content_urls[0]).startWith('https://twitter.com')
    // TODO: add more assertions
  });
});
