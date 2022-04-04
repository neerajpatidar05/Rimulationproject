const fs = require('fs');
const axios = require("axios");
const FormData = require("form-data");
const form = new FormData();
form.append("file", "meta.json");

const options = {
  method: 'POST',
  url: 'http://ip4/127.0.0.1/tcp/5001',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
    'x-api-key': 'CAESII4Q1WzWPHPDDT8GiZHaRc3LBxs+JRzOyOG45v8SI9z0'
  },
  data: '[form]'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});