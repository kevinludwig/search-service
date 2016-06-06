import del from '../services/del'

export default function*() {
    yield del(this.request.params.id);
    this.status = 200;
}