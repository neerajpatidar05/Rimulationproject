
const fs = require('fs');
const axios = require("axios");
const FormData = require("form-data");

require("dotenv").config();
const pinataApiKey = process.env.PINATA_APIKEY;
const pinataSecretApiKey = process.env.PINATA_API_SECRETKEY;

const createMetadata = (hash) => {
    
        const NFTMetadata = {
        
            "name": "Rimulation",
            "description": "description",
            "image": `https://gateway.pinata.cloud/ipfs/QmSdeYRjL4n1qdqwQzgb8j8MKHwK4XY3HfbJQn68W9F8Zu`,
            "external_link": "test.com",
            };
    
        let data = new FormData();
        let ext = ".json"
      
        var targetDir = `meta.json`
    
        const metadata = JSON.stringify(NFTMetadata);
       
        fs.writeFile(`meta.json`, metadata, (err) => {
            if (err) {
                throw err;
            }
       });

    }

module.exports = {
    createMetadata
}