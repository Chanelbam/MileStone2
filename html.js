const css = `
<style>
    body {
        text-align: center;
        font-family: Calibri;
        background-color: #AD9D6B;
    }
    img {
        margin: 50px 10px 5px 0px;
    }
    button {
        border-radius: 10px;
        background-color: lightblue;
        border: thin black solid;
        padding: 10px;
        font-size: 20px;
    }
    h1 {
        padding-top: 20px;
    }
    h4 {
        background-color: #ba6863;
        padding: 5px;
        color: white;
    }
    #images {
        display: flex;
        justify-content: center;
    }
    figure {
        border: thin grey solid;
    }
    figcaption {
        background-color: #ba6863;
        color: white;
        padding: 5px;
        margin: 5px;
        font-size: 18px;
    }
    p {
        font-size: 12px;
    }
</style>
`

const mainPage = `
<head>
    <title>My lovely photo album</title>
    ${css}
</head>
<body>
    <h1>My lovely photo album</h1>
    <h4>Directions</h4>
    <h3>Apply a Grayscale Filter to an Image</h3>
    <p>Directions: Click the Upload button to add an image. Then click submit.</p>
    <form action="/api/upload" enctype="multipart/form-data" method="post" id="form">
        <div><input type="file" name="multipleFiles" accept="image/png" /></div>
    </form>
    <button type="submit" form="form">Submit</button>
`

const imageDisplay = `
<div id="images">
    <figure>
        <img src="http://localhost:4000/upload" width="500px">
        <figcaption>Before</figcaption>
    </figure>
    <figure>
        <img src="http://localhost:4000/gray" width="500px">
        <figcaption>After</figcaption>
    </figure>
</div>
`

const backPage = `
<head>
    ${css}
</head>
<body>
    <h3>Your Image Has Been Successfully Uploaded!</h3>
    <form action="/" method="post" id="backForm">
    </form>
    <button type="submit" form="backForm" name="back">Back</button>
</body>
`

module.exports = {
  backPage,
  mainPage,
  imageDisplay
}