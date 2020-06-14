const config = require('config')

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

module.exports = (term) => {
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

