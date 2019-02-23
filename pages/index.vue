<template>
  <div class="section">
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="!isMnemonicConfirmed"
        key="1"
      >
        <div class="container title-box has-text-centered">
          <h1 class="title is-3 is-spaced">
            Create your new shiny ShareRing Paper Wallet 😎
          </h1>
          <hr>
          <h2 class="subtitle is-5">
            Here is your mnemonic phrase 🔑 which can be used in the future to access your wallet. We do not store any of your keys.
          </h2>
        </div>
        <div class="container has-text-centered content-box">
          <textarea 
            v-model="mnemonic" 
            class="textarea mnemonic-field has-text-weight-bold has-fixed-size has-text-centered is-spaced" 
            placeholder="Mnemonic Key"
            rows="2"
            readonly 
          />
          <br>

          <div class="field agreement-wrapper">
            <input 
              id="mnemonicCheckbox"
              v-model="isMnemonicSaved"
              class="is-checkradio default-checkbox"
              type="checkbox"
              name="mnemonicCheckbox"
              :checked="isMnemonicSaved"
            >
            <label 
              for="mnemonicCheckbox"
            >
              <i>I wrote down my <b>secret</b> mnemonic phrase.</i>
            </label>
            <br>
          </div>

          <a 
            class="button is-outlined"
            @click="refreshMnemonic"
          ><span class="icon"><fa :icon="['fas', 'dice']" /></span><span>Randomize</span></a>
          <a 
            class="button confirm-button is-primary"
            :disabled="!isMnemonicSaved"
            @click="confirmMnemonic"
          ><span>Confirm</span><span class="icon"><fa :icon="['fas', 'check']" /></span></a>
        </div>
      </div>
      <div
        v-else
        key="2"
      >
        <div class="container title-box has-text-centered">
          <h1 class="title is-3 is-spaced">
            Fantastic! 👏
          </h1>
          <hr>
          <h2 class="subtitle is-5">
            Here is your wallet information. Please write it down and store it in a safe place. ✍️
          </h2>
          <h3 class="subtitle is-6 has-text-danger">
            <span class="icon"><fa :icon="['fas', 'exclamation-triangle']" /></span>
            <span>We do <b>not</b> store any of your keys on our servers.</span>
            <span class="icon"><fa :icon="['fas', 'exclamation-triangle']" /></span>
          </h3>
        </div>
        <div class="container has-text-centered content-box">
          <div class="field">
            <label class="label">Your address for receiving SHR</label>
            <div class="control has-icons-right">
              <input 
                v-model="wallet.address" 
                type="text"
                class="input has-fixed-size has-text-centered is-spaced" 
                placeholder="Address"
                readonly 
              >
              <span class="icon is-right"><fa :icon="['fas', 'user']" /></span>
            </div>
          </div>
          <br>

          <div class="field">
            <label class="label">Your private key (alt. to mnemonics)</label>
            <div class="control has-icons-right">
              <input 
                v-model="wallet.privateKey" 
                type="text"
                class="input has-fixed-size has-text-centered is-spaced" 
                placeholder="Address"
                readonly 
              >
              <span class="icon is-right"><fa :icon="['fas', 'key']" /></span>
            </div>
          </div>
          <br>

          <a 
            class="button is-outlined"
            target="_blank"
            href="https://t.me/ask_ai"
          >
            <span class="icon"><fa :icon="['fas', 'question']" /></span><span>Support</span>
          </a>

          <a 
            class="button is-danger"
            @click="goBackToMain"
          ><span>Go Back</span><span class="icon"><fa :icon="['fas', 'times']" /></span></a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      isMnemonicSaved: false,
      isMnemonicConfirmed: false,
      mnemonic: ''
    }
  },
  computed: {
    wallet: function() {
      return this.$shrKeys.createAccount(this.mnemonic)
    }
  },
  mounted: function() {
    this.mnemonic = this.$shrKeys.KeyPair.createMnemonic('English', 'secp256k1')
  },
  methods: {
    switchMnemonicSaved: function() {
      this.isMnemonicSaved = !this.isMnemonicSaved
    },
    refreshMnemonic: function() {
      this.isMnemonicSaved = false
      this.mnemonic = this.$shrKeys.KeyPair.createMnemonic(
        'English',
        'secp256k1'
      )
    },
    confirmMnemonic: function() {
      if (!this.isMnemonicSaved) {
        return
      }
      this.isMnemonicConfirmed = true
    },
    goBackToMain: function() {
      this.isMnemonicConfirmed = false
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.title-box {
  max-width: 420px;
  margin-bottom: 38px;
}
.content-box {
  max-width: 400px;
}
.mnemonic-field {
  margin-bottom: 0px;
}
.agreement-wrapper {
  margin-bottom: 35px !important;
}
.default-checkbox {
  outline: none;
}
</style>
