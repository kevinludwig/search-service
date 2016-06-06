import dropIndex from '../services/dropIndex'

export default function*() {
    yield dropIndex();
    this.status = 200;
}