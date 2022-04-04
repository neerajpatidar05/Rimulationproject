const pinataApiKey = "3376504838af439b7353";
const pinataSecretApiKey ="81f80eb74e31b729e3c5b467dbfd5aa85af5343a0c137830ac543fa08e1fb921";
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
 
const pinFileToIPFS = async (req,res) => {
  console.log('pinfiletoiofs')
  const pinataApiKey = '3376504838af439b7353'
  const pinataSecretApiKey =
    '81f80eb74e31b729e3c5b467dbfd5aa85af5343a0c137830ac543fa08e1fb921'

console.log("In pinfile ", req.body);

  
   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
   let data = new FormData();
  let nftpath = __dirname+`/${req.body.ab}.png`;
   
  data.append("file", fs.createReadStream(nftpath));
 const result = await axios.post(url, data, {
   maxContentLength: "Infinity", 
   headers: {
     "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
     pinata_api_key: pinataApiKey,       
      pinata_secret_api_key: pinataSecretApiKey,
    },
 });  
  console.log(result.data.IpfsHash);
  const NFTMetadata = {
           
    "name": "Rimulation",
    "description": "description",
    "image": `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}`,
    "external_link": "test.com",
    };


let ext = ".json"

let jsonpath = __dirname+`/${req.body.ab}.json`;

var targetDir = 'src/'+'nft/' 

const metadata = JSON.stringify(NFTMetadata);

fs.writeFile(`src/${req.body.ab}.json`, metadata, (err) => {
    if (err) {
        throw err;
    }
    console.log("created Metadata!");
pinMetadata(req,res,jsonpath)

});
async function pinMetadata(req,res,jsonpath) {
  
  let metadata = new FormData();

 
  metadata.append("file", fs.createReadStream(jsonpath));
  const metafileresult = await axios.post(url, metadata, {
  maxContentLength: "Infinity", 
  headers: {
    "Content-Type": `multipart/form-data; boundary=${metadata._boundary}`,
    pinata_api_key: pinataApiKey, 
     pinata_secret_api_key: pinataSecretApiKey,
   },
  }); 
  console.log(metafileresult.data.IpfsHash);
  let IpfsHash = metafileresult.data.IpfsHash;
 
  return res.json({
    success : 1,
    "message":"Upload Successfully",
    data:IpfsHash
  })
  }
  };
 module.exports = {
  pinFileToIPFS
}
