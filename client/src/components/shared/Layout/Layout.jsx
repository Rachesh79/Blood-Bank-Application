import React from 'react'
import Header from './Header'
import Sidebar1 from './Sidebar1'



function Layout({children}) {
  return (
    <div>
        <div className="header"><Header /></div>
        <div className="row g-0">
          <div className="col-md-3"><Sidebar1 /></div>
          <div className="col-md-9">{children}</div>
        </div>
    </div>
  )
}

export default Layout
