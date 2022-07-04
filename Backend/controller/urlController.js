require('dotenv').config();
const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../models/url')

const shortUrl = async (req, res) => {
    const { longUrl } = req.body
    console.log(longUrl)
    const urlCode = shortid.generate()
    const baseUrl = "http://localhost:8000"
    if (validUrl.isUri(longUrl)) {
        try {

            const shortUrl = baseUrl + '/' + urlCode
            let url = new Url({
                "longUrl": longUrl,
                "shortUrl": shortUrl,
                "user": req.user.result
            })
            url.save()
            res.send({"converted":true,"url":url});

        }
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    }
    else{
        res.json({"converted":false,"errMsg":"Invalid URL"})
    }

}

getUrls = async (req,res)=>{
    let urls = await Url.find({"user":req.user.result})
    res.send(urls)
}

visitUrl = async(req,res)=>{
    let shortUrl = req.params.url
    console.log(shortUrl)
    let url = await Url.findOneAndUpdate({"shortUrl":`http://localhost:${process.env.SERVER_PORT}/${shortUrl}`},{$inc:{"visits":1}})

    console.log(url)
    res.redirect(url.longUrl);

}

const deleteUrl= (req,res)=>
{
    let id = req.params.id

    Url.findByIdAndRemove(id)
    .then((result)=>{
        res.send(true)
    })
    .catch((err)=>{
        res.send(false)
        console.log(err)
    })
}
module.exports = { shortUrl , getUrls , visitUrl , deleteUrl}