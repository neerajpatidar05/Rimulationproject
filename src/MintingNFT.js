import React, { useRef } from 'react'
import Web3 from 'web3'
import { useState } from 'react'
import { ethers } from 'ethers'
import contracts from './contract'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import ipfs from 'ipfs-http-client'


export default function MintingNFT() {
  const [x, setx] = useState('')
  const [y, sety] = useState('')
  const [z, setz] = useState('')

  const canvasRef = useRef(null)

  const [connButtonText, setConnButtonText] = useState('Connect')
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [txHash, setHash] = useState()

  async function Init() {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = '#4287f5'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = '#fff'
    context.fillText(`Cordinates are ${x} ,${y}, ${z}`, 80, 50)
    download()
    let ab = x + y + z
    console.log('avcbcbc', ab)
    // let data =  Object()
    // data.filename = ab
    axios.post(`http://localhost:3001/api/ipfs`, {ab})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

    
  }

  const download = () => {
    var link = document.createElement('a')
    link.download = `${x}${y}${z}.png`
    link.href = document.getElementById('canvas').toDataURL()
    link.click()
  }
  async function mintFunction() {
    try {
      function fromLatLngToPoint(Lat, Lng) {
        var siny = Math.min(
          Math.max(Math.sin(Lat * (Math.PI / 180)), -0.9999),
          0.9999,
        )
        return {
          x: 128 + Lng * (256 / 360),
          y:
            128 +
            0.5 * Math.log((1 + siny) / (1 - siny)) * -(256 / (2 * Math.PI)),
        }
      }
      var c = fromLatLngToPoint(x, y)
      async function setXY() {
        let xy = await contracts.setxy(`${c.x}`, `${c.y}`)
      }
      //  contracts.setxy('23','45');
      setXY()
      Init()
     
      







      
    //  const {create}= require("ipfs-http-client");
    //  async function ccc(){
    //    console.log('hii from ccc');
    //  const ipfss= await create(
    //    {host:"localhost",
    //   port:5001,
    //   protocol:"http"
    // }
    //  );
    //  return ipfss;
    //  }   
     
    //  const run = async () => {
    //   console.log('hii from run');

    //   const ipfs= await ccc();
    //   const result = await ipfs.add("nft.png")
    // console.log(result);
    //   return result
    // } 
    // run()
    // return run 
      let dxy = await contracts.getxy()
      console.log(dxy, 'dxy')
      console.log('Contract', contracts)
      let web1 = new Web3(window.ethereum)
      let dc = await web1.eth.getAccounts()
      console.log('web1.eth.getAccounts', dc[0])

      let mint = await contracts.mint(`${dc[0]}`, 1)
      // console.log("Mint",mint);
      setHash(mint.hash)
    } catch (error) {
      console.log('error ----', error)
    }
  }
  console.log(txHash, 'hashhhh')
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!')

      //  var c= fromLatLngToPoint(x,y);

      // async function setXY() {

      //   let xy = await contracts.setxy(`${c.x}`,`${c.y}`)
      //  }
      // // contracts.setxy('23','45');
      //     setXY()

      //   Init()
      //  DynamicImagegenerate(x,y);
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0])
          setConnButtonText('Connected')
          getAccountBalance(result[0])
        })
        .catch((error) => {
          setErrorMessage(error.message)
        })
    } else {
      console.log('Need to install MetaMask')
      setErrorMessage('Please install MetaMask browser extension to interact')
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount)
    getAccountBalance(newAccount.toString())
  }

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance))
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
  }
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload()
  }

  try {
    window.ethereum.on('accountsChanged', accountChangedHandler)

    window.ethereum.on('chainChanged', chainChangedHandler)
  } catch (error) {
    console.log(error)
  }

  // const pinFileToIPFS = async (ab) => {
  //   console.log('pinfiletoiofs', ab)
  //   const pinataApiKey = '3376504838af439b7353'
  //   const pinataSecretApiKey =
  //     '81f80eb74e31b729e3c5b467dbfd5aa85af5343a0c137830ac543fa08e1fb921'



      
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
  //}

  return (
    <div>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <form>
        <div>
          <div>
            <label>Latitude</label>
            <input
              type="text"
              name="xaxis"
              value={x}
              onChange={(e) => setx(e.target.value)}
            />
            <br />
            <label>Longitude</label>
            <input
              type="text"
              name="yaxis"
              value={y}
              onChange={(e) => sety(e.target.value)}
            />
            <br />
            <label>Zoom</label>
            <input
              type="text"
              name="zoom"
              value={z}
              onChange={(e) => setz(e.target.value)}
            />
            <br />
          </div>
        </div>
      </form>
      <button onClick={mintFunction}>MINT</button>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      <div>
        <p>{txHash ? txHash : '-'}</p>
      </div>
    </div>
  )
}
