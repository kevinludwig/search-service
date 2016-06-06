import getIndex from '../services/getIndex'

export default function*() {
    this.body = yield getIndex();
}