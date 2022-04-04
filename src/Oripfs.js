var axios = require("axios").default;
var options = {
  method: 'POST',
  url: 'https://api-eu1.tatum.io/v3/ipfs',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
    'x-api-key': ''
  },
  data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="file"\r\n\r\n\r\n-----011000010111000001101001--\r\n\r\n'
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});



// const form = new FormData();
// form.append("file", "");

// fetch("https://api-eu1.tatum.io/v3/ipfs", {
//   "method": "POST",
//   "headers": {
//     "Content-Type": "multipart/form-data; boundary=---011000010111000001101001",
//     "x-api-key": ""
//   }
// })
// .then(response => {
//   console.log(response);
// })
// .catch(err => {
//   console.error(err);
// });




// // import axios from "axios";

// // const form = new FormData();
// // form.append("file", "logo.png");

// // const options = {
// //   method: 'POST',
// //   url: 'https://api-eu1.tatum.io/v3/ipfs',
// //   headers: {
// //     'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
// //     'x-api-key': ''
// //   },
// //   data: '[form]'
// // };

// // axios.request(options).then(function (response) {
// //   console.log(response.data);
// // }).catch(function (error) {
// //   console.error(error);
// // });