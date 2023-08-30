<script>
const recognizedDomains = [
  { 
    regex: /^https?:\/\/www\.youtube\.com\/watch\?v=/, 
    domainName: 'YouTube',
    cssClass: 'yt'
  },
  { 
    regex: /^https?:\/\/youtu\.be/, 
    domainName: 'YouTube',
    cssClass: 'yt'
  },
  { 
    regex: /^https?:\/\/open\.spotify\.com/, 
    domainName: 'Spotify',
    cssClass: 'sp'
  },
  { 
    regex: /^https?:\/\/soundcloud\.com/, 
    domainName: 'SoundCloud',
    cssClass: 'sc' 
  },
  { 
    regex: /^https?:\/\/(?:[^\/]+)\.bandcamp\.com/, 
    domainName: 'Bandcamp',
    cssClass: 'bc'
  },
  { 
    regex: /^https?:\/\/www\.nicovideo\.jp\/watch/, 
    domainName: 'Niconico',
    cssClass: 'nn'
  },
  { 
    regex: /^https?:\/\/www\.bilibili\.com\/video/, 
    domainName: 'bilibili',
    cssClass: 'bb'
  },
  { 
    regex: /^https?:\/\/piapro\.jp\/t/, 
    domainName: 'piapro',
    cssClass: 'pp'
  }
]

export default {
  name: 'PlayLink',
  props: {
    songURL: String,
    isInactive: [Boolean, null]
  },
  computed: {
    match() {
      let foundMatch = null;
      for (let obj of recognizedDomains) {
        if (this.songURL.match(obj.regex)) {
          foundMatch = obj;
          break;
        }
      }
      return foundMatch;
    },
    domain() {
      return this.match?.domainName;
    },
    cssClass() {
      return this.match?.cssClass;
    }
  }
}
</script>

<template>

<a :href="songURL" :title="domain" target="_blank">
  <span class="iconlink" :class="cssClass" :title="domain"></span>
</a>

</template>