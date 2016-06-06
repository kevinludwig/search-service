import similar from '../services/similar'

export default function*() {
    let {skip, limit} = this.request.query;
    this.body = yield similar(this.params.id);  
}
