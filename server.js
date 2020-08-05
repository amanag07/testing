// const express = require('express')
// const request = require('request')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const User = require('./models/User')

// const app = express()

// mongoose.connect('mongodb://test12:test12@ds115110.mlab.com:15110/roiim', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log('Connected to DB');
// })
// const port = process.env.PORT || 5000

// app.use(cors())
// app.use(bodyParser.json())

// app.post('/token', (req, res) => {
//     let userId = ''

//     request({
//         method: 'POST',
//         url: 'https://private-anon-8a1a964372-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
//             'Simulator': '\'EXTERNAL\''
//         },
//         body: "{  \"merchantCustomerId\": \"mycustomer10\",  \"locale\": \"en_US\",  \"firstName\": req.body.firstName,  \"middleName\": \"James\",  \"lastName\": \"Smith\",  \"dateOfBirth\": {    \"year\": 1981,    \"month\": 10,    \"day\": 24  },  \"email\": req.body.email,  \"phone\": \"777-444-8888\",  \"ip\": \"192.0.126.111\",  \"gender\": \"M\",  \"nationality\": \"Canadian\",  \"cellPhone\": \"777-555-8888\"}"
//     }, async (error, response, body) => {
//         if (error)
//             return res.send('Error, Cannot fetch')
//         try {
//             const data = JSON.parse(body)
//             const prevUser = await User.findOne({
//                 customer_id: data.id
//             })
//             if (prevUser) {
//                 console.log('User already present')
//                 userId = prevUser.customer_id
//                 return;
//             }
//             const user = new User({
//                 customer_id: data.id,
//                 email: req.body.email,
//             })
//             console.log(user);
//             await user.save()
//             userId = user.customer_id
//             return;
//         } catch (e) {
//             return res.status(500).send('Error: Cannot fetch token')
//         }
//     });


//     request({
//         method: 'POST',
//         url: `https://private-anon-c9251afe51-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers/${userId}/singleusecustomertokens`,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
//             'Simulator': '\'EXTERNAL\''
//         },
//         body: "{  \"merchantRefNum\": \"Ref123\",  \"paymentTypes\": [    \"CARD\"  ]}"
//     }, async (error, response, body) => {
//         console.log('Status:', response.statusCode);
//         console.log('Headers:', JSON.stringify(response.headers));
//         console.log('Response:', body);
//         const data = JSON.parse(body)
//         const token = data.id
//         res.send(token)
//     });
// })

// app.post('/payment', (req,res) => {

//     request({
//         method: 'POST',
//         url: 'https://private-anon-77c412b121-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/paymenthandles',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
//           'Simulator': '\'EXTERNAL\''
//         },
//         body: "{  \"merchantRefNum\": \"merchantRefNum-101\",  \"transactionType\": \"PAYMENT\",  \"card\": {    \"cardNum\": \"5191330000004415\",    \"cardExpiry\": {      \"month\": 10,      \"year\": 2020    },    \"cvv\": \"111\",    \"holderName\": \"poorna\"  },  \"paymentType\": \"CARD\",  \"amount\": 190,  \"currencyCode\": \"GBP\",  \"customerIp\": \"172.0.0.1\",  \"billingDetails\": {    \"nickName\": \"Home\",    \"street\": \"100 Queen\",    \"street2\": \"Unit 201\",    \"city\": \"Toronto\",    \"zip\": \"M5H 2N2\",    \"country\": \"CA\"  },  \"returnLinks\": [    {      \"rel\": \"on_completed\",      \"href\": \"https://US_commerce_site/payment/return/success\",      \"method\": \"GET\"    },    {      \"rel\": \"on_failed\",      \"href\": \"https://US_commerce_site/payment/return/failed\",      \"method\": \"GET\"    }  ]}"
//       }, function (error, response, body) {
//         console.log('Status:', response.statusCode);
//         console.log('Headers:', JSON.stringify(response.headers));
//         console.log('Response:', body);
//       });


//     const customer_id = req.body.token
//     request({
//         method: 'POST',
//         url: `https://private-anon-88e54fc067-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers/${customer_id}/paymenthandles`,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
//           'Simulator': '\'EXTERNAL\''
//         },
//         body: "{  \"merchantRefNum\": \"xzcxzcwqeqwewewqer\",  \"paymentType\": \"CARD\",  \"currencyCode\": \"GBP\",  \"customerIp\": \"10.10.12.64\",  \"billingDetailsId\": \"786cf0cd-4296-43ce-8a57-5f4675e3fafd\",  \"card\": {    \"cardNum\": \"4222222222222\",    \"cardExpiry\": {      \"month\": \"12\",      \"year\": \"2021\"    },    \"cvv\": \"111\"  }}"
//       }, function (error, response, body) {
//         console.log('Status:', response.statusCode);
//         console.log('Headers:', JSON.stringify(response.headers));
//         console.log('Response:', body);
//       });
// })

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })

const express = require('express')
const request = require('request')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User')
 
const app = express()
 
 
 
