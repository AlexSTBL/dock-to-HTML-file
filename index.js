const express = require('express')
var mammoth = require("mammoth")


const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');

const app = express()
const port = 3001


          
app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));




app.get('/', (req, res) => {
    res.send("Hello from Express")
})

app.get('/form', (req,res) => {
    
})

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})

app.post('/upload-avatar', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            var html = ""
            
            let avatar = req.files.avatar;
            
            avatar.mv('./uploads/' + avatar.name).then(function(r) {

            mammoth.convertToHtml({path: "./uploads/" + avatar.name})
                .then(function(result){
                    html = result.value;
                    console.log(html)
                    var messages = result.messages;

                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: avatar.name,
                            mimetype: avatar.mimetype,
                            size: avatar.size, 
                            html_text: html 
                        }
                    });
                })    
            
            //     .done();

            
        })
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

