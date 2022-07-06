import Cors from 'cors'
import { instance } from 'sib-api-v3-sdk/src/ApiClient'



// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  console.log(req.body);
  await runMiddleware(req, res, cors)

  const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.subject = "URL Shortener feedback";
sendSmtpEmail.htmlContent = `<html><body><h1>${req.body.feedback}</h1></body></html>`;
sendSmtpEmail.sender = {"name":"URL shortner","email":process.env.EMAIL_SERVER_USER};
sendSmtpEmail.to = [{"email":process.env.EMAIL_SERVER_USER,"name":"Mayur"}];

apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  res.json({message : 'Sent Successfully'})
}, function(error) {
  res.json({message  : 'failed'})
  console.error(error);
});

}

export default handler