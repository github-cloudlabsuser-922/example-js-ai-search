# example-js-ai-search

- This example uses Node to call Azure AI Search Service that quieries the Credit Card Rewards data for our hackathon. It is meant to be an example that can be converted to React or whichever frontend is being used. 

- The code is an update from the example in the [Use your Own Data](https://learn.microsoft.com/en-us/azure/ai-services/openai/use-your-data-quickstart?tabs=command-line%2Cpython-new&pivots=programming-language-javascript) tutorial so it can be used for reference. Start [here](https://learn.microsoft.com/en-us/azure/ai-services/openai/use-your-data-quickstart?tabs=command-line%2Cpython-new&pivots=programming-language-javascript#environment-variables) and use the appsetting json from the data directory in the Sharepoint.

- I will research adding the appsettings json values to a Key Vault so we don't have to worry about maintaining secrets. 

## Setup
- pull code down
- `npm install`
- `node index.js`

- This should run the application with a given input in messages. This is just an example of how to call the azure search service. Plese bring this code into your application and update as needed for our requirements. 