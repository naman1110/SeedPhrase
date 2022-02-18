const hdkey = require('ethereumjs-wallet/hdkey')
const bip39 = require('bip39');
const read=require("readline-sync");
const express= require('express');
const app=express();
const path = require("path");


const port=process.env.PORT || 3000



app.use(express.urlencoded())
app.set('view engine', 'pug');

app.use('/static', express.static('static')) 

app.get('/', function (req, res) {
  res.render('index.pug', { title: 'SEED'});
})

app.post('/', (req, res)=>{
   seed = req.body.seed
   console.log(seed);
   sd='hi';
var buf = Buffer.from(seed, 'utf8');



const hdwallet = hdkey.fromMasterSeed(buf);


const bu=hdwallet._hdkey._privateKey;
const priv= bu.toString('hex');
const path = "m/44'/60'/0'/0/0";
const wallet = hdwallet.derivePath(path).getWallet();
const addr = `0x${wallet.getAddress().toString('hex')}`;
 
    
res.status(200).render('index.pug',{ key: `Private key : ${priv}`,address:`Address :${addr}`});
})


//let seed=read.question('YOUR SEED? ');




//console.log(`Private KEY: 0x${priv}`);

//console.log(`Address: ${address}`);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:3000`)
})


