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
    console.log(context,"context");
    download()
    let ab = x + y + z
    console.log('avcbcbc', ab)
    
    axios.post(`http://localhost:3001/api/ipfs`, {ab})
    .then(res => {
     
      console.log("From IPFS",res.data);
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
      
      setXY()
      Init()     
    
      let dxy = await contracts.getxy()
      console.log(dxy, 'dxy')
      console.log('Contract', contracts)
      let web1 = new Web3(window.ethereum)
      let dc = await web1.eth.getAccounts()
      console.log('web1.eth.getAccounts', dc[0])

      let mint = await contracts.mint(`${dc[0]}`, 1)
      setHash(mint.hash)
    } catch (error) {
      console.log('error ----', error)
    }
  }
  console.log(txHash, 'hashhhh')
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!')

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
