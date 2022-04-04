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

    
  // const NFTMetadata = {

  //     "name": "Rimulation",
  //     "description": "description",
  //     "image": `https://gateway.pinata.cloud/ipfs/QmSdeYRjL4n1qdqwQzgb8j8MKHwK4XY3HfbJQn68W9F8Zu`,
  //     "external_link": "test.com",
  //     // "attributes": value
  // };
  // const metadata = JSON.stringify(NFTMetadata);

  //   fs.writeFile(`meta.json`, metadata, (err) => {
  //     if (err) {
  //         throw err;
  //     }
  // });



  // const ur = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  // const data = new FormData()
  // data.append('file',"logo.png")
  // return axios
  //     .post(ur, data,{
  //         headers: {
  //             pinata_api_key: pinataApiKey,
  //             pinata_secret_api_key: pinataSecretApiKey
  //         }
  //     })
      
  //     .then(function (response) {
  //         //handle your response here
  //     })
  //     .catch(function (error) {
  //         //handle error here
  //     });

//   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
//   let data = new FormData()
//  data.append('file',"logo.png")
//   console.log("file",data)
//   const res = await axios.post(url, data, {
//     maxContentLength: 'Infinity',
//     headers: {
//       'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//       pinata_api_key: pinataApiKey,
//       pinata_secret_api_key: pinataSecretApiKey,
//     },
//   })
//   console.log(res.data)
// }




// const pinFileToIPFS = async () => {
 
//     // const NFTMetadata = { 
        
//     //     "name": "Rimulation",
//     //     "description": "description",
//     //     "image": `https://gateway.pinata.cloud/ipfs/QmSdeYRjL4n1qdqwQzgb8j8MKHwK4XY3HfbJQn68W9F8Zu`,
//     //     "external_link": "test.com",
//     //     // "attributes": value
//     // };
//     // const metadata = JSON.stringify(NFTMetadata);

//     //   fs.writeFile(`meta.json`, metadata, (err) => {
//     //     if (err) {
//     //         throw err;
//     //     }
//     // });
// console.log("dhghj");



// const form = new FormData();
// form.append("file", "logo.png");

// const options = {
//   method: 'POST',
//   url: 'https://api-eu1.tatum.io/v3/ipfs',
//   headers: {
//     'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
//     'x-api-key': ''
//   },
//   data: '[form]'
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });



   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
   let data = new FormData();
   let nftpath = __dirname+`/${req.body.ab}.png`;
   console.log(nftpath);
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

var targetDir = `meta.json`

const metadata = JSON.stringify(NFTMetadata);

fs.writeFile(`meta.json`, metadata, (err) => {
    if (err) {
        throw err;
    }
});




 };
 module.exports = {
  pinFileToIPFS
}
