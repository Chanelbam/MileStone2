const http = require('http');
const formidable = require('formidable');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const IOhandler = require("./IOhandler");
const { grayScale } = require('./IOhandler');
const { backPage, mainPage, imageDisplay } = require('./html');

let fileName;

const server = http.createServer((req, res) => {


  if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
    const uploadDir = path.join(__dirname, "upload");
    const grayScaleDir = path.join(__dirname, "grayscaled")
    const form = formidable({ multiples: true, uploadDir: uploadDir, keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      fileName = files.multipleFiles.name
      fs.rename(files.multipleFiles.path, path.join(uploadDir, fileName), (err) => {
        if (err) throw err;
        grayScale(uploadDir + "/" + fileName, grayScaleDir)
          .catch(err => console.log(err))
      });

      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(backPage)
      res.end()
    });

    return;
  } else if (req.url === '/upload') {
    fs.readFile("upload/" + fileName, function (err, content) {
      if (err) {
        res.writeHead(400, { 'Content-type': 'text/html' })
        console.log(err);
        res.end("No such image");
      } else {

        //specify the content type and in the response there will be an image

        res.writeHead(200, { 'Content-type': 'image/png' })
        res.end(content)
      }
    });
    return;
  } else if (req.url === '/gray') {
    fs.readFile("grayscaled/" + fileName, function (err, content) {
      if (err) {
        res.writeHead(400, { 'Content-type': 'text/html' })
        console.log(err);
        res.end("Image not in file");
      } else {

        //specify the content type in the response will be an image

        res.writeHead(200, { 'Content-type': 'image/png' })
        res.end(content)
      }
    });
    return;
  }

  console.log("upload file name: " + fileName)

  // show a file upload form

  res.writeHead(200, { 'content-type': 'text/html' });
  res.write(mainPage);
  if (fileName != undefined) {
    res.write(imageDisplay)
  }
  res.end(`</body>`)
});

server.listen(4000, () => {
  console.log('Server listening on http://localhost:4000/ ...');
});