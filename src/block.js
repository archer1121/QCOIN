const SHA256 = require("crypto-js/sha256")


export default class Block{
    constructor(timestamp, transactions, previousHash = ''){
        //must calculate hash last to ensure proper data
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = '';

    }

    calculateHash(){
        return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce)
    }

    hasValidTransactions(){
        //iterate thru transactions in block and make sure they 
        for(const trans of this.transactions){
            if(!trans.isValid()){
                return false;
            }
        }
        return true;
    }
    mineBlock(difficulty){
        //create a hash until we meet a hash criteria
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash;

            console.log("Block mined. nonce: "+this.nonce+"\thash: "+this.hash);
        }
    }
}