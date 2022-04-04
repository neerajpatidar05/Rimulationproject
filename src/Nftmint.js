import React, { useRef } from 'react'

import Web3 from 'web3';
import { useState } from "react";
import { ethers } from "ethers";
import axios from 'axios';
// import Web3 from 'web3';
// const Web3=require('');

import contracts from './contract';

async function mintFunction() {

    try {
     
  let dxy=await contracts.getxy();
      console.log(dxy,'dxy');
        console.log("Contract",contracts);
        let web1 =new Web3(window.ethereum);
        let dc=await web1.eth.getAccounts() ;
        console.log('web1.eth.getAccounts',dc[0]);
        
        let mint = await contracts.mint(`${dc[0]}`,1);
        console.log("Mint",mint);
     
      } catch (error) {
        console.log("error ----",error);
    }
}
function fromLatLngToPoint(Lat,Lng) {
  var siny = Math.min(Math.max(Math.sin(Lat * (Math.PI / 180)),
      -.9999),
    .9999);
  return {
    x: 128 + Lng * (256 / 360),
    y: 128 + 0.5 * Math.log((1 + siny) / (1 - siny)) * -(256 / (2 * Math.PI))
      };
      }

 function Nftmint() {
const canvasRef = useRef(null)

    const [connButtonText, setConnButtonText] = useState("Connect");
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");
     
     var c= fromLatLngToPoint(x,y);
      
      
     console.log(c,'cccccc');
    
    async function setXY() {

      let xy = await contracts.setxy(`${c.x}`,`${c.y}`)
     }
    //  contracts.setxy('23','45');
    setXY()

  Init()
    //  DynamicImagegenerate(x,y);
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Connected");
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };
  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
    };


  async function Init(){
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = '#4287f5' 
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = '#fff'
    context.fillText(`Cordinates are${x},${y},${z}` , 80, 50);
    download()  
    
}

const download = ()=>{
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.getElementById('canvas').toDataURL()
  link.click();
}

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  try {
    window.ethereum.on("accountsChanged", accountChangedHandler);

    window.ethereum.on("chainChanged", chainChangedHandler);
  } catch (error) {
    console.log(error);   
  }
  const [x, setx] = useState('')
  const [y, sety] = useState('')
  const [z, setz] = useState('')
  const handleEmailChange = event => {
    setx(event.target.value)
  };
  
return (
  <div>
        <canvas id="canvas"  ref={canvasRef}></canvas>

  <form >
    <div>
      <label>Latitude</label>
      <input
        type="text"
        name="xaxis"
        value={x}
        
        onChange={(e)=>setx(e.target.value)}
      /><br/>
      <label>Longitude</label>
      <input
        type="text"
        name="yaxis"
        value={y}
        onChange={(e)=>sety(e.target.value)}
      /><br />
      <label>Zoom</label>
      <input
        type="text"
        name="zoom"
        value={z}
        onChange={(e)=>setz(e.target.value)}
      /><br/>
    </div>
  </form>
   <button onClick={mintFunction}>MINT</button>
   <button onClick={connectWalletHandler}>Connect Wallet</button>
  
   </div>
)}
export default Nftmint;