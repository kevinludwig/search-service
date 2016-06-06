import search from '../services/search'

export default function*() {
    let {
        term
    } = this.request.params;
    let {
        skip = 0, limit = 25
    } = this.request.query;
    this.body = {
        results: yield search(term, skip, limit)
    };
}