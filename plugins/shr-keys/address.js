import elliptic from "elliptic"
const secp256k1 = new (elliptic.ec)("secp256k1"); // eslint-disable-line
import Bech32 from 'bech32'

import keccaklib from './hash.js'
import Bytes from "./bytes"
import utils from "./utils"
import Bech32Prefix from "./bech32prefix"

const keccak256 = keccaklib.keccak256
const keccak256s = keccaklib.keccak256s


/**************** BECH32 **********************/
const addressToBech32 = address => {
  let words = Bech32.toWords(utils.hexToBytes(address))
  let bech32Address = Bech32.encode(Bech32Prefix.Bech32PrefixAccAddr, words)
  return bech32Address
}

const bech32ToAddress = bech32Address => {
  let words = Bech32.decode(bech32Address).words
  return utils.bytesToHex(Bech32.fromWords(words)).toUpperCase()
}

/**************** ADDRESS **********************/


const create = mnemonic => {
  const mnemonicHash = keccak256(mnemonic)
  return fromPrivate(mnemonicHash)
}

const toChecksum = address => {
  //const addressHash = keccak256s(address.slice(2));
  address = utils.cleanHex(address)
  const addressHash = keccak256s(address);
  //let checksumAddress = "0x";
  let checksumAddress = "";

  //for (let i = 2; i < 42; i++)
  for ( let i = 0; i < 40; i++ )
    checksumAddress += parseInt(addressHash[i], 16) > 7
      ? address[i].toUpperCase()
      : address[i];

    return checksumAddress;
}


const addressFromPublic = publicKey => {
  publicKey = utils.cleanHex(publicKey)

  // Hash of byte array of public key
  const publicHash = keccak256(utils.hexToBytes(publicKey));

  // Hashing including "0x"
  const address = toChecksum(publicHash.slice(-40));
  return addressToBech32(address)
}


const fromPrivate = privateKey => {
  privateKey = utils.cleanHex(privateKey)


  const ecKey = secp256k1.keyFromPrivate(privateKey);

  // Public Key without "0x"
  const publicKey = ecKey.getPublic(false, 'hex');
  let address = addressFromPublic(publicKey)

  return {
    address: address,
    privateKey: privateKey,
    publicKey: publicKey,
  }
}




export default { create, toChecksum, fromPrivate, addressFromPublic, addressToBech32, bech32ToAddress};


if (require.main == module){
    let kb = require('./keybase')
    let mnemonic = kb.KeyPair.createMnemonic(kb.Language.English, kb.Algorithm.SECP256K1)
    console.log("Mnemonic:", mnemonic)
    console.log("Address:", create(mnemonic))
    console.log("Custom Mnemonic:", "trang tran")
    console.log("Address:", create("trang tran"))
    let kp = create("trang tran")
    let rawAddress = bech32ToAddress(kp.address)
    console.log("rawAddress", rawAddress)
    console.log("bech32Address", addressToBech32(rawAddress))
}
