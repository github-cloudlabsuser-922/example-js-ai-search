const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// Set the Azure and AI Search values from environment variables
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["AZURE_OPENAI_API_KEY"];
const deploymentId = process.env["AZURE_OPENAI_DEPLOYMENT_ID"];
const searchEndpoint = process.env["AZURE_AI_SEARCH_ENDPOINT"];
const searchKey = process.env["AZURE_AI_SEARCH_API_KEY"];
const searchIndex = process.env["AZURE_AI_SEARCH_INDEX"];


async function main(){
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

  const messages = [
    {
        role:"system",
        content: "You are an expert at finding the highest possible credit card rewards given purchases that are made. You talk to people in a confident and knowledgeable tone, like a friend."
    },
    { role: "user", content: "Ia am at the grocery store and I am about tot make a $150 purchase. Tha have the following credit cards: Bank of America Customized Cash Rewards, Capital One Spark 1.5X Miles Select, and Capital One Quicksilver Rewards. Which card will give me the best rewards for my purchase?" },
  ];

  console.log(`Message: ${messages.map((m) => m.content).join("\n")}`);

  const events = await client.streamChatCompletions(deploymentId, messages, { 
    maxTokens: 1024,
    azureChatExtensionOptions: {
      extensions: [
        {
          endpoint: searchEndpoint,
          key: searchKey,
          indexName: searchIndex,
        },
      ],
    },
  });
  let response = "";
  for await (const event of events) {
    for (const choice of event.choices) {
      const newText = choice.delta?.content;
      if (!!newText) {
        response += newText;
        // To see streaming results as they arrive, uncomment line below
        // console.log(newText);
      }
    }
  }
  console.log(response);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});



module.exports = { main };