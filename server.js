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
const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.get('/project/:id', (req, res, next) => {
  const id = String(req.params.id).replace(/[^A-z0-9\-]/g, '');
  let src = path.join(__dirname, 'projects/' + id + '.json');
  console.log('?', src);
  if ( !fs.existsSync(src) ) {
    src = path.join(__dirname, 'src/example.json');
  }
  console.log('>', src);
  res.json(fs.readJsonSync(src));
});

app.post('/project/:id', (req, res, next) => {
  const id = String(req.params.id).replace(/[^A-z0-9\-]/g, '');
  const dest = path.resolve(__dirname, 'projects/' + id + '.json');
  console.log('<', dest);
  fs.writeJsonSync(dest, req.body);

  res.send({
    success: true
  });
});

app.listen(8080);
