import React,{useState} from 'react'
import * as firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';

const Command=props=>{

  const [notification,setNotification]=useState(false)
  const [message,setMessage]=useState('')

  const notify=message=>{
    setMessage(message)
    setNotification(true)
  }

  const command=string=>{
    firebase.database().ref().child('command').set(Date.now()+' '+string).then(()=>{
      notify('command applied')
    }).catch(err=>{
      console.log(err)
      notify('error')
    })
  }

  return(
    <center style={{marginTop:'20px',marginBottom:'20px'}}>

      <RotateLeftIcon onClick={()=>{command('-')}} style={{height:'100px',width:'100px',cursor:'pointer'}}/>
      <RotateRightIcon onClick={()=>{command('+')}} style={{height:'100px',width:'100px',cursor:'pointer',marginLeft:'20px'}}/>
    </center>
  )
}

export default Command
