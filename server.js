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

const fetchId = async (req) => {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const merchId = makeid(10)
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            url: 'https://api.test.paysafe.com/paymenthub/v1/customers',
            // url: 'https://private-anon-88e54fc067-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                'Simulator': '\'EXTERNAL\''
            },
            body: JSON.stringify({
                'merchantCustomerId': merchId,
                'locale': 'en_US',
                'firstName': req.body.firstName,
                'middleName': 'James',
                'lastName': 'Smith',
                'dateOfBirth': {
                    'year': 1981,
                    'month': 10,
                    'day': 24
                },
                'email': req.body.email,
                'phone': '777-444-8888',
                'ip': '192.0.126.111',
                'gender': 'M',
                'nationality': 'Canadian',
                'cellPhone': '777-555-8888'
            })
        }, async (error, response, body) => {
            if (error) {
                reject('Can not fetch');
            }
            try {
                // console.log(body);
                const data = JSON.parse(body)
                // console.log(data);
                const prevUser = await User.findOne({
                    email: req.body.email
                })
                if (prevUser) {
                    console.log('User already present')
                    userId = prevUser.customer_id
                    resolve(userId);
                } else {
                    // console.log();
                    const user = new User({
                        customer_id: data.id,
                        email: req.body.email,
                    })
                    // console.log('kkkkkk');
                    await user.save()
                    userId = user.customer_id
                    resolve(userId);
                }

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
            url: `https://api.test.paysafe.com/paymenthub/v1/customers/${userId}/singleusecustomertokens`,
            // url: `https://private-anon-4a3c49b921-paysafeapipaymenthubv1.apiary-mock.com/paymenthub/v1/customers/${userId}/singleusecustomertokens`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
                'Simulator': '\'EXTERNAL\''
            },
            body: "{  \"merchantRefNum\": \"Ref123\",  \"paymentTypes\": [    \"CARD\"  ]}"
        }, async (error, response, body) => {
            if (error) {
                reject(error);
            }
            // console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            // console.log('Response:', body);
            try {
                const data = JSON.parse(body)
                console.log(data.singleUseCustomerToken);
                const token = data.singleUseCustomerToken
                resolve(token);
            } catch (e) {
                reject(e)
            }

        });
    });
};

app.post('/token', async (req, res) => {
    let userId = await fetchId(req);
    const token = await fetchToken(userId);
    res.send(token);
})

app.post('/payment', (req, res) => {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const merchId = makeid(10)
    // console.log(req.body);
    request({
        method: 'POST',
        url: 'https://api.test.paysafe.com/paymenthub/v1/payments',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
            'Simulator': '\'EXTERNAL\''
        },
        body: JSON.stringify({
            'merchantRefNum': merchId,
            'amount': req.body.amount,
            'currencyCode': 'USD',
            'dupCheck': false,
            'settleWithAuth': false,
            'paymentHandleToken': req.body.token,
            'customerIp': '10.10.12.64',
            'description': 'Magazine Subscription'
        })
    }, function (error, response, body) {
        // console.log('Status:', response.statusCode);
        // console.log('Headers:', JSON.stringify(response.headers));
        // console.log('Response:', JSON.parse(body));
        res.send(JSON.parse(body))
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})