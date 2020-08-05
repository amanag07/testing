const express = require('express')
const request = require('request')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

app.get('/api', cors(), (req,res) => {
    request('https://api.test.paysafe.com/accountmanagement/v1/merchants', (err,response,body) => {
        if(err)
            return res.send('Cannot fetch api')
        const parsedData = JSON.parse(body)
        res.send(parsedData)
    })
})

app.post('/createMerchant', (req,res) => {
    request('https://api.test.paysafe.com/accountmanagement/v1/merchants', (error, response, body) => {
        if(error)
            return res.send('Cannot create merchant!')
        res.send(body)
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})