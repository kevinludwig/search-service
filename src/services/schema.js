export default {
    settings: {
        number_of_shards: 1,
        number_of_replicas: 1,
        analysis: {
            analyzer: {
                exact_analyzer: {
                    type: 'custom',
                    tokenizer: 'keyword',
                    filter: [
                        'lowercase'
                    ]
                },
                text_analyzer: {
                    type: 'custom',
                    tokenizer: 'whitespace',
                    filter: [
                        'lowercase', 'asciifolding', 'english_filter'
                    ]
                },
                autocomplete_analyzer: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: [
                        'lowercase',
                        'asciifolding',
                        'english_filter',
                        'autocomplete_filter'
                    ]
                }
            },
            filter: {
                english_filter: {
                    type: 'stemmer',
                    name: 'minimal_english'
                },
                autocomplete_filter: {
                    type: 'edge_ngram',
                    min_gram: 1,
                    max_gram: 20
                }
            }
        }
    },
    mappings: {
        content: {
            properties: {
                id: {
                    type: 'string',
                    index: 'not_analyzed'
                },
                title: {
                    type: 'string',
                    analyzer: 'text_analyzer',
                    fields: {
                        exact: {
                            type: 'string',
                            analyzer: 'exact_analyzer'
                        },
                        prefix: {
                            type: 'string',
                            analyzer: 'autocomplete_analyzer',
                            search_analyzer: 'text_analyzer'
                        }
                    }
                },
                description: {
                    type: 'string',
                    analyzer: 'text_analyzer'
                },
                content_type: {
                    type: 'string',
                    analyzer: 'exact_analyzer'
                },
                tags: {
                    type: 'string',
                    analyzer: 'exact_analyzer'
                },
                created: {
                    type: 'date',
                    format: 'epoch_millis'
                },
                updated: {
                    type: 'date',
                    format: 'epoch_millis'
                }
            }
        }
    }
};