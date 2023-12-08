import {ec as EC} from 'elliptic';

const ec = new EC('secp256k1');

export function createWallet(){
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');

    return {keyPair, publicKey, privateKey};
}

export function validateWallet(privateKey, publicKey){
    const key = ec.keyFromPrivate(privateKey);

    //derive public key from the private key
    const publicKeyFromPrivate = key.getPublic('hex');

    return publicKeyFromPrivate === publicKey;
}
