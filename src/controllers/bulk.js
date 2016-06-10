import upsert from '../services/bulk'

export default function*() {
    let body = this.request.body;

    this.assert(body.content, 400, 'missing body.content');
    this.assert(Array.isArray(body.content), 400, 'body.content must be array');
    this.assert(body.content.every((elem) => elem.id), 400, 'all body.content elems must have id');

    yield bulk(body.content);
    this.status = 200;
}