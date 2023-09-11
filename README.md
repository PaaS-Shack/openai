# Moleculer OpenAI Service

![Moleculer logo](https://moleculer.services/images/logo.png)

This is a Moleculer service for integrating with OpenAI's GPT models. It provides REST API endpoints for various natural language processing tasks such as text completion, search, and classification using the OpenAI API.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Actions](#actions)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/Paas-Shack/openai.git
cd openai
```

2. Install dependencies:

```bash
npm install
```

3. Configure the service by editing the `moleculer.config.js` file and providing your OpenAI API key and organization.

4. Start the service:

```bash
npm start
```

## Configuration

You need to configure the service with your OpenAI API key and organization. Edit the `moleculer.config.js` file and provide the following configuration in the `nodeID` section:

```javascript
// moleculer.config.js

module.exports = {
  // ...
  nodeID: "your-node-id",
  transporter: "NATS",
  // ...
  services: [
    {
      name: "openai",
      // ...
      settings: {
        config: {
          "openai.org": "your-organization-id",
          "openai.key": "your-api-key"
        }
      }
    }
  ]
  // ...
};
```

## Usage

You can use this service by making HTTP requests to its REST API endpoints. Here are the available actions:

### Create Completion

Generate text completions based on a prompt:

```http
POST /v1/openai/completion
```

**Parameters:**

- `prompt` (string, required): The text prompt.
- `engine` (string, optional): The OpenAI engine to use (default: "davinci").
- `maxTokens` (number, optional): Maximum number of tokens in the response (default: 100).
- `temperature` (number, optional): Sampling temperature (default: 0.5).

### Create Search

Perform a search operation on a set of documents using a query:

```http
POST /v1/openai/search
```

**Parameters:**

- `documents` (string, required): The set of documents.
- `query` (string, required): The search query.

### Create Classification

Perform a text classification task with given examples and labels:

```http
POST /v1/openai/classification
```

**Parameters:**

- `query` (string, required): The text query.
- `examples` (string, required): Examples for classification.
- `labels` (string, required): Labels for classification.

## Examples

Here are some examples of how to use the service:

### Create Completion

```http
POST /v1/openai/completion
{
  "prompt": "Translate the following English text to French: 'Hello, world.'"
}
```

### Create Search

```http
POST /v1/openai/search
{
  "documents": "Document 1\nDocument 2\nDocument 3",
  "query": "Search query"
}
```

### Create Classification

```http
POST /v1/openai/classification
{
  "query": "Is this a positive or negative statement?",
  "examples": "Example 1\nExample 2\nExample 3",
  "labels": "positive\nnegative\nneutral"
}
```

For more details on the available actions and their parameters, refer to the [Actions](#actions) section.

## Contributing

Contributions are welcome! Please follow the [Contribution Guidelines](CONTRIBUTING.md) for this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