mongoose.connect('mongodb://test12:test12@ds115110.mlab.com:15110/roiim', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to DB');
})
const port = process.env.PORT || 5000
 
app.use(cors())
app.use(bodyParser.json())
 
const fetchId = async(req) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            // url: 'https://api.test.paysafe.com/paymenthub/v1/customers',
            url: 'https://private-anon-88e54fc067-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                'Simulator': '\'EXTERNAL\''
            },
            body: "{  \"merchantCustomerId\": \"mycustomer10\",  \"locale\": \"en_US\",  \"firstName\": req.body.firstName,  \"middleName\": \"James\",  \"lastName\": \"Smith\",  \"dateOfBirth\": {    \"year\": 1981,    \"month\": 10,    \"day\": 24  },  \"email\": req.body.email,  \"phone\": \"777-444-8888\",  \"ip\": \"192.0.126.111\",  \"gender\": \"M\",  \"nationality\": \"Canadian\",  \"cellPhone\": \"777-555-8888\"}"
        }, async (error, response, body) => {
            if (error){
                reject('Can not fetch');
            }
            try {
                const data = JSON.parse(body)
                const prevUser = await User.findOne({
                    customer_id: data.id
                })
                if (prevUser) {
                    console.log('User already present')
                    userId = prevUser.customer_id
                    resolve('User already present');
                }
                const dat = JSON.parse(body)
                const user = new User({
                    customer_id: dat.id,
                    email: req.body.email,
                })
                console.log(user);
                await user.save()
                userId = user.customer_id
                resolve(userId);
            } catch (e) {
                reject(e);
            }
        });
    });
}
 
const fetchToken = async (userId) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            // url: `https://api.test.paysafe.com/paymenthub/v1/customers/${userId}/singleusecustomertokens`,
            url: `https://private-anon-4a3c49b921-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers/${userId}/singleusecustomertokens`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                'Simulator': '\'EXTERNAL\''
            },
            body: "{  \"merchantRefNum\": \"Ref123\",  \"paymentTypes\": [    \"CARD\"  ]}"
        }, async (error, response, body) => {
            if(error) {
                reject(error);
            }
            // console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            // console.log('Response:', body);
            try {
                const data = JSON.parse(body)
                const token = data.id
                resolve(token);
            } catch(e) {
                reject(e)
            }
            
        });
    });
};
 
app.post('/token', async(req, res) => {
    let userId = await fetchId(req);
    const token = await fetchToken(userId);
    res.send(token);
})
 
app.post('/payment', (req,res) => {
 
    // request({
    //     method: 'POST',
    //     url: 'https://private-anon-77c412b121-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/paymenthandles',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
    //       'Simulator': '\'EXTERNAL\''
    //     },
    //     body: "{  \"merchantRefNum\": \"merchantRefNum-101\",  \"transactionType\": \"PAYMENT\",  \"card\": {    \"cardNum\": \"5191330000004415\",    \"cardExpiry\": {      \"month\": 10,      \"year\": 2020    },    \"cvv\": \"111\",    \"holderName\": \"poorna\"  },  \"paymentType\": \"CARD\",  \"amount\": 190,  \"currencyCode\": \"GBP\",  \"customerIp\": \"172.0.0.1\",  \"billingDetails\": {    \"nickName\": \"Home\",    \"street\": \"100 Queen\",    \"street2\": \"Unit 201\",    \"city\": \"Toronto\",    \"zip\": \"M5H 2N2\",    \"country\": \"CA\"  },  \"returnLinks\": [    {      \"rel\": \"on_completed\",      \"href\": \"https://US_commerce_site/payment/return/success\",      \"method\": \"GET\"    },    {      \"rel\": \"on_failed\",      \"href\": \"https://US_commerce_site/payment/return/failed\",      \"method\": \"GET\"    }  ]}"
    //   }, function (error, response, body) {
    //     console.log('Status:', response.statusCode);
    //     console.log('Headers:', JSON.stringify(response.headers));
    //     console.log('Response:', body);
    //   });
 
 
    // const customer_id = req.body.token
    // request({
    //     method: 'POST',
    //     url: `https://private-anon-88e54fc067-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers/${customer_id}/paymenthandles`,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
    //       'Simulator': '\'EXTERNAL\''
    //     },
    //     body: "{  \"merchantRefNum\": \"xzcxzcwqeqwewewqer\",  \"paymentType\": \"CARD\",  \"currencyCode\": \"GBP\",  \"customerIp\": \"10.10.12.64\",  \"billingDetailsId\": \"786cf0cd-4296-43ce-8a57-5f4675e3fafd\",  \"card\": {    \"cardNum\": \"4222222222222\",    \"cardExpiry\": {      \"month\": \"12\",      \"year\": \"2021\"    },    \"cvv\": \"111\"  }}"
    //   }, function (error, response, body) {
    //     console.log('Status:', response.statusCode);
    //     console.log('Headers:', JSON.stringify(response.headers));
    //     console.log('Response:', body);
    //   });
})
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})