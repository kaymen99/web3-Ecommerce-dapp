<div id="top"></div>

<!-- ABOUT THE PROJECT -->
## Decentralized Marketplace Dapp V-2

![home](https://user-images.githubusercontent.com/83681204/161352079-9cccf499-a9a1-4fda-a436-158cd8ef29a2.png)

This is my second implementation of a decentralized marketplace built on top of EVM Blockchains (Ethereum, Polygon,...), The first dapp allowed users to only buy and sell single items (without quantity). But this one is much more developed and have a lot of features, It enables the user to create it's own store with a costumized brand and to sell products with limited/unlimited quantity, it gives buyers the possibility to review the bought products. I also introduced an Auction market just like all the NFT marketplaces (OpenSea,...) however it's more generalized and accept all variety of products. 

### Built With

* [Solidity](https://docs.soliditylang.org/)
* [Brownie](https://eth-brownie.readthedocs.io)
* [React.js](https://reactjs.org/)
* [ethers.js](https://docs.ethers.io/v5/)
* [web3modal](https://github.com/Web3Modal/web3modal)
* [material ui](https://mui.com/getting-started/installation/)


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#how-it-works">How it Works</a></li>
    <li>
      <a href="#usage">How to Use</a>
      <ul>
        <li><a href="#contracts">Contracts</a></li>
        <li><a href="#scripts">Scripts</a></li>
        <li><a href="#testing">Testing</a></li>
        <li><a href="#front-end">Front End</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Please install or have installed the following:
* [nodejs and npm](https://nodejs.org/en/download/) 
* [python](https://www.python.org/downloads/)

### Installation

1. Installing Brownie: Brownie is a python framework for smart contracts development,testing and deployments. It's quit like [HardHat](https://hardhat.org) but it uses python for writing test and deployements scripts instead of javascript.
   Here is a simple way to install brownie.
   ```
    pip install --user pipx
    pipx ensurepath
    # restart your terminal
    pipx install eth-brownie
   ```
   Or if you can't get pipx to work, via pip (it's recommended to use pipx)
    ```
    pip install eth-brownie
    ```
   
3. Clone the repo:
   ```sh
   git clone https://github.com/Aymen1001/MarketPlace-dapp.git
   cd MarketPlace-Dapp-V2
   ```
3. Install Ganache:
   Ganache is a local blockchain that run on your machine, it's used during development stages because it allows quick smart contract testing and avoids all real         Testnets problems. 
   You can install ganache from this link : https://trufflesuite.com/ganache/
   
   Next, you need to setup the ganache network with brownie :
   ```sh
   brownie networks add development ganache-local cmd=ganache-cli host=http://127.0.0.1 accounts=10 mnemonic=brownie port=8545
   ```
4. Set your environment variables
   To be able to deploy to real testnets you need to add your PRIVATE_KEY (You can find your PRIVATE_KEY from your ethereum wallet like metamask) to the .env file:
   ```
   PRIVATE_KEY=<PRIVATE_KEY>
   ```
   You can choose to use ethereum testnets like rinkeby, Kovan or any other evm compatible testnet.
   
   To setup the ethereum  Testnet with brownie you'll need an Alchemy account (it's free) and just create a new app on the ethereum  network
   
   ![Capture d’écran 2022-01-25 à 00 14 44](https://user-images.githubusercontent.com/83681204/150881084-9b60349e-def0-44d2-bbb2-8ca7e27157c7.png)
  
   After creating the app copy the URL from -view key- and run this: 
   ```sh
   brownie networks add Ethereum <network name> cmd=ganache-cli host=<Copied URL> accounts=10 mnemonic=brownie port=8545 chainid=<network chainId>
   ```
   
   You'll also need some eth in the testnet. You can get it into your wallet by using a public faucet. 


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Working EXAMPLES -->
## How it Works



<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## How to Use

### Contracts

   

<p align="right">(<a href="#top">back to top</a>)</p>
    
### Scripts

   In the MarketPlace-Dapp-V2 folder you'll find a directory scripts, it contain all the python code for deploying your contracts and also some useful functions

   The reset.py file is used to remove all previous contracts deployments from build directory:
   ```sh
   brownie run scripts/reset.py
   ```
   The deploy.py file allow the deployment to the testnet/local-network:
   ```sh
   brownie run scripts/deploy.py --network=ganache-local
   ```
   The update_front_end.py is used to transfer all the smart contracts data (abi,...) and addresses to the front end in the artifacts directory:
   ```sh
   brownie run scripts/update_front_end.py
   ```
   
   After running this 3 cammands, the MarketPlace contract is now deployed and is integrated with the front end
   
 <p align="right">(<a href="#top">back to top</a>)</p>
  
 ### Testing

   In the MarketPlace-Dapp-V2  folder you'll find a directory tests, it contain all the python code used for testing the smart contract functionalities
   
   You can run all the tests by :
   ```sh
   brownie test
   ```
   Or you can test each function individualy:
   ```sh
   brownie test -k <function name>
   ```
   
<p align="right">(<a href="#top">back to top</a>)</p>
   
### Front-end
   
   The user interface of this application is build using React JS, it can be started by running: 
   ```sh
   cd front-end
   yarn
   yarn start
   ```
   It uses the following libraries:
      <ul>
        <li><b>Ethers.js:</b> used as interface between the UI and the deployed smart contract</li>
        <li><b>Web3modal:</b> for conecting to Metamask</li>
        <li><b>ipfs-http-client:</b> for connecting  and uploading files to IPFS </li>
        <li><b>@reduxjs/toolkit & redux-persist:</b> for managing the app states (account, balance, blockchain) </li>
        <li><b>Material UI:</b> used for react components and styles </li>    
      </ul>

   
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Contact -->
## Contact

If you have any question or problem running this project just contact me: aymenMir1001@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

