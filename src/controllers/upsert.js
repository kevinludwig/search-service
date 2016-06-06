import update from '../services/upsert'

export default function*() {
    yield update(this.request.params.id, this.request.body);
    this.status = 200;
}
