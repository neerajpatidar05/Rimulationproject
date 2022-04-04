import React, { useRef,useEffect } from 'react'

export default function CreateAndDown(x,y,z) {

    const canvasRef = useRef(null)
   
    useEffect(() => {
      
    Init()
      return () => {   

    }
    }, [])
    async function Init(){
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.fillStyle = '#4287f5' 
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = '#fff'
        context.fillText(`Cordinates are${x},${y},${z}` , 80, 50);
        //download()  
    }
    const download = ()=>{
        var link = document.createElement('a');
        link.download = 'filename.png';
        link.href = document.getElementById('canvas').toDataURL()
        link.click();
      }
   
  return (
<>
        <canvas id="canvas"  ref={canvasRef}></canvas>
    </>
  )
}
