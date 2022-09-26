import React from 'react'
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// import {  styled  } from '@material-ui/styles'
// const useStyle=styled({
//     header: {
//         background: '#45bed6'
//     },
//     tabs: {
//         color: '#FFFFFF',
//         marginRight: 20,
//         textDecoration: 'none',
//         fontSize: 20
//     },
//     tabs: {
//         color: '#FFFFFF',
//         marginRight: 20,
//         textDecoration: 'none',
//         fontSize: 20
//     }
// })


export default function Navbar() {
    // const classes = useStyle();
  return (
    <div>
      <AppBar  position="static">
          <Toolbar >
          <NavLink className='Link' to="/">Home</NavLink>
          <NavLink className='Link' to="/all-user">All-User</NavLink>
          <NavLink className='Link' to="/add-user">Add-user</NavLink>
          <NavLink className='Link' to="/api">Api</NavLink>
          </Toolbar>
      </AppBar>



    </div>
  )
}