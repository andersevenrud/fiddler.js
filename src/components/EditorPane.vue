<template>
  <section :data-type="syntax" class="editor pane">
    <div>
      <div :id="'editor-' + syntax">{{ content }}</div>
    </div>
  </section>
</template>

<script>
  import Ace from 'brace';

  const theme = 'monokai'; // FIXME

  export default {
    props: ['syntax', 'content', 'id'],

    watch: {
      content: function(data) {
        if ( this.editor ) {
          this.editor.getSession().setValue(data);
        }
      }
    },

    mounted() {
      let saveTimeout;
      require('brace/mode/' + this.syntax);
      require('brace/theme/' + theme);

      const editor = Ace.edit('editor-' + this.syntax);
      editor.getSession().setMode('ace/mode/' + this.syntax);
      editor.getSession().on('change', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          this.$root.editorChanged(this.id, this.syntax, editor.getValue());
        }, 1000);
      });
      editor.setTheme('ace/theme/' + theme);

      this.editor = editor;
    }
  }
</script>

