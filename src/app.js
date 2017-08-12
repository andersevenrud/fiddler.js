/*!
 * fiddler.js
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Anders Evenrud <andersevenrud@gmail.com>
 */
import axios from 'axios';
import Vue from 'vue';
import Router from './router.js';
import MainMenu from './components/MainMenu.vue';

let currentProject;
new Vue({
  router: Router,

  components: {
    mainmenu: MainMenu
  },

  methods: {
    save: function() {
      axios.post(`/project/${currentProject.id}`, {
        css: currentProject.css,
        javascript: currentProject.javascript,
        html: currentProject.html
      }).then(() => {

        this.$emit('saved', currentProject);
      });
    },

    editorChanged: function(id, syntax, content) {
      currentProject[syntax] = content;

      this.$emit('changed', currentProject);
    }
  },

  created() {
    const id = this.$route.params.id;
    axios.get('/project/' + id).then((response) => {
      const project = response.data;
      project.id = this.$route.params.id;
      currentProject = project;

      this.$emit('loaded', currentProject);
    });
  }

}).$mount('#app');
