const express = require('express')
const app = express()
const port = 3000
const path = require("path")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {mergerPdfs} = require("./merge")
app.use('/static', express.static('public'))    


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
})

//To post this file we use multer. What is multer? Multer will help to upload a file in Node JS " First install multer ' npm install multer"

app.post('/merge', upload.array('pdfs',2), async (req, res, next)=>{
    let d = await mergerPdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)

    // console.log(req.files)
    // res.send({data:req.files})
    
  })
//Now we need a NODE JS utility so can can merge files
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
