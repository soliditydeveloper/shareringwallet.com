# ShareRing Paper Wallet Generator
Welcome to our cool community project!

[Visit Live Website](https://shareringwallet.com/)

Create your first personal wallet for storing SHR tokens on the mainnet! The current version of a website is using the crypto libraries provided by the official [ShareRing](https://sharering.network/en) development team.

### What is a paper wallet?
Crypto wallet is the pair of your **private key** and your **address**. Private key is used to access your funds and send them to other recepients while your address is used to receive the funds. Mnemonic phrase is used to make private key human readable and friendly for memorization. Your mnemonic key can be converted into private key, and private key gives anybody who owns it ultimate control over the funds stored on the address. (Please keep your mnemonic phrase and a private key safe)

### What to do with this wallet?
[Purchase some SHR tokens on a regulated European DX Exchange](https://go.dx.exchange/visit/?bta=35361&brand=dxexchange&campaign=348&afp=walletgithub), generate your wallet and keep it ready for the mainnet release. Imagine, you can be one of the first [ShareRing](https://sharering.network/en) wallet owners in the whole world! Dont lose your mnemonic phrase, it might be probably used to import your wallet into the official [ShareRing](https://sharering.network/en) app when it's released.

### Wallet components with explanation.
1. Address - send it to people to receive funds. 
2. Private key - it provides access to your funds. Keep it secret.
3. Mnemonic phrase - it provides access to your funds. Keep it secret. 

### Coming in next version
Wallet imports - generate your address by using your private key or mnemonic phrase.

### Build Setup
The wallet generator app is developed with Vue framework (NuxtJS). You are able to download the project and run it on your own local offline machine. Please make sure you have the latest version of NodeJS installed. If you previously had NuxtJS  installed on your machine globally, please make sure you have the latest version before you execute build commands.
``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
