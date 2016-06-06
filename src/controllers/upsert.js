import upsert from '../services/upsert'

export default function*() {
    let body = this.request.body;

    this.assert(body.id, 400, 'missing body.id');
    
    yield upsert(body.id, body);
    this.status = 200;
}
