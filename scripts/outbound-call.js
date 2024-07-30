require('dotenv').config();
const twilio = require('twilio');

console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
console.log('FROM_NUMBER:', process.env.FROM_NUMBER);
console.log('YOUR_NUMBER:', process.env.YOUR_NUMBER);
console.log('SERVER:', process.env.SERVER);

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function makeOutBoundCall() {
  try {
    const call = await client.calls.create({
      to: process.env.YOUR_NUMBER,
      from: process.env.FROM_NUMBER,
      url: `https://${process.env.SERVER.replace('https://', '')}/incoming`,
      method: 'POST'
    });
    console.log(call.sid);
  } catch (error) {
    console.error('Error making outbound call:', error);
  }
}

makeOutBoundCall();
