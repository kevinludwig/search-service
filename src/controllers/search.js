import search from '../services/search'

export default function*() {
    let {
        skip = 0, limit = 25
    } = this.request.query;
    this.body = yield search(this.params.term, skip, limit);
}