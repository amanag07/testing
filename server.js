const express = require('express')
const request = require('request')
const cors = require('cors')

const app = express()


const port = process.env.PORT || 5000

app.use(cors())

// app.get('/api', cors(), (req,res) => {
//     request('https://api.test.paysafe.com/accountmanagement/v1/merchants', (err,response,body) => {
//         if(err)
//             return res.send('Cannot fetch api')
//         const parsedData = JSON.parse(body)
//         res.send(parsedData)
//     })
// })

app.post('/token', (req,res) => {
    console.log(req.data);
    console.log(req.email);
    console.log(req.params);
    // console.log(req.body.email);
    // console.log(req.data.email);
    request('https://private-anon-e107f296b0-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers',  (error, response, body) => {
        if(error)
            return res.send('Error, Cannot fetch')
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        res.send("Fetched!")
      });
})

// app.post('/createMerchant', (req,res) => {
//     request('https://api.test.paysafe.com/accountmanagement/v1/merchants', (error, response, body) => {
//         if(error)
//             return res.send('Cannot create merchant!')
//         res.send(body)
//     })
// })


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})