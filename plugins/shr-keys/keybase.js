import bip39 from 'bip39'
import elliptic from "elliptic"
const secp256k1 = new (elliptic.ec)("secp256k1")

import Address from './address.js'
import Encrypt from './asymmetric.js'
import Bytes from './bytes.js'
import Symmetric from './symmetric.js'
import Utils from './utils'




const Language = {
    English: "English",
    France: "France"
}

const Algorithm = {
    SECP256K1: "secp256k1"

}

class KeyPair {
    /**
     * constructor
     * @param {string} privKey - hex string
     * @param {string} pubKey - hex string
     * @param {string} address - hex string
     */
    constructor(privKey, pubKey, address) {
        this.privKey = privKey
        this.pubKey = pubKey
        this.address = address
    }


    /**
     * sign - sign a message using this key
     * @param {string} msg - message to be signed
     * @return {string} hex representation of DER signature
     */
    sign(msg) {
        if (this.privKey == null) {
            return false
        }
        return Encrypt.sign(this.privKey, msg);
    }

    /**
     * verify - verify a message using this key
     * @param {string} msg - message to be verified
     * @param {string} signature - hex string of DER signature
     * @return {boolean} true/false
     */
    verify(msg, signature) {
        return Encrypt.verify(this.pubKey, msg, signature)
    }


    /**
     * stringify - turn this object into a JSON string
     */
    stringify() {
        let obj = {
            privateKey: this.privKey,
            publicKey: this.pubKey,
            address: this.address
        }

        return JSON.stringify(obj);
    }


    /**
     * encryptedString - get encrypted version of this keyPair
     * @param {string} secretKey - hex representation of secretKey used to encrypt this keyPair
     */
    encryptedString(secretKey){
        let obj = [this.privKey, this.pubKey, this.address]
        return Symmetric.encrypt(JSON.stringify(obj), secretKey)
    }


    /*
     * encrypt - encrypt a plaintext of string
     * @param {string} plaintext - a plaintext in string
     * @return {string} JSON string of the object including
     * * iv {string} - hex String of Initialization Vector - random 16 bytes = 32 chars
     * * ephemPubKey {string} - hex String of ephemeral public Key - 65 bytes  = 130 chars
     * * ciphertext {string} - hex string of ciphertext (Variable size)
     * * mac {string} - message authentication code ( 32 bytes = 64 chars )
     */
    encrypt( plaintext ) {
        return Encrypt.encrypt(this.pubKey, plaintext)
    }
    
    /*
     * decrypt - decrypt ciphertext
     * @param {string} ciphertext - received from above function
     * @return {string} plaintext
     */
    decrypt ( ciphertext) {
        return Encrypt.decrypt(this.privKey, ciphertext)
    }


}

/**
 * createMnemonic - create a list of 12 words as mnemonic as a base for privateKey generation
 * @param {string} language, optional - one type of language. Currently only support English. See Enum Language defined in this file
 * @param {string} algorithm, optional - which algorithm to be used. See enum Algorithm defined in this file.
 * @return {string} mnemonic - a list of 12 words
 */
KeyPair.createMnemonic = function (language, algorithm) {
    language = language || Language.English;
    if (language != Language.English) throw Error("Only Support English now")
    algorithm = algorithm || Algorithm.SECP256K1
    if (algorithm != Algorithm.SECP256K1) throw Error("Only support secp256k1 now")

    let randomBytes = Bytes.random(16) // 128 bits
    let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex').slice(2)) //  12 word phrase

    return mnemonic
}


/**
 * validateMnemonic - validate whether a string is a correct mnemonic
 * @param {string} mnemonic
 * @param {string} language - optional. Default is English
 * @return {boolean} true/false indicating whether the string is a correct mnemonic
 */
KeyPair.validateMnemonic = function(mnemonic, language){
    language = language || Language.English;
    if (language != Language.English) throw Error("Only Support English now")
    return bip39.validateMnemonic(mnemonic)
}


/**
 * fromPrivateKey - create KeyPair from privateKey
 * @param {privateKey} - hex string representation of private key
 * @return {KeyPair} - KeyPair from this privateKey
 */
KeyPair.fromPrivateKey = function(privateKey){
    let res = Address.fromPrivate(privateKey)
    return new KeyPair(res.privateKey, res.publicKey, res.address)
}


/**
 * fromMnemonic - create a KeyPair from mnemonic
 * @param {mnenomic} - a list of 12 words
 * @return {KeyPair} - KeyPair
 */
