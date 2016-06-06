import swapAlias from '../services/swapAlias'

export default function*() {
    yield swapAlias();
    this.status = 200;
}
