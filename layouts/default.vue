<template>
  <div>
    <div class="pad-space" />
    <nuxt />
    <section class="section has-text-centered footer">
      <p>
        <b>Open Source <a target="_blank" href="https://sharering.network/">ShareRing (SHR)</a> Paper Wallet Generator.</b><br>Made with ❤️ by the <a target="_blank" href="https://sharering.network/">ShareRing</a> Community.
      </p>
      <hr>
      <span class="icon is-large">
        <a target="_blank" class="link-button-icon" href="https://github.com/soliditydeveloper/shareringwallet.com"><fa class="fa-2x" :icon="['fab', 'github']" /></a>
      </span>
      <span class="icon is-large">
        <a target="_blank" class="link-button-icon" href="https://t.me/ShareRing"><fa class="fa-2x" :icon="['fab', 'telegram']" /></a>
      </span>
    </section>
  </div>
</template>

<style>
.pad-space {
  height: 70px;
}
.link-button-icon {
  height: 2em;
  color: grey;
}
</style>

<script>
export default {
  components: {}
}
</script>
