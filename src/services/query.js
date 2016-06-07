import config from 'config'

function exactMatch(term) {
    return {
        term: {
            'title.exact': term,
            boost: 2
        }
    };
}

function phraseMatch(term) {
    return {
        match_phrase: {
            title: {
                query: term,
                boost: 1.5
            }
        }
    };
}

function termMatch(term) {
    return {
        term: {
            title: term,
            boost: 1.25
        }
    };
}

function phrasePrefixMatch(term) {
    return {
        match: {
            'title.prefix': {
                query: term,
                boost: 1.05
            }
        }
    };
}

function tagMatch(term) {
    return {
        term: {
            tags: term
        }
    };
}

function descriptionMatch(term) {
    return {
        match: {
            description: term
        }
    };
}

function query(term) {
    return {
        bool: {
            should: [
                exactMatch(term),
                phraseMatch(term),
                termMatch(term),
                phrasePrefixMatch(term),
                tagMatch(term),
                descriptionMatch(term)
            ]
        }
    };
};

function aggs(skip, limit) {
    return {
        top_content_type: {
            terms: {
                field: 'content_type',
                order: {
                    max_score: 'desc'
                }
            },
            aggs: {
                content_type_hits: {
                    top_hits: {
                        size: limit,
                        from: skip
                    }
                },
                max_score: {
                    max: {
                        lang: 'expression',
                        script: '_score'
                    }
                }
            }
        }
    };
}

function similar(id) {
    return {
        more_like_this: {
            fields: ['title', 'tags', 'description'],
            like: {
                _index: config.search.readAlias,
                _type: config.search.type,
                _id: id
            }
        }
    };
}

export {
    aggs,
    similar,
    query
}
