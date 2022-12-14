require('dotenv').config();
//firebase imports
const {
	firebaseApp
} = require('./config/firebase.config')
const {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
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
const WebSocketServer = require('ws');
const ejs = require('ejs');
const basicAuth = require('express-basic-auth')
var crypto = require('crypto');
var Sugar = require('sugar');
const https = require('https');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const requestIp = require('request-ip');
const rateLimit = require('express-rate-limit')
const compression = require('compression')
var MongoStore = require('rate-limit-mongo');
//nodemailer
var nodemailer = require('nodemailer');
const contactEmail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "",
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
//limiters
const linklimiter = rateLimit({
	skipFailedRequests: true,
	windowMs: 24 * 60 * 60 * 1000, // 24 hours
	max: async (req, response) => {
		if (req.body.user === true) {
			return 0
		} else {
			return 10
		}
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
const torrentlimiter = rateLimit({
	skipFailedRequests: true,
	windowMs: 24 * 60 * 60 * 1000, // 24 hours
	max: async (req, response) => {
		if (req.body.user === true) {
			return 0
		} else {
			return 10
		}
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
app.use(
	helmet.contentSecurityPolicy({
	  directives: {
		defaultSrc: helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
	  },
	})
  )
app.use(express.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'https://leechersparadise.com');//CHANGE THIS TO '*' WHEN DEV TESTING https://leechersparadise.com
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
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/link', linklimiter)
app.use('/torrent', torrentlimiter)
app.use(compression())
//getpage
app.use("/", express.static(path.join(__dirname, 'views')));
var timestarted = new Date().getTime();
global.linkcount = 0
global.torrentcount = 0
const wss = new WebSocketServer.Server({ port: 3002 })
wss.on("connection", ws => {
	var uptime = Sugar.Number.duration(new Date().getTime() - timestarted)
	ws.send(JSON.stringify({linkcount: linkcount, torrentcount: torrentcount, uptime: uptime}))
	setInterval(() => {
		var uptime = Sugar.Number.duration(new Date().getTime() - timestarted)
		ws.send(JSON.stringify({linkcount: linkcount, torrentcount: torrentcount, uptime: uptime}))
	}, 1000)
});
//admin
app.get('/admin', async (req, res) => {
	res.send(await getDonationValues())
})
app.get('/getdm', async (req, res) => {
	const premiumLink = req.query.link;
	const password = req.query.password;
	const apiKey = req.query.apiKey;
	const ip = req.clientIp;
	const user = req.query.user;
	const acc = Math.floor(Math.random() * 2)
	console.log('Download Manager link requested from: ' + ip)
	console.log(Sugar.String.truncate(premiumLink, 60, 'middle'))	
	const expectedApiKey = process.env.ADMINAPITOKEN
	function encrypt(text, password) {
		const algorithm = 'aes256';
		var cipher = crypto.createCipher(algorithm, password);  
		var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
		return encrypted;
	}
	try {
		if (acc === 0) {
			const response = await axios({
				method: 'GET',
				url: `https://api.alldebrid.com/v4/link/unlock?agent=API&apikey=${process.env.APITOKENPREMIUM}&link=${escape(premiumLink)}&password=${password}`,
			})
			const responsedata = response.data.data
			if (response.data.error) {
				try {
					await res.status(404).json({
						status: 404,
						message: response.data.error.message
					})
				} catch {
					await res.status(404).json({
						status: 404,
						message: "Host has reached maximum download limit for the next 24 hours. Try again later."
					})
				}
			} else {
				var datalink = encrypt(responsedata.link, responsedata.id)
				if (user && responsedata.link) {
					await res.status(200).json({
						status: 200,
						link: `https://api.leechersparadise.com/startdm?link=${datalink}&id=${responsedata.id}&size=${responsedata.filesize}&filename=${escape(responsedata.filename)}`
					});
				}
			}
		} else {
			const response = await axios({
				method: 'GET',
				url: `https://api.alldebrid.com/v4/link/unlock?agent=API&apikey=${process.env.APITOKENPREMIUM2}&link=${escape(premiumLink)}&password=${password}`,
			})
			const responsedata = response.data.data
			if (response.data.error) {
				try {
					await res.status(404).json({
						status: 404,
						message: response.data.error.message
					})
				} catch {
					await res.status(404).json({
						status: 404,
						message: "Host has reached maximum download limit for the next 24 hours. Try again later."
					})
				}
			} else {
				var datalink = encrypt(responsedata.link, responsedata.id)
				if (user && responsedata.link) {
					await res.status(200).json({
						status: 200,
						link: `https://api.leechersparadise.com/startdm?link=${datalink}&id=${responsedata.id}&size=${responsedata.filesize}&filename=${escape(responsedata.filename)}`
					});
				}
			}
		}
	} catch (e) {
		console.log(e)
		await res.status(404).json({
			status: 404,
			message: "Invalid Link."
		})
	}
})
async function myAsyncAuthorizer(username, password, cb) {
	try {
		const user = await signInWithEmailAndPassword(fireAuth, username, password)
		if (user) {
			return cb(null, true)
		} else {
			return cb(null, false)
		}
	}
	catch (e) {
		return cb(null, false)
	}
}
app.get('/startdm', basicAuth({
    authorizer: myAsyncAuthorizer,
	authorizeAsync: true,
	challenge: true,
}), async (req, res) => {
	const link = req.query.link;
	const id = req.query.id;
	const size = req.query.size
	const fileName = req.query.filename;
	var algorithm = 'aes256';
	var decipher = crypto.createDecipher(algorithm, id);
	var decrypted = decipher.update(link, 'hex', 'utf8') + decipher.final('utf8');
	try {
		if (req.method === "HEAD") {
			res.status(200).end()
		}
		else {
			let request = https.get(decrypted, function(proxyResponse) {
				res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
				res.setHeader('Content-Length', size);
				res.setHeader('Content-Type', 'application/octet-stream');
				proxyResponse.pipe(res);
			});
			request.on('error', function(e) {
				res.send(505)
			});
		}
	} catch (e) {
		console.log(e)
		res.send(404).end()
	}
})
app.post('/admin', async (req, res) => {
	const expectedApiKey = process.env.ADMINPANEL
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
	linkcount += 1
	const acc = req.body.acc
	const premiumLink = req.body.downloadLink;
	const password = req.body.password;
	const apiKey = req.body.apiKey;
	const ip = req.clientIp;
	const user = req.body.user
	console.log('Link requested from: ' + ip)
	console.log(Sugar.String.truncate(premiumLink, 60, 'middle'))	
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (apiKey === expectedApiKey) {
		try {
			async function SendResponse (responsedata) {
				if (responsedata.filesize > 53687091200 && responsedata.link) {//if user is not logged in and download is ready and filesize is greater than 50gb, deny download
					await res.status(402).json({
						status: 402,
						message: "File too large for non-premium user. Please upgrade to bypass this."
					})
				}
				if (responsedata.filesize < 53687091200 && responsedata.link) {
					//if user is not logged in and download is ready and filesize is less than 50gb, give download
					var datalink = encrypt(responsedata.link, responsedata.id)
					await res.status(200).json({
						status: 200,
						id: responsedata.id,
						premiumLink: datalink,
						filesize: responsedata.filesize,
						filename: responsedata.filename,
					});
				}
			}
			function encrypt(text, password) {
				const algorithm = 'aes256';
				var cipher = crypto.createCipher(algorithm, password);  
				var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
				return encrypted;
			}
			if (user === true) {
				if (acc === 0) {
					const response = await axios({
						method: 'GET',
						url: `https://api.alldebrid.com/v4/link/unlock?agent=API&apikey=${process.env.APITOKENPREMIUM}&link=${escape(premiumLink)}&password=${password}`,
					})
					const responsedata = response.data.data
					if (response.data.error) {
						try {
							if (response.data.error.message === "You have reached the download limit for this host") {
								await res.status(404).json({
									status: 404,
									message: "Host has reached maximum download limit for the next 24 hours. Try again later."
								})
							}
							else {
								await res.status(404).json({
									status: 404,
									message: response.data.error.message
								})
							}
						} catch {
							await res.status(404).json({
								status: 404,
								message: "Host has reached maximum download limit for the next 24 hours. Try again later."
							})
						}
					} else {
						if (user && responsedata.link) {
							var datalink = encrypt(responsedata.link, responsedata.id)
							await res.status(200).json({
								status: 200,
								id: responsedata.id,
								premiumLink: datalink,
								filesize: responsedata.filesize,
								filename: responsedata.filename,
							});
						}
					}
				} else {
					const response = await axios({
						method: 'GET',
						url: `https://api.alldebrid.com/v4/link/unlock?agent=API&apikey=${process.env.APITOKENPREMIUM2}&link=${escape(premiumLink)}&password=${password}`,
					})
					const responsedata = response.data.data
					if (response.data.error) {
						try {
							if (response.data.error.message === "You have reached the download limit for this host") {
								await res.status(404).json({
									status: 404,
									message: "Host has reached maximum download limit for the next 24 hours. Try again later."
								})
							}
							else {
								await res.status(404).json({
									status: 404,
									message: response.data.error.message
								})
							}
						} catch {
							await res.status(404).json({
								status: 404,
								message: "Host has reached maximum download limit for the next 24 hours. Try again later."
							})
						}
					} else {
						if (user && responsedata.link) {
							var datalink = encrypt(responsedata.link, responsedata.id)
							await res.status(200).json({
								status: 200,
								id: responsedata.id,
								premiumLink: datalink,
								filesize: responsedata.filesize,
								filename: responsedata.filename,
							});
						}
					}
				}
				
		} else {
			if (acc === 0) {
				const response = await axios({
					method: 'GET',
					url: `https://api.alldebrid.com/v4/link/unlock?agent=API&apikey=${process.env.APITOKEN}&link=${escape(premiumLink)}&password=${password}`,
				})
				const responsedata = response.data.data
				if (response.data.error) {
					try {
						if (response.data.error.message === "You have reached the download limit for this host") {
							await res.status(404).json({
								status: 404,
								message: "Host has reached maximum download limit for the next 24 hours. Try again later."
							})
						}
						else {
							await res.status(404).json({
								status: 404,
								message: response.data.error.message
							})
						}
					} catch {
						await res.status(404).json({
							status: 404,
							message: "Host has reached maximum download limit for the next 24 hours. Try again later."
						})
					}
				}
				else {
					SendResponse(responsedata)
				}
			} else {
				const response = await axios({
					method: 'GET',
					url: `https://api.alldebrid.com/v4/link/unlock?agent=API&apikey=${process.env.APITOKEN2}&link=${escape(premiumLink)}&password=${password}`,
				})
				const responsedata = response.data.data
				if (response.data.error) {
					try {
						if (response.data.error.message === "You have reached the download limit for this host") {
							await res.status(404).json({
								status: 404,
								message: "Host has reached maximum download limit for the next 24 hours. Try again later."
							})
						}
						else {
							await res.status(404).json({
								status: 404,
								message: response.data.error.message
							})
						}	
					} catch {
						await res.status(404).json({
							status: 404,
							message: "Host has reached maximum download limit for the next 24 hours. Try again later."
						})
					}
				}
				else {
					SendResponse(responsedata)
				}
			}	
		}
		} catch (e) {
			console.log(e)
			await res.status(404).json({
				status: 404,
				message: "Invalid Link."
			})
		}
	} else {
		res.status(401).send("Unauthorized")
	}
});
app.get("/deletemagnet", async (req, res) => {
	const acc = req.query.acc
	const id = req.query.id;
	switch (acc) {
		case 0:
			var response = await axios({
				method: 'get',
				url: `https://api.alldebrid.com/v4/magnet/delete?agent=API&apikey=${process.env.APITOKEN}&id=${id}`,
			})
			await res.sendStatus(200)
		case 1:
			var response = await axios({
				method: 'get',
				url: `https://api.alldebrid.com/v4/magnet/delete?agent=API&apikey=${process.env.APITOKEN2}&id=${id}`,
			})
			await res.sendStatus(200)
		case 2:
			var response = await axios({
				method: 'get',
				url: `https://api.alldebrid.com/v4/magnet/delete?agent=API&apikey=${process.env.APITOKENPREMIUM}&id=${id}`,
			})
			await res.sendStatus(200)
		case 3:
			var response = await axios({
				method: 'get',
				url: `https://api.alldebrid.com/v4/magnet/delete?agent=API&apikey=${process.env.APITOKENPREMIUM2}&id=${id}`,
			})
			await res.sendStatus(200)
		}
})
app.post("/torrent", async (req, res) => {
	if (req.body.acc) {
		var acc = req.body.acc
	} else {
		var acc = Math.floor(Math.random() * 4)
	}
	const premiumLink = req.body.downloadLink;
	const user = req.body.user;
	const apiKey = req.body.apiKey;
	const ip = req.clientIp;
	console.log('Torrent requested from: ' + ip)
	console.log(Sugar.String.truncate(premiumLink, 60, 'middle'))	
	const expectedApiKey = process.env.ADMINAPITOKEN
	if (apiKey === expectedApiKey) {
		try {
			switch (acc) {
				case 0: 
					var response = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/upload?agent=API&apikey=${process.env.APITOKEN}&magnets[]=${premiumLink}`,
					})
					var responsedata = response.data.data
					var id = responsedata.magnets[0].id
					var status = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/status?agent=API&apikey=${process.env.APITOKEN}&id=${id}`,
					})
				case 1: 
					var response = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/upload?agent=API&apikey=${process.env.APITOKEN2}&magnets[]=${premiumLink}`,
					})
					var responsedata = response.data.data
					var id = responsedata.magnets[0].id
					var status = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/status?agent=API&apikey=${process.env.APITOKEN2}&id=${id}`,
					})
				case 2: 
					var response = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/upload?agent=API&apikey=${process.env.APITOKENPREMIUM}&magnets[]=${premiumLink}`,
					})
					var responsedata = response.data.data
					var id = responsedata.magnets[0].id
					var status = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/status?agent=API&apikey=${process.env.APITOKENPREMIUM}&id=${id}`,
					})
				case 3: 
					var response = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/upload?agent=API&apikey=${process.env.APITOKENPREMIUM2}&magnets[]=${premiumLink}`,
					})
					var responsedata = response.data.data
					var id = responsedata.magnets[0].id
					var status = await axios({
						method: 'get',
						url: `https://api.alldebrid.com/v4/magnet/status?agent=API&apikey=${process.env.APITOKENPREMIUM2}&id=${id}`,
					})
			}
			if (response.data.error) {
				await res.status(404).json({
					status: 404,
					message: "Use of torrenting is down. Please try again later."
				})
			}
			if (responsedata.magnets[0].error) {
					await res.status(404).json({
					status: 404,
					message: responsedata.magnets[0].error.message
				})
			}
			else {
				const statusdata = status.data.data.magnets
				const linklist = []
				statusdata.links.forEach(item => {
					linklist.push(item.link+";"+item.filename)
				})
				if (statusdata.status === "Ready") {
					if (user && statusdata.links) {
						torrentcount += 1
						await res.status(200).json({
							status: 200,
							premiumLinks: linklist,
							filename: statusdata.filename,
							id: responsedata.magnets[0].id,
							acc: acc
						});
					}
					if (!user && statusdata.size > 53687091200 && statusdata.links) {//if user is not logged in and download is ready and filesize is greater than 50gb, deny download
						await res.status(402).json({
							status: 402,
							message: "File too large for non-premium user. Please upgrade to bypass this."
						})
					}
					if (!user && statusdata.size < 53687091200 && statusdata.links) {
						torrentcount += 1
						//if user is not logged in and download is ready and filesize is less than 50gb, give download
						await res.status(200).json({
							status: 200,linklist,
							filename: statusdata.filename,
							id: responsedata.magnets[0].id,
							acc: acc
						});
					}
				}
				else {
					if (statusdata.statusCode === 1) {
						const currenttime = new Date().getTime();
						var downloaded = ((statusdata.downloaded / statusdata.size) * 100)
						var timeleft = Number(((statusdata.size - statusdata.downloaded) / (statusdata.downloaded / (currenttime - statusdata.uploadDate))) / 10000000);
						await res.status(404).json({
							status: 404,
							message: `Torrent is ${downloaded.toFixed(1)}% downloaded. About ${Sugar.Number.duration(timeleft)} left.`,
							acc: acc
						})
					}
					else if (statusdata.statusCode === 0) {
						await res.status(404).json({
							status: 404,
							message: `Now adding torrent to queue. Please check back later.`,
							acc: acc
						})
					}
					else if (statusdata.statusCode === 2 || statusdata.statusCode === 3) {
						await res.status(404).json({
							status: 404,
							message: `Torrent is being finished downloading and is being processed. Please check back later.`,
							acc: acc
						})
					}
					else if (statusdata.statusCode === 5 || statusdata.statusCode === 6 || statusdata.statusCode === 9 || statusdata.statusCode === 11) {
						await res.status(404).json({
							status: 404,
							message: `Torrent has error code ${statusdata.statusCode}. Please contact support if the issue persists.`,
							acc: acc
						})
					}
					else if (statusdata.statusCode === 8) {
						await res.status(404).json({
							status: 404,
							message: `Torrent is too large and cannot be downloaded.`,
							acc: acc
						})
					}
					else {
						await res.status(404).json({
							status: 404,
							message: "Now starting torrent. Please check back later.",
							acc: acc
						})
					}
				}
			}
		} catch (e) {
			console.log(e)
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
			let request = https.get(decrypted, function(proxyResponse) {
				let fileName = link.split("/");
				fileName = fileName[fileName.length - 1];
				res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
				res.setHeader('Content-Type', 'application/octet-stream');
				res.setHeader('Accept-Ranges', 'bytes');
				res.setHeader('Content-Length', proxyResponse.headers['content-length']);
				proxyResponse.pipe(res);
			});
			request.on('error', function(e) {
				res.status(500).send("Internal server error");
			});
		} catch (err) {
			console.log(err);
			return res.status(500).send("Internal server error");
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
app.get('/status', async (req, res) => {
	const response = await axios({
		method: "get",
		url: `https://api.alldebrid.com/v4/user/hosts?agent=API&apikey=${process.env.APITOKEN2}`,
	})
	return res.status(200).send(response.data.data.hosts)
})
app.get('/premiumstatus', async (req, res) => {
	const response = await axios({
		method: "get",
		url: `https://api.alldebrid.com/v4/user/hosts?agent=API&apikey=${process.env.APITOKENPREMIUM2}`,
	})
	return res.status(200).send(response.data.data.hosts)
})
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
			price: '',
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
	const user = await createUserWithEmailAndPassword(fireAuth, email, password)
	await addUser(password, customer, email, id, time);
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
		<span class="preheader">???? This email contains your LeechersParadise.com Credentials!</span>
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
							<h1>Thank you for your purchase! ????</h1>
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