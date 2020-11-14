import React,{useState,useEffect,useRef} from 'react'
import * as firebase from 'firebase'
import PropTypes from 'prop-types';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme,TextField } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import YouTube from 'react-youtube';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  root1:{
    height:'100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 140,
  },
  stepperRoot: {
    width: '100%',
  },
  canvasPaper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1,2),
    height:'100vh'
  },
  root1:{
    height:'100%'
  },
  eliminationGrid : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

const Home=props=>{

  const commandRef=useRef()

  const [notification,setNotification]=useState(false)
  const [message,setMessage]=useState('')
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profile,setProfile]=useState(null)
  const [problem,setProblem]=useState(null)
  const [uid,setUid]=useState('self')
  const [users,setUsers]=useState(null)

  const [menu,setMenu]=useState(1)

  const problemsListRef=useRef()




 const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };





  const drawer = (
    <div>
        <div className={classes.toolbar} />
          <center>

          <Avatar style={{width:'100px',height:'100px',marginBottom:'20px'}} src={firebase.auth().currentUser.photoURL}>
            {firebase.auth().currentUser.displayName.substr(0,1)}
          </Avatar>
          <h3 style={{color:'#666666'}}>
            {firebase.auth().currentUser.displayName}
          </h3>

          <Divider style={{marginTop:'20px',marginBottom:'20px'}}/>

          <ListItem selected={menu==1} onClick={()=>{setMenu(1)}} button>
            <ListItemIcon><InboxIcon /> </ListItemIcon>
            <ListItemText primary={'Lectures'} />
          </ListItem>

          <ListItem selected={menu==2} onClick={()=>{setMenu(2)}} button>
            <ListItemIcon><MailIcon /> </ListItemIcon>
            <ListItemText primary={'Schedules'} />
          </ListItem>

          <Button
            variant='outlined'
            color='secondary'
            onClick={()=>{firebase.auth().signOut()}}
            style={{marginTop:'30px'}}
            >
            Logout
            </Button>

          </center>


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;







  return (
    <div className={classes.root}>

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{backgroundColor:'#0090ff'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Memory Leak LABS
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main style={{height:'100vh'}} className={classes.content}>
        <div className={classes.toolbar} />


          {
            menu==1?(
              <Lectures/>
            ):(
              menu==2?(
                <Schedule/>
              ):(
                <div/>
              )
            )
          }

      </main>
    </div>
  );
}

const Lectures=props=>{

  const opts = {
      height:'500px',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

  return(
    <div>
      <h3 style={{color:'#666666'}}>
        Chemistry Lecture 1
      </h3>
      <Tabs>
    <TabList>
      <Tab>Video 1</Tab>
      <Tab>Video 2</Tab>
      <Tab>Video 3</Tab>
    </TabList>

    <TabPanel>
      <YouTube videoId="13D0Occ6ulA" opts={opts} />
    </TabPanel>
    <TabPanel>
      <YouTube videoId="WqZw3R2wDho" opts={opts} />
    </TabPanel>
    <TabPanel>
      <YouTube videoId="qDaC9VXnOoE" opts={opts} />
    </TabPanel>
  </Tabs>
    </div>
  )
}

const Schedule=props=>{

  const [lectures,setLectures]=useState([])
  const classes = useStyles();



  useEffect(()=>{
    console.log('hi')
    firebase.database().ref().child('schedule').on('value', function(snapshot) {
      var arr=[]
      Object.keys(snapshot.val()).map(key=>{
        arr.push(snapshot.val()[key])
      })
      setLectures(arr)
      console.log(arr)
    });
  },[])



  return(
    <div>

      {
        lectures.length==0?(
          <LinearProgress/>
        ):(
          <div/>
        )
      }
      {
      lectures.map(lecture=>{
        return(
          <Paper style={{marginBottom:'10px',paddingLeft:'20px',paddingTop:'10px',paddingBottom:'10px'}}>
            <Grid direction='row' container className={classes.grid}>
              <Grid item xs={8}>
                <h2>
                  {lecture.name}
                </h2>
                <h4 style={{color:'#888888'}}>
                  {lecture.time}
                </h4>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={()=>{window.open(lecture.meet,'Live Lab', 'height=600,width=600,left=0,top=0')}}
                  variant='outlined'
                  color='primary'
                  >
                  Join Lab
                </Button><br/>
                <Button
                  style={{marginTop:'10px'}}
                  variant='outlined'
                  color='primary'
                    onClick={()=>{window.open('https://command-lab.netlify.app/','Lab View Control', 'height=140,width=260,left=800,top=0')}}
                  >
                  control
                </Button>

              </Grid>
            </Grid>

          </Paper>
        )
      })}
    </div>
  )
}

export default Home
