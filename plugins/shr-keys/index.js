import Vue from 'vue'
import Address from './address'
import Encode from './encode'
import Symmetric from './symmetric'
//import Hash from './hash'
import CryptoJS from 'crypto-js'
import Asymmetric from './asymmetric'
import KeyPair from './keybase'


Vue.use({

  install(Vue, options) {
    if (this.installed) {
      return
    }
    this.installed = true

    Vue.prototype.$shrKeys = {
      /*
       * Given an entropy ~ random string. Output private key, publickey and address
       */
      createAccount: function (entropy) {
        return Address.create(entropy);
      },
      /*
       * From privateKey, return privateKey, publicKey and address
       */
      fromPrivate: function (privateKey) {
        return Address.fromPrivate(privateKey)
      },
      /*
       * Symmetric encryption. 
       * A symmetric encryption is an ecryption algorithim that encrypt and decrypt using the same secret
       */
      encrypt: function (plaintext, secretKey) {
        if(plaintext && secretKey)
        {
          return Symmetric.encrypt(plaintext, secretKey)
        }else {
          return '';
        }

      },
      /* Generate secrete key to be used in symmetric encryption and decryption
       */
      generateSecretKey: function (password, salt) {
        if(password && salt)
        {
          return Symmetric.generateSecretKey(password, salt)
        }else {
          return '';
        }

      },
      /*
       * Symmetric decryption
       */
      decrypt: function (ciphertext, secretKey) {
        if(ciphertext && secretKey)
        {
          return Symmetric.decrypt(ciphertext, secretKey)
        }else {
          return '';
        }

      },
      /*
       * Encode address with neworkID to return address
       */
      encode: function ({network, address}) {
        if(network && address)
        {
          return Encode.encode({network, address})
        }else {
          return '';
        }

      },
      /*
       * Decode an address and output address and networkID
       */
      decode: function (encoded) {
        if(encoded)
        {
          return Encode.decode(encoded)
        }else {
          return '';
        }

      },
      /*
       * A hash function using keccak256, similar to SHA3
       */
      hash: function (input){
        if ( input ) {
          return CryptoJS.SHA256(input).toString()
          //return Hash.keccak256(input)
        } else {
          return '';
        }
      },
      /*
       * Sign a transaction
       */
      sign: Asymmetric.sign, // sign a transasction
      verify: Asymmetric.verify, // verify a transaction
      asymmetricEncrypt: Asymmetric.encrypt, // asymmetric encrypt
      asymmetricDecrypt: Asymmetric.decrypt, // asymmetric decrypt
      KeyPair: KeyPair.KeyPair, // KeyPair
      addressToBech32: Address.addressToBech32,
      bech32ToAddress: Address.bech32ToAddress
    }
  }
})
