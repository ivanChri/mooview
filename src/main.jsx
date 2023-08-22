import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'regenerator-runtime'
import { ChakraBaseProvider,extendBaseTheme} from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { BrowserRouter } from 'react-router-dom'
const { 
  Button,
  Input,
  Menu,
  Spinner,
  Drawer,
  Tabs,
  Slider,
  Accordion,
  Avatar,
  Textarea,
  Modal
} = chakraTheme.components
const theme = extendBaseTheme({
  components: {
    Button,
    Input,
    Menu,
    Spinner,
    Drawer,
    Tabs,
    Slider,
    Accordion,
    Avatar,
    Textarea,
    Modal
  },
 styles:{
   global:{
    body:{
      bg:'#192642',
      width:'100%',
      height:'100%',
      margin:0,
      padding:0,
      boxSizing: 'border-box',
      fontFamily:`'Poppins','sans-serif'`,
      color:'white'
    },
   },
 },
   colors: {
    brand: {
      100: "#233458",
      900: "#1D4ED8",
      600:'#606060',
      200:'#192642',
      700:'rgba(13, 172, 234, 0.8)',
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <BrowserRouter>
    <ChakraBaseProvider theme={theme}>
     <App />
    </ChakraBaseProvider>
    </BrowserRouter>
    </React.StrictMode>
)
