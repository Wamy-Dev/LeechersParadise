require('dotenv').config();
//firebase imports
const {
	firebaseApp
} = require('./config/firebase.config')
const {
	getAuth,
	createUserWithEmailAndPassword
} = require('firebase/auth')
const admin = require('firebase-admin');
const {firebaseAdmin} = require('./config/firebaseadmin.config');
const {
	getFirestore,
	addDoc,
	collection,
	getDocs,
	deleteDoc,
	where,
	query
} = require('firebase/firestore')
const fireAuth = getAuth(firebaseApp)
const fireStore = getFirestore(firebaseApp) 
//general
const axios = require('axios');
var crypto = require('crypto');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const requestIp = require('request-ip');
const rateLimit = require('express-rate-limit')
var queue = require('express-queue');
const compression = require('compression')
var MongoStore = require('rate-limit-mongo');
//rd
const RDToken = process.env.APITOKEN
//nodemailer
var nodemailer = require('nodemailer');
const contactEmail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "leechersparadise@gmail.com",
		pass: process.env.GMAIL, //app specific password if needed. Go to https://support.google.com/accounts/answer/185833?hl=en
	},
});
contactEmail.verify((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log("API Started.");
	}
});
//limiter
const limiter = rateLimit({
	skipFailedRequests: true,
	windowMs: 24 * 60 * 60 * 1000, // 24 hours
	max: async (req, response) => {
		if (req.body.user == true) return 0
		else return 10 //change here when doing ip
	},
	keyGenerator: (req, res) => {
		return req.clientIp
	},
	handler: (req, res, next, options) => {
		res.status(429).json({
			status: 429,
			message: "You have used up your 10 downloads. Please try again in 24 hours."
		})
	},
	store: new MongoStore({
		uri: '',
		expireTimeMs: 24 * 60 * 60 * 1000,
		errorHandler: console.error.bind(null, 'rate-limit-mongo')
	  }),
})
app.use(requestIp.mw());
app.use('/startdownload', queue({ activeLimit: 32, queuedLimit: -1 }));
app.use(helmet());
app.use(express.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'https://leechersparadise.com');//CHANGE THIS TO '*' WHEN DEV TESTING
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,accept,Content-Disposition');
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/link', limiter)
app.use('/torrent', limiter)
app.use(compression())
app.get('/', (req, res) => {
	res.status(200).send("online");
})
//admin
app.get('/admin', async (req, res) => {
	res.send(await getDonationValues())
})
app.post('/admin', async (req, res) => {
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (req.body.apiKey === expectedApiKey) {
		try {
			await saveDonationValues(req.body.dollarvalue, req.body.dollargoal);
		} catch (e) {
			console.error("Error saving donation values!", e);
		}
		res.status(200).send(`You set the donationvalue at ${req.body.dollarvalue} (this should be the total donated so far), and the donationgoal at ${req.body.dollargoal}.`);
		return req.body.dollarvalue, req.bodydollargoal;
	} else {
		res.status(401).send('Unauthorized');
	}
})
//
app.post("/link", async (req, res) => {
	const premiumLink = req.body.downloadLink;
	const password = req.body.password;
	const apiKey = req.body.apiKey;
	const ip = req.clientIp;
	const user = req.body.user
	console.log('Link requested from: ' + ip)
	console.log(premiumLink)		
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (apiKey === expectedApiKey) {
		try {
			const response = await axios({
				method: 'post',
				url: 'https://api.real-debrid.com/rest/1.0/unrestrict/link',
				headers: {
					Authorization: `Bearer ${RDToken}`
				},
				data: `link=${premiumLink}&password=${password}`
			})
			const responsedata = response.data
			function encrypt(text, password) {
				const algorithm = 'aes256';
				var cipher = crypto.createCipher(algorithm, password);  
				var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
				return encrypted;
			}
			if (user && responsedata.download) {
				var datalink = encrypt(responsedata.download, responsedata.id)
				await res.status(200).json({
					status: 200,
					id: responsedata.id,
					premiumLink: datalink,
					filesize: responsedata.filesize,
					filename: responsedata.filename,
				});
			}
			if (!user && responsedata.filesize > 53687091200 && responsedata.download) {//if user is not logged in and download is ready and filesize is greater than 50gb, deny download
				await res.status(402).json({
					status: 402,
					message: "File too large for non-premium user. Please upgrade to bypass this."
				})
			}
			if (!user && responsedata.filesize < 53687091200 && responsedata.download) {
				//if user is not logged in and download is ready and filesize is less than 50gb, give download
				var datalink = encrypt(responsedata.download, responsedata.id)
				await res.status(200).json({
					status: 200,
					id: responsedata.id,
					premiumLink: datalink,
					filesize: responsedata.filesize,
					filename: responsedata.filename,
				});
			}	
		} catch (e) {
			console.log(e.response.data)
			if (e.response.data.error_code === 19) {
				await res.status(404).json({
					status: 404,
					message: "Hoster is temporarily unavailable."
				})
			}
			else if (e.response.data.error_code === 11) {
				await res.status(404).json({
					status: 404,
					message: "Something went wrong on our end."
				})
			}
			else if (e.response.data.error_code === 28) {
				await res.status(404).json({
					status: 404,
					message: "File is not allowed."
				})
			}
			else if (e.response.data.error_code === 24) {
				await res.status(404).json({
					status: 404,
					message: "File is unavailable."
				})
			}
			else if (e.response.data.error_code === 16) {
				await res.status(404).json({
					status: 404,
					message: "Hoster is not supported."
				})

			} else {
				await res.status(404).json({
					status: 404,
					message: "Link is invalid."
				})
			}
			}
	} else {
		res.status(401).send("Unauthorized")
	}
});
app.post("/torrent", async (req, res) => {
	const premiumLink = req.body.downloadLink;
	const user = req.body.user;
	const apiKey = req.body.apiKey;
	const ip = req.clientIp;
	console.log('Link requested from: ' + ip)		
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (apiKey === expectedApiKey) {
		try {
			const torrentL = await axios({
				method: 'post',
				url: 'https://api.real-debrid.com/rest/1.0/torrents/addMagnet',
				headers: {
					Authorization: `Bearer ${RDToken}`,
				},
				data: `magnet=${premiumLink}`
			})
			const torrentdata = torrentL.data
			const selectL = await axios({
				method: 'post',
				url: `https://api.real-debrid.com/rest/1.0/torrents/selectFiles/${torrentdata.id}`,
				headers: {
					Authorization: `Bearer ${RDToken}`,
				},
				data: `files=all`
			})
			const infoL = await axios({
				method: 'get',
				url: `https://api.real-debrid.com/rest/1.0/torrents/info/${torrentdata.id}`,
				headers: {
					Authorization: `Bearer ${RDToken}`,
				},
			})
			const infoData = infoL.data
			const response = await axios({
				method: 'post',
				url: 'https://api.real-debrid.com/rest/1.0/unrestrict/link',
				headers: {
					Authorization: `Bearer ${RDToken}`,
				},
				data: `link=${infoData.links[0]}`
			})
			const responsedata = response.data
			function encrypt(text, password) {
				const algorithm = 'aes256';
				var cipher = crypto.createCipher(algorithm, password);  
				var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
				return encrypted;
			}
			if (user && infoData.status === "downloaded" && responsedata.download) {
				var datalink = encrypt(responsedata.download, responsedata.id)
				await res.status(200).json({
					status: 200,
					id: responsedata.id,
					premiumLink: datalink,
					filesize: responsedata.filesize,
					filename: responsedata.filename,
				});
			}
			if (infoData.status != "downloaded"){
				await res.status(403).json({
					status: 403,
					message: 'File not downloaded yet. Please try again later.'
				})
			}
			if (!user && responsedata.filesize > 53687091200 && responsedata.download) {
				await res.status(402).json({
					status: 402,
					message: "File too large for non-premium user. Please upgrade to bypass this."
				})
			}
			if (!user && responsedata.filesize < 53687091200 && responsedata.download) {
				var datalink = encrypt(responsedata.download, responsedata.id)
				await res.status(200).json({
					status: 200,
					id: responsedata.id,
					premiumLink: datalink,
					filesize: responsedata.filesize,
					filename: responsedata.filename,
				});
			}
		} catch (e) {
			console.log(e.response.data)
			if (e.response.data.error_code === 19) {
				await res.status(404).json({
					status: 404,
					message: "Hoster is temporarily unavailable."
				})
			}
			else if (e.response.data.error_code === 2) {
				await res.status(404).json({
					status: 404,
					message: "Torrent needs to be downloaded. Started downloading now. Please try again later."
				})
			}
			else if (e.response.data.error_code === 11) {
				await res.status(404).json({
					status: 404,
					message: "Something went wrong on our end."
				})
			}
			else if (e.response.data.error_code === 28) {
				await res.status(404).json({
					status: 404,
					message: "File is not allowed."
				})
			}
			else if (e.response.data.error_code === 24) {
				await res.status(404).json({
					status: 404,
					message: "File is unavailable."
				})
			}
			else if (e.response.data.error_code === 16) {
				await res.status(404).json({
					status: 404,
					message: "Hoster is not supported."
				})

			} else {
				await res.status(404).json({
					status: 404,
					message: "Link is invalid."
				})
			}
		}
	} else {
		res.status(401).send("Unauthorized")
	}
});
app.post('/startdownload', async (req, res) => {
	const user = req.body.user;
	const link = req.body.link;
	const apiKey = req.body.apiKey;
	const id = req.body.id;
	var algorithm = 'aes256';
	var decipher = crypto.createDecipher(algorithm, id);
	var decrypted = decipher.update(link, 'hex', 'utf8') + decipher.final('utf8');
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (apiKey === expectedApiKey) {	
		try {
			https.get(decrypted, function(proxyResponse) {
				let fileName = link.split("/");
				fileName = fileName[fileName.length - 1];
				res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
				res.setHeader('Content-Type', 'application/octet-stream');
				proxyResponse.pipe(res);
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send("Internal server error");
		}
	}
})
app.post('/deletedownload', async (req, res) => {
	const id = req.body.downloadid;
	const apiKey = req.body.apiKey
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (apiKey === expectedApiKey) {
		try {//makes sure each one is run
			const response = await axios({
				method: 'delete',
				url: `https://api.real-debrid.com/rest/1.0/downloads/delete/${id}`,
				headers: {
					Authorization: `Bearer ${RDToken}`,
					"Content-Type": 'application/json'
				}
			})
			res.status(200).send("Deleted")
		} catch (err) {
			console.log(err);
			res.status(500).send("Internal server error");
		}
	}
})
app.post('/changeemail', async (req, res) => {
	const customer = req.body.customer;
	const newemail = req.body.newemail;
	const apiKey = req.body.apiKey;
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (apiKey === expectedApiKey) {
		try {
			const change = await stripe.customers.update(
				customer,
				{email: newemail}
			);
			res.status(200).send("Success")
		} catch (err) {
			console.log(err);
			return res.status(500).send("Internal server error");
		}
	}	
});
// app.get('/status', async (req, res) => {
// 	const response = await axios({
// 		method: "get",
// 		url: "https://api.real-debrid.com/rest/1.0/hosts/status",
// 		headers: {
// 			Authorization: `Bearer ${RDToken}`,
// 			"Content-Type": 'application/json'
// 		},
// 	})
// 	return res.status(200).send(response.data)
// })
async function getDonationValues() {
	const adminCollection = await collection(fireStore, 'admin')
	const documents = await getDocs(adminCollection);
	return documents.docs[0].data();
}
//STRIPE FUNCTIONS
const YOUR_DOMAIN = 'https://leechersparadise.com';
const stripe = require('stripe')(process.env.STRIPEAPIKEY);
const endpointSecret = process.env.ENDPOINTSECRET;
app.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [{
			// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
			price: 'price_1LKHmtAOdqKU5ta9eoPThfsp',
			quantity: 1,
		}, ],
		mode: 'subscription',
		allow_promotion_codes: true,
		success_url: `${YOUR_DOMAIN}/success`,
		cancel_url: `${YOUR_DOMAIN}/getpremium`
	});
	res.redirect(303, session.url);
});
app.post('/create-portal-session', async (req, res) => {
	// For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
	// Typically this is stored alongside the authenticated user in your database.
	const customer = req.body.customer;
	const returnUrl = `${YOUR_DOMAIN}/login`;
	const portalSession = await stripe.billingPortal.sessions.create({
	  customer: customer,
	  return_url: returnUrl,
	});
	res.redirect(303, portalSession.url);
});
app.post('/webhook', express.raw({
	type: 'application/json'
}), async (request, response) => {
	let event = request.body;
	switch (event.type) {
		case 'payment_intent.succeeded':
			const paymentIntent = event.data.object;
			console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
			break;
		case 'checkout.session.completed':
			const paymentMethod = event.data.object;
			fulfillOrder(paymentMethod)
			break;
		case 'customer.subscription.deleted':
			const account = event.data.object;
			deleteAccount(account)
		default:
			// Unexpected event type
	}
	response.send();
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0');
/**FireBaseFunctions**/
async function saveDonationValues(dollarValue, dollarGoal) {
	const adminCollection = await collection(fireStore, 'admin')
	const documents = await getDocs(adminCollection);
	const hasDocuments = documents.docs.length > 0;
	if (hasDocuments) {
		await deleteDoc(documents.docs[0].ref)
		const docRef = await addDoc(adminCollection, {
			dollarValue: dollarValue,
			dollarGoal: dollarGoal,
		});
	} else {
		const docRef = await addDoc(adminCollection, {
			dollarValue: dollarValue,
			dollarGoal: dollarGoal,
		});
	}
}
async function addUser(password, customer, email, id, time) {
	const users = await collection(fireStore, 'users')
	const docRef = await addDoc(users, {
		password: password,
		customer: customer,
		email: email,
		id: id,
		time: time,
	});
}
async function deleteAccount(response) {
	var customerid = response.customer
	//find user email
	const q = query(collection(fireStore, "users"), where("customer", "==", customerid));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const email = data.email
		admin.auth()
		.getUserByEmail(email)
		.then((userRecord) => {
			admin.auth().deleteUser(userRecord.uid)
			console.log("Successfully deleted user");
		})
		.catch((error) => {
			console.log('Error deleting canceled user.', error);
		});
	});
}
//function to create secure random password
async function fulfillOrder(session) {
	var password = Math.random().toString(36).substring(2, 12)
	var email = session.customer_details.email
	var customer = session.customer
	var id = session.id
	var time = new Date().toLocaleString();
	//make user and add to database
	const user = await createUserWithEmailAndPassword(fireAuth, email, password)
	await addUser(password, customer, email, id, time);
	//send email
	const mail = {
		from: "account@leechersparadise.com",
		to: `${email}`,
		subject: "Your Credentials For LeechersParadise",
		html: `
	  <html>
	  <head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Thank you for Your Purchase from LeechersParadise.com</title>
		<style>
		  /* -------------------------------------
			  GLOBAL RESETS
		  ------------------------------------- */
		  /*All the styling goes here*/
		  img {
			border: none;
			-ms-interpolation-mode: bicubic;
			max-width: 100%; 
		  }
		  body {
			background-color: #f6f6f6;
			font-family: sans-serif;
			-webkit-font-smoothing: antialiased;
			font-size: 14px;
			line-height: 1.4;
			margin: 0;
			padding: 0;
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%; 
		  }
		  table {
			border-collapse: separate;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
			width: 100%; }
			table td {
			  font-family: sans-serif;
			  font-size: 14px;
			  vertical-align: top; 
		  }
		  /* -------------------------------------
			  BODY & CONTAINER
		  ------------------------------------- */
		  .body {
			background-color: #f6f6f6;
			width: 100%; 
		  }
		  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
		  .container {
			display: block;
			margin: 0 auto !important;
			/* makes it centered */
			max-width: 580px;
			padding: 10px;
			width: 580px; 
		  }
		  /* This should also be a block element, so that it will fill 100% of the .container */
		  .content {
			box-sizing: border-box;
			display: block;
			margin: 0 auto;
			max-width: 580px;
			padding: 10px; 
		  }
		  /* -------------------------------------
			  HEADER, FOOTER, MAIN
		  ------------------------------------- */
		  .main {
			background: #ffffff;
			border-radius: 3px;
			width: 100%; 
		  }
		  .wrapper {
			box-sizing: border-box;
			padding: 20px; 
		  }
		  .content-block {
			padding-bottom: 10px;
			padding-top: 10px;
		  }
		  .footer {
			clear: both;
			margin-top: 10px;
			text-align: center;
			width: 100%; 
		  }
			.footer td,
			.footer p,
			.footer span,
			.footer a {
			  color: #999999;
			  font-size: 12px;
			  text-align: center; 
		  }
		  /* -------------------------------------
			  TYPOGRAPHY
		  ------------------------------------- */
		  h1,
		  h2,
		  h3,
		  h4 {
			color: #000000;
			font-family: sans-serif;
			font-weight: 400;
			line-height: 1.4;
			margin: 0;
			margin-bottom: 30px; 
		  }
		  h1 {
			font-size: 35px;
			font-weight: 300;
			text-align: center;
			text-transform: capitalize; 
		  }
		  p,
		  ul,
		  ol {
			font-family: sans-serif;
			font-size: 14px;
			font-weight: normal;
			margin: 0;
			margin-bottom: 15px; 
		  }
			p li,
			ul li,
			ol li {
			  list-style-position: inside;
			  margin-left: 5px; 
		  }
		  a {
			color: #3498db;
			text-decoration: underline; 
		  }
		  /* -------------------------------------
			  BUTTONS
		  ------------------------------------- */
		  .btn {
			box-sizing: border-box;
			width: 100%; }
			.btn > tbody > tr > td {
			  padding-bottom: 15px; }
			.btn table {
			  width: auto; 
		  }
			.btn table td {
			  background-color: #ffffff;
			  border-radius: 5px;
			  text-align: center; 
		  }
			.btn a {
			  background-color: #ffffff;
			  border: solid 1px #3498db;
			  border-radius: 5px;
			  box-sizing: border-box;
			  color: #3498db;
			  cursor: pointer;
			  display: inline-block;
			  font-size: 14px;
			  font-weight: bold;
			  margin: 0;
			  padding: 12px 25px;
			  text-decoration: none;
			  text-transform: capitalize; 
		  }
		  .btn-primary table td {
			background-color: #5E2BE2; 
		  }
		  .btn-primary a {
			background-color: #5E2BE2;
			border-color: #5E2BE2;
			color: #ffffff; 
		  }
		  /* -------------------------------------
			  OTHER STYLES THAT MIGHT BE USEFUL
		  ------------------------------------- */
		  .last {
			margin-bottom: 0; 
		  }
		  .first {
			margin-top: 0; 
		  }
		  .align-center {
			text-align: center; 
		  }
		  .align-right {
			text-align: right; 
		  }
		  .align-left {
			text-align: left; 
		  }
		  .clear {
			clear: both; 
		  }
		  .mt0 {
			margin-top: 0; 
		  }
		  .mb0 {
			margin-bottom: 0; 
		  }
		  .preheader {
			color: transparent;
			display: none;
			height: 0;
			max-height: 0;
			max-width: 0;
			opacity: 0;
			overflow: hidden;
			mso-hide: all;
			visibility: hidden;
			width: 0; 
		  }
		  .powered-by a {
			text-decoration: none; 
		  }
		  hr {
			border: 0;
			border-bottom: 1px solid #f6f6f6;
			margin: 20px 0; 
		  }
		  /* -------------------------------------
			  RESPONSIVE AND MOBILE FRIENDLY STYLES
		  ------------------------------------- */
		  @media only screen and (max-width: 620px) {
			table.body h1 {
			  font-size: 28px !important;
			  margin-bottom: 10px !important; 
			}
			table.body p,
			table.body ul,
			table.body ol,
			table.body td,
			table.body span,
			table.body a {
			  font-size: 16px !important; 
			}
			table.body .wrapper,
			table.body .article {
			  padding: 10px !important; 
			}
			table.body .content {
			  padding: 0 !important; 
			}
			table.body .container {
			  padding: 0 !important;
			  width: 100% !important; 
			}
			table.body .main {
			  border-left-width: 0 !important;
			  border-radius: 0 !important;
			  border-right-width: 0 !important; 
			}
			table.body .btn table {
			  width: 100% !important; 
			}
			table.body .btn a {
			  width: 100% !important; 
			}
			table.body .img-responsive {
			  height: auto !important;
			  max-width: 100% !important;
			  width: auto !important; 
			}
		  }
		  /* -------------------------------------
			  PRESERVE THESE STYLES IN THE HEAD
		  ------------------------------------- */
		  @media all {
			.ExternalClass {
			  width: 100%; 
			}
			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div {
			  line-height: 100%; 
			}
			.apple-link a {
			  color: inherit !important;
			  font-family: inherit !important;
			  font-size: inherit !important;
			  font-weight: inherit !important;
			  line-height: inherit !important;
			  text-decoration: none !important; 
			}
			#MessageViewBody a {
			  color: inherit;
			  text-decoration: none;
			  font-size: inherit;
			  font-family: inherit;
			  font-weight: inherit;
			  line-height: inherit;
			}
			.btn-primary table td:hover {
			  background-color: #34495e !important; 
			}
			.btn-primary a:hover {
			  background-color: #34495e !important;
			  border-color: #34495e !important; 
			} 
		  }
		</style>
	  </head>
	  <body>
		<span class="preheader">🔑 This email contains your LeechersParadise.com Credentials!</span>
		<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
		  <tr>
			<td>&nbsp;</td>
			<td class="container">
			  <div class="content">
				<!-- START CENTERED WHITE CONTAINER -->
				<table role="presentation" class="main">
				  <!-- START MAIN CONTENT AREA -->
				  <tr>
					<td class="wrapper">
					  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
						<tr>
						  <td>
							<h1>Thank you for your purchase! 💖</h1>
							<p>Thank you for your purchase of LeechersParadise.com premium! It really means a lot to us. Below are your account credentials. Please keep them safe, and please don't share them with the rest of the internet. Have fun using LeechersParadise.com!</p>
							<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
							  <tbody>
								<tr>
								  <td align="left">
									<table role="presentation" border="0" cellpadding="0" cellspacing="0">
									  <tbody>
										<tr>
										  <td> <a href="https://LeechersParadise.com" target="_blank">LeechersParadise.com</a> </td>
										</tr>
									  </tbody>
									</table>
								  </td>
								</tr>
							  </tbody>
							</table>
							<p>Your Username: ${email}</p>
							<p>Your Password: ${password}</p>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
				<!-- END MAIN CONTENT AREA -->
				</table>
				<!-- END CENTERED WHITE CONTAINER -->
				<!-- START FOOTER -->
				<div class="footer">
				  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
					<tr>
					  <td class="content-block powered-by">
						With love, <a href="https://LeechersParadise.com">LeechersParadise.com</a>.
					  </td>
					</tr>
				  </table>
				</div>
				<!-- END FOOTER -->
			  </div>
			</td>
			<td>&nbsp;</td>
		  </tr>
		</table>
	  </body>
	</html>`,
	};
	contactEmail.sendMail(mail, (error) => {
		if (error) {
			console.log({
				status: "ERROR"
			});
		} else {
			console.log({
				status: "Fulfilled order email sent."
			});
		}
	});
}