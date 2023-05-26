"use strict";



const DbService = require("db-mixin");
const ConfigLoader = require("config-mixin");

const { MoleculerClientError } = require("moleculer").Errors;

const { Configuration, OpenAIApi } = require("openai");


/**
 * attachments of addons service
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

    },

    /**
     * Actions
     */

    actions: {

        listEngines: {
            rest: 'GET /list-engines',
            params: {

            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.openai.listEngines()
            }
        },
        createCompletion: {
            params: {
                prompt: { type: "string", optional: false },
            },
            async handler(ctx) {
                const params = Object.assign({}, ctx.params);
                return this.openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: params.prompt,
                    max_tokens: 7,
                    temperature: 0,
                });
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

    },

    /**
     * Service created lifecycle event handler
     */
    created() {

    },

    /**
     * Service started lifecycle event handler
     */
    started() {
        this.configuration = new Configuration({
            organization: this.config['openai.org'],
            apiKey: this.config['openai.key'],
        });
        this.openai = new OpenAIApi(this.configuration);
    },


    /**
     * Service stopped lifecycle event handler
     */
    stopped() { }
};
