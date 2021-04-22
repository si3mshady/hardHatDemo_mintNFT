/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config(); 
require("@nomiclabs/hardhat-ethers"); 
// https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html
const{API_URL,PRIVATE_KEY}=process.env;

module.exports={
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
  },

}