require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/FirstNFT.sol/MyNFT.json");

const contractAddress = "0x3B40Ee806A58A466F521Ce643bA4E04aF0C39777"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
console.log(JSON.stringify(contract.abi));

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };
  

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log(" Promise failed:", err);
  });
}
// mint is deploy a new instance of smart contract 
mintNFT("https://gateway.pinata.cloud/ipfs/QmRKfAGD4vkn7LLsFTp1ZpMhb8TqvtDaHx1EtzXExiidBR")

// https://gateway.pinata.cloud/ipfs/QmWYG4GWrayxkABoWEgzqewTV4KVDdSjyUmL9Ube8iwWzg
// https://gateway.pinata.cloud/ipfs/QmUnmDrSPdY7EAqZDjoXn8DGc9emsmHEqoecvaPxyZS4Y2
// https://gateway.pinata.cloud/ipfs/QmPhr4Z2Fc37ZCJcnETrLeJUMudAbCQKzd1NHZwS8XtDAg
// https://gateway.pinata.cloud/ipfs/QmUNXUkDgup39oeEHf9ERwoDh7wEaiHsy8DeGnw8aRvwpM
// https://gateway.pinata.cloud/ipfs/QmcYeDXqGqMEYvxw5dMXVkVJfU1Kzxo3BNWgdPAhhSg5jS

