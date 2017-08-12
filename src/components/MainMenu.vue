<template>
  <ul>
    <li class="entry" v-on:click="select($event, 0)"><span>HTML</span></li>
    <li class="entry" v-on:click="select($event, 1)"><span>JavaScript</span></li>
    <li class="entry" v-on:click="select($event, 2)"><span>CSS</span></li>
    <li class="filler"></li>
    <li class="icon right" v-on:click="save"><span class="icon-download3"></span></li>
    <!--
    <li class="icon right"><span class="icon-pencil"></span></li>
    <li class="icon right"><span class="icon-bin2"></span></li>
    <li class="icon right"><span class="icon-cog"></span></li>
    -->
  </ul>
</template>

<script>
  export default {

    methods: {
      save: function() {
        this.$root.save();
      },

      select: function(event, index) {
        const entries = document.querySelectorAll('nav > ul > li.entry');
        Array.from(entries).forEach((el, idx) => {
          if ( idx === index ) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });

        const panes = document.querySelectorAll('content > section.editor');
        Array.from(panes).forEach((el, idx) => {
          const style = idx === index ? 'block' : 'none';
          el.style.display = style;
        });
      }
    },

    mounted() {
      this.select(null, 0);
    }

  }
</script>