KeyPair.fromMnemonic = function(mnemonic) {
    if (mnemonic == "") {
        throw Error("Mnemonic must not be an empty string.")
    }
    let res = Address.create(mnemonic)
    return new KeyPair(res.privateKey, res.publicKey, res.address)
}

/**
 * fromEncryptedKeyPair - decrypt an encrypted keyPair
 *
 * @param {string} encryptedKP - hex-encoded encrypted keypair
 * @param {string} secretKey - hex-encoded key used to decrypt
 * @return {KeyPair} KeyPair
 */
KeyPair.fromEncryptedKeyPair = function (encryptedKP, secretKey) {
    let obj =  JSON.parse(Symmetric.decrypt(encryptedKP, secretKey))
    return new KeyPair(obj[0], obj[1], obj[2])

}


/**
 * fromPublicKey - get KeyPair from public key. 
 * NOTE: KeyPair is without PrivateKey, only suitable for verifying a signature or encrypting a message
 */
KeyPair.fromPublicKey = function (publicKey){
    return new KeyPair(null, publicKey, Address.addressFromPublic(publicKey))
}


class KeyBase {

    constructor(db) {
        this.db = db;
    }


    createMnemonic (language, algorithm) {
        return createMnemonic(language, algorithm)
    }

    createBip39Seed(mnemonic) {
        let seed = bip39.mnemonicToSeedHex(mnemonic)
        return seed
    }

    /**
     * save KeyInfo with name to Db.
     * @param {name} name of keyInfo
     * @param {keyInfo} KeyInfo object
     * @return {Promise}
     */
    save(name, keyInfo) {
        return this.db.put(name, keyInfo.stringify())
    }

    /**
    * save KeyInfo with name to Db.
    * @param {name} name of keyInfo
    * @return {Promise}
    */
    get(name) {
        return this.db.get(name)
    }

}


export default {
    Language,
    Algorithm,
    KeyPair,
    KeyBase,
}

if (require.main === module) {
    
    // Generate a mnemonic
    let mne = KeyPair.createMnemonic()
    console.log(mne)
    
    let kp = KeyPair.fromMnemonic(mne)
    console.log(kp)
    
    // Generate KeyPair from PrivateKey
    let kp1 = KeyPair.fromPrivateKey(kp.privKey)
    console.log(kp1)

    // KeyPair generated from Mnemonic and PrivateKey should be the same
    console.log("Should has the same value?", kp === kp1)
    
    // Generate secretKey to encrypt KeyPair
    // Symmetric.generateSecretKey(password, salt)
    let secretKey = Symmetric.generateSecretKey("123", "123")
    console.log("SecretKey:", secretKey)
    
    // Encrypt KeyPair into a ciphertext
    let encryptedKP = kp.encryptedString(secretKey)
    console.log("Encrypt:", encryptedKP)
    
    // Decrypt the ciphertext into KeyPair
    let decrypted = KeyPair.fromEncryptedKeyPair(encryptedKP, secretKey)
    console.log(decrypted)

    
    // Using KeyPair to Sign a message
    let msg = "Trang"
    let signature = kp.sign(msg)
    console.log("Signature:", signature)

    // Using KeyPair to verify a message
    console.log("Verified?:", kp.verify(msg, signature))


    let keyPair1 = secp256k1.genKeyPair()
    let keyPair2 = secp256k1.genKeyPair()

    let shared = keyPair1.derive(keyPair2.getPublic())
    let shared1 = keyPair2.derive(keyPair1.getPublic())
    console.log("Shared:", shared.toString(16))
    console.log("Shared1:", shared1.toString(16))
    console.log("PubKey:", keyPair1.getPublic())
    //console.log("KeyPair:", secp256k1.keyFromPrivate(keyPair1.getPrivate()))

    console.log("KeyPair from Private:", secp256k1.keyFromPrivate(kp.privKey).getPublic())
    console.log("KeyPair from Public:", secp256k1.keyFromPublic(Utils.hexToBytes(kp.pubKey), null).getPublic())




    // How to Use KeyPair to encrypt/decrypt KYC
    //
    // Encrypt KYC
    let userKP = KeyPair.fromPublicKey(kp.pubKey) // using PublicKey of receiver
    let kyc = "this is kyc data"
    let ciphertext = userKP.encrypt(kyc) // encrypt KYC data


    // Decrypt KYC on receiving side
    let recipientKP = KeyPair.fromPrivateKey(kp.privKey) // using PrivateKey of receiver
    let receivedKyc = recipientKP.decrypt(ciphertext) // decrypt KYC data

    if ( kyc != receivedKyc ) {
        console.log("Mismatch: ", kyc, receivedKyc)
    }
}
