<script>
const recognizedDomains = [
  { regex: /^https?:\/\/www\.youtube\.com\/watch\?v=/, domainName: 'YouTube' },
  { regex: /^https?:\/\/youtu\.be/, domainName: 'YouTube' },
  { regex: /^https?:\/\/open\.spotify\.com/, domainName: 'Spotify' },
  { regex: /^https?:\/\/soundcloud\.com/, domainName: 'SoundCloud' },
  { regex: /^https?:\/\/(?:[^\/]+)\.bandcamp\.com/, domainName: 'Bandcamp' },
  { regex: /^https?:\/\/www\.nicovideo\.jp\/watch/, domainName: 'Niconico' },
  { regex: /^https?:\/\/www\.bilibili\.com\/video/, domainName: 'bilibili'},
  { reges: /^https?:\/\/piapro\.jp\/t/, domainName: 'piapro' }
]

export default {
  name: 'PlayLink',
  props: {
    songURL: String,
    isInactive: [Boolean, null]
  },
  computed: {
    domain() {
      let foundDomain = null;
      for (let {regex, domainName} of recognizedDomains) {
        if (this.songURL.match(regex)) {
          foundDomain = domainName;
          break;
        }
      }
      return foundDomain;
    },
    icon() {
      if (!this.domain) return 'mdi-open-in-new';
      switch (this.domain) {
        case 'YouTube':
          return 'mdi-youtube';
        case 'Spotify':
          return 'mdi-spotify';
        case 'SoundCloud':
          return 'mdi-soundcloud';
        case 'Bandcamp':
          return 'mdi-album';
        case 'Niconico':
        case 'bilibili':
        case 'piapro':
        default:
          return 'mdi-video';
      }
    }
  }
}
</script>

<template>

<a :href="songURL" :title="domain" target="_blank">
  <v-icon :icon="icon" :class="isInactive ? 'disabled' : null"></v-icon>
</a>

</template>