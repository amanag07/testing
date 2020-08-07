$(document).ready(function () {
    $("button").click(function (e) {
        e.preventDefault();
        onClick()
    });
});
async function onClick() {
    let email = document.getElementById("email").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let phone = document.getElementById("phoneNum").value;
    //billing address
    let city = document.getElementById("city").value;
    let zip = document.getElementById("zip").value;
    let street = document.getElementById("address").value;
    let amount = document.getElementById("amount").value;
    let token = '';
    $.ajax({
        url: "https://boiling-oasis-11442.herokuapp.com/token",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            'email': email,
            'phone': phone,
            'firstName': firstName
        }),
        success: result => {
            token = result;
            billingAddress = {
                city,
                street,
                zip,
                country: 'US',
                state: 'CA'
            }
            customer = {
                firstName,
                lastName,
                email,
                phone,
                dateOfBirth: {
                    day: 6,
                    month: 3,
                    year: 1997
                }
            }

            function hash() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    let r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            checkout(token, billingAddress, customer, amount, hash())
        }
    });
}

function checkout(token, billingAddress, customer, amount, hash) {
    paysafe.checkout.setup(
        "cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ=", {
            "currency": "USD",
            "amount": parseInt(amount) * 100,
            "singleUseCustomerToken": token,
            "locale": "en_US",
            "customer": customer,
            "billingAddress": billingAddress,
            "environment": "TEST",
            "merchantRefNum": hash,
            "canEditAmount": false,
            "payout": false,
            "payoutConfig": {
                "maximumAmount": 10000
            },
            "merchantDescriptor": {
                "dynamicDescriptor": "XYZ",
                "phone": "1234567890"
            },
            "displayPaymentMethods": ["skrill", "card"],
            "paymentMethodDetails": {
                "paysafecard": {
                    "consumerId": "1232323"
                },
                "paysafecash": {
                    "consumerId": "123456"
                },
                "sightline": {
                    "consumerId": "123456",
                    "SSN": "123456789",
                    "last4ssn": "6789",
                    "accountId": "1009688222"
                },
                "vippreferred": {
                    "consumerId": "550726575",
                    "accountId": "1679688456"
                }
            }
        },
        function (instance, error, result) {
            if (result && result.paymentHandleToken) {
                $.ajax({
                    type: "POST",
                    url: "https://boiling-oasis-11442.herokuapp.com/payment",
                    contentType: "application/json",
                    data: JSON.stringify({
                        'token': result.paymentHandleToken,
                        'amount': result.amount
                    }, ),
                    success: data => {

                        if (data.status == "COMPLETED") {
                            instance.showSuccessScreen("Payment Successful!");
                        } else {
                            instance.showFailureScreen(
                                "Payment declined! Please try again."
                            );
                        }
                        setTimeout(() => {
                            window.location.replace(window.location.href);
                        }, 5000);

                    }
                });
            } else {
                console.error(`Error: Cannot complete payment`);
            }
        },
        function (stage, expired) {
            switch (stage) {
                case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
                case "PAYMENT_HANDLE_CREATED": // Handle the scenario
                case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
                case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
                default: // Handle the scenario
            }
        });
}
