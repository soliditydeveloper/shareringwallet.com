import elliptic from "elliptic";
const secp256k1 = new (elliptic.ec)("secp256k1"); // eslint-disable-line
import CryptoJS from 'crypto-js';

const KEY_LENGTH = 256; // 128/32 or 256/32 or 512/32

/**
 * encrypt *plaintext* using *secretKey*, supposedly generated uisng *generateSecretKey* function
 * @param {string} plaintext - text to be encrypted
 * @param {string} secretKey - key used to encrypt plaintext
 * @return {string} hex encoded ciphertext
 */
const encrypt = (plaintext, secretKey, iv) => {
    let encryptedText = CryptoJS.AES.encrypt(plaintext, secretKey, {mode: CryptoJS.mode.CTR, iv: iv} )

    return encryptedText.toString();
}


/**
 * decrypt *ciphertext* using *secretKey*, supposedly generated using *generateSecretKey* function
 * @param {string} ciphertext - hex encoded ciphertext to be decrypted
 * @param {string} secretKey - key used to decrypt ciphertext
 * @return {string} plaintext
 */
const decrypt = (ciphertext, secretKey, iv) => {
    let decryptedBytes = CryptoJS.AES.decrypt(ciphertext, secretKey, {mode: CryptoJS.mode.CTR, iv: iv} );

    let decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return decryptedText.toString();
}

/**
 * generate secret key
 * @param {string} password - user input password
 * @param {string} salt - system salt
 * @return {string} - hex presentation. Array length = KEY_LENGTH / 8
 */
const generateSecretKey = (password, salt) => {
    //return pbkdf2.pbkdf2Sync(password, salt, 1, KEY_LENGTH/8, 'sha512')
    return CryptoJS.PBKDF2(password, salt,
                           {
                              keySize: KEY_LENGTH/32,
                              iterations: 100
                           }).toString()
}




export default { encrypt, decrypt, generateSecretKey};


if ( require.main == module ){
    console.log("Generate key...");
    key = generateSecretKey("ShareRingiscaring", "220NguyenDinhChieu");
    console.log(key);
    
    plaintext = "ShareRing";

    ciphertext = encrypt(plaintext, key.toString());
    console.log("Encrypted data: ", ciphertext);


    result = decrypt(ciphertext, key.toString());
    console.log("Decrypted data:", result);
}
