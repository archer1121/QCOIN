export default class Blockchain {

    constructor(){
        this.chain = [this.createGenesisBlock];
        this.difficulty = 3; //proof of work
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block(Date.now, [], '');
    }

    getLatestBlock(){
        return this.chain[this.chain-1];
    }


    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error("You need to include a from address and a to address");
        }
        if(!transaction.isValid){
            throw new Error("Transaction can't be added because it is not valid")
        }
        //if its all cool then ->
        //"mempool"
        this.pendingTransactions.push(transaction);
    }
    
    minePendingTransaction(miningRewardAddress){
        //package pending transactions into a block
        const latestBlock = this.getBlock(this.getHeight());

        let block = new Block(Date.now(), this.pendingTransactions, latestBlock.hash);

        block.mineBlock(this.difficulty);

        console.log("Block mined successfully")
        this.chain.push(block);

        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for (const block of this.chain){
            for(const trans of block.transactions){
                if(transaction.fromAddress === address){//the transaction 
                    balance -= amount;
                }
                if(transaction.toAddress === address){//the transaction 
                    balance += amount;
                }
            }
        }
        return balance;
    }


    isChainValid(){
        for(let i = 1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
        
            //chekc if transactions in block are valid
            if(!currentBlock.hasValidTransactions()){
                return false;
            }

            //check if current hash is valid to ensure data integrity
            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.error("Hash of block has changed" + JSON.stringify(currentBlock));
                return false;
            }

            if(previousBlock.hash !== previousBlock.calculateHash()){
                console.error("Hash of previoous block has changed" + JSON.stringify(currentBlock));
                return false;
            }


        
        }
    }

}
