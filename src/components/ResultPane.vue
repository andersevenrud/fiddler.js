<template>
  <aside data-type="result" class="pane">
    <div>
      <iframe>
      </iframe>
    </div>
  </aside>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: ['syntax', 'content', 'id'],

    mounted() {
      const createResult = (project) => {
        let result = require('html-loader!../iframe.html');

        result = result.replace('___FIDDLER__HTML___', project.html);
        result = result.replace('___FIDDLER__STYLES___', project.css);
        result = result.replace('___FIDDLER__JAVASCRIPT___', project.javascript);

        return result;
      };

      this.$root.$on('changed', (project) => {
        const iframe = this.$el.querySelector('iframe');
        iframe.src = 'data:text/html;charset=utf-8,' + escape(createResult(project));
      });
    }
  }
</script>
