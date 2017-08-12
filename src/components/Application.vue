<template>
  <content>
    <EditorPane syntax="html" :id="project.id" :content="project.html" />
    <EditorPane syntax="javascript" :id="project.id" :content="project.javascript" />
    <EditorPane syntax="css" :id="project.id" :content="project.css" />

    <aside class="handle" v-on:mousedown="startResize"></aside>

    <ResultPane :id="project.id" />
  </content>
</template>

<script>
  import MainMenu from './MainMenu.vue';
  import ResultPane from './ResultPane.vue';
  import EditorPane from './EditorPane.vue';

  export default {
    components: {
      MainMenu,
      ResultPane,
      EditorPane
    },

    methods: {
      startResize: (ev) => {
        const maxWidth = Math.round(window.innerWidth * 0.9);
        const aside = document.querySelector('aside.pane');
        aside.classList.add('resizing');

        let currentWidth = aside.offsetWidth;
        let startX = ev.clientX;

        const onMouseMove = (ev) => {
          let diffX = startX - ev.clientX;
          const newWidth = Math.min(maxWidth, Math.max(300, currentWidth + diffX));

          aside.style.width = `${newWidth}px`;
          aside.style.minWidth = `${newWidth}px`;
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          aside.classList.remove('resizing');
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        console.error(ev.target, aside.offsetWidth)
      }
    },

    mounted() {
      this.$root.$on('loaded', (project) => {
        console.info('Loading new project into Application', project);
        this.project = Object.assign({}, this.project, project);
      });
    },

    data() {
      return {
        project: {
          id: null,
          css: '',
          html: '',
          javascript: ''
        }
      };
    }
  }
</script>
