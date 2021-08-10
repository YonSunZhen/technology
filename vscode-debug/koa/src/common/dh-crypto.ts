import { service_logger } from '@common';
import * as common from './common';
import * as crypto from 'crypto';

class DHCrypto {
  pubN: number;
  modN: number;
  sPrivN: number;
  sPubResultN: number;

  constructor() {
    this.pubN = common.randomN(1, 99999);
    this.modN = common.randomN(1, 99999);
    this.sPrivN = common.randomN(1, 99999);
    while (this.pubN % this.modN === 0 || this.modN % this.pubN === 0) {
      this.pubN = common.randomN(1, 99999);
    }
    while (this.sPrivN % this.modN === 0 || this.modN % this.sPrivN === 0) {
      this.sPrivN = common.randomN(1, 99999);
    }
    this.sPubResultN = this.pubN * this.sPrivN % this.modN;
  }

  getPubN(): number {
    return this.pubN;
  }

  getModN(): number {
    return this.modN;
  }

  getSPubResultN(): number {
    return this.sPubResultN;
  }

  generateSecretKey(_cPubResultN: number): string {
    if (!_cPubResultN) {
      service_logger.info('error: _cPubResultN is must be number.');
      return '';
    }
    let sKeyN = _cPubResultN * this.sPrivN % this.modN;
    sKeyN = sKeyN + this.modN + 1;
    const hash = crypto.createHash('sha1');
    hash.update(sKeyN.toString());
    return hash.digest('hex');
  }
}

// 共享这个实例, 因此值是一样的
const dh_crypto = new DHCrypto();
export { dh_crypto };
