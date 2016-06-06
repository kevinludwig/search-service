import createIndex from '../services/createIndex'

export default function*() {
    yield createIndex();
    this.status = 200;
}