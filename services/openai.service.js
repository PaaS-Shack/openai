"use strict";



const DbService = require("db-mixin");
const ConfigLoader = require("config-mixin");

const { MoleculerClientError } = require("moleculer").Errors;

const { Configuration, OpenAIApi } = require("openai");


/**
 * OpenAI Service
 */
module.exports = {
    name: "openai",
    version: 1,

    mixins: [
        ConfigLoader(['openai.**'])
    ],

    /**
     * Service dependencies
     */
    dependencies: [

    ],

    /**
     * Service settings
     */
    settings: {
        rest: "/v1/openai/",

        config: {
            "openai.org": "org-...",//process.env.OPENAI_ORG,
            "openai.key": "key-..."//process.env.OPENAI_KEY

        }
    },

    /**
     * Actions
     */

    actions: {
        /**
         * create a completion
         * 
         * @actions
         * @param {string} prompt
         * @param {string} engine
         * @param {number} maxTokens
         * @param {number} temperature
         * 
         * @returns {Promise} completion - completion object
         */
        createCompletion: {
            rest: {
                method: "POST",
                path: "/completion"
            },
            permissions: ["openai.createCompletion"],
            params: {
                prompt: {
                    type: "string",
                    min: 1,
                    max: 1000
                },
                engine: {
                    type: "string",
                    enum: ["ada", "babbage", "curie", "davinci", "content-filter-alpha-c4", "content-filter-dev"],
                    default: "davinci"
                },
                maxTokens: {
                    type: "number",
                    min: 1,
                    max: 1000,
                    default: 100
                },
                temperature: {
                    type: "number",
                    min: 0,
                    max: 1,
                    default: 0.5
                }
            },
            async handler(ctx) {
                const { prompt, engine, maxTokens, temperature } = ctx.params;
                const completion = await this.createCompletion(prompt, engine, maxTokens, temperature).catch((err) => {
                    console.log(err)
                    throw new MoleculerClientError("OpenAI API error", 500, "OPENAI_API_ERROR", { code: 500, message: "OpenAI API error" });
                });
                return completion;
            }
        },

        /**
         * create a search
         * 
         * @actions
         * @param {string} documents
         * @param {string} query
         * 
         * @returns {Promise} search - search object
         */
        createSearch: {
            rest: {
                method: "POST",
                path: "/search"
            },
            permissions: ["openai.createSearch"],
            params: {
                documents: {
                    type: "string",
                    min: 1,
                    max: 1000
                },
                query: {
                    type: "string",
                    min: 1,
                    max: 1000
                }
            },
            async handler(ctx) {
                const { documents, query } = ctx.params;
                const search = await this.createSearch(documents, query);
                return search;
            }
        },

        /**
         * create a classification
         * 
         * @actions
         * @param {string} query
         * @param {string} examples
         * @param {string} labels
         * 
         * @returns {Promise} classification - classification object
         */
        createClassification: {
            rest: {
                method: "POST",
                path: "/classification"
            },
            permissions: ["openai.createClassification"],
            params: {
                query: {
                    type: "string",
                    min: 1,
                    max: 1000
                },
                examples: {
                    type: "string",
                    min: 1,
                    max: 1000
                },
                labels: {
                    type: "string",
                    min: 1,
                    max: 1000
                }
            },
            async handler(ctx) {
                const { query, examples, labels } = ctx.params;
                const classification = await this.createClassification(query, examples, labels);
                return classification;
            }
        },

    },

    /**
     * Events
     */
    events: {

    },

    /**
     * Methods
     */
    methods: {
        /**
         * create a completion
         * 
         * @param {string} prompt
         * @param {string} engine
         * @param {number} maxTokens
         * @param {number} temperature
         * 
         * @returns {Promise} completion - completion object
         */
        async createCompletion(prompt, engine, maxTokens, temperature) {
            const completion = await this.openai.createCompletion({
                engine: engine,
                prompt: prompt,
                maxTokens: maxTokens,
                temperature: temperature,
                topP: 1,
                frequencyPenalty: 0,
                presencePenalty: 0,
                stop: ["\n"]
            });
            return completion;
        },

        /**
         * create a search
         * 
         * @param {string} documents
         * @param {string} query
         * 
         * @returns {Promise} search - search object
         */
        async createSearch(documents, query) {
            const search = await this.openai.createSearch({
                documents: documents,
                query: query
            });
            return search;
        },

        /**
         * create a classification
         * 
         * @param {string} query
         * @param {string} examples
         * @param {string} labels
         * 
         * @returns {Promise} classification - classification object
         */
        async createClassification(query, examples, labels) {
            const classification = await this.openai.createClassification({
                query: query,
                examples: examples,
                labels: labels
            });
            return classification;
        },

        /**
         * create a answer
         * 
         * @param {string} documents
         * @param {string} question
         * 
         * @returns {Promise} answer - answer object
         */
        async createAnswer(documents, question) {
            const answer = await this.openai.createAnswer({
                documents: documents,
                question: question
            });
            this.logger.info(`Prompt: ${question} Answer: ${answer}`);
            return answer;
        },


        /**
         * create openai client
         */
        createOpenAiClient() {
            this.configuration = new Configuration({
                apiKey: this.config["openai.key"],
            });

            this.openai = new OpenAIApi(this.configuration);
            
            this.logger.info("OpenAI client created");
        },

    },

    /**
     * Service created lifecycle event handler
     */
    created() {

    },

    /**
     * Service started lifecycle event handler
     */
    async started() {
        await this.createOpenAiClient();
    },


    /**
     * Service stopped lifecycle event handler
     */
    stopped() { }
};
