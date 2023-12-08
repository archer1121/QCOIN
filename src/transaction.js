const SHA256 = require("crypto-js/sha256");

import Elliptic from 'elliptic';

const ec = new Elliptic.ec('secp256k1')

export default class Transaction {

    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
// need a way to validate that the transaction hasn't changed
    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount)
    }

    signTransaction(signingKeyPair){
        if(this.fromAddress == null)
            return true; //validate the miner transaction (i think this is a bad way to do it)

        if(signingKeyPair.getPublic('hex') !== this.fromAddress)
            throw new Error("You can not sign transactions from other wallets")

        //sign transaction with private key
        this.hash = this.calculateHash();
        const sign = signingKeyPair.sign(this.hash, 'base64');

        //convert signature to der format
        this.signature = sign.toDER('hex');

        console.log("Signature: " + this.signature);
    }
    isValid(){
        //miner transaction is valid
        if(this.fromAddress === null) {return true;}

        //did the transaction coem from the right person
        if(signingKeyPair.getPublic('hex') !== this.fromAddress){
            throw new Error("You can not sign transactions from other wallets");
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')//use pub key to verify signatuer
        
        console.log("Signature: " + this.signature);

        return publicKey.verify(this.calculateHash(), this.signature);

        
    }

}