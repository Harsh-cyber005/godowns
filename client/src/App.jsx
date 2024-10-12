// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './pages/RequireAuth';
import PostAuth from './pages/PostAuth';
import Layout from './pages/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import InfoPageDesktop from './pages/InfoPageDesktop';
import InfoPageHome from './pages/InfoPageHome';
import BasicSearchDesktop from './pages/BasicSearchDesktop';

import { useState, useEffect } from 'react';
import FilterSearchDesktop from './pages/FilterSearchDesktop';

const App = () => {
  const [md, setMd] = useState(false);
  useEffect(() => {
    const checkDeviceWidth = () => {
      
      if (window.innerWidth < 768) {
        setMd(true);
      } else {
        setMd(false);
      }
    };
    checkDeviceWidth();
    window.addEventListener('resize', checkDeviceWidth);
    return () => window.removeEventListener('resize', checkDeviceWidth);
  }, []); 

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PostAuth />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard/>}>
              {
                !md &&
                <>
                  <Route path="/" element={<InfoPageHome />} />
                  <Route path="/:id" element={<InfoPageDesktop />} />
                  <Route path="/search/:search" element={<BasicSearchDesktop />} />
                  <Route path="/filter/:filter" element={<FilterSearchDesktop/>}/>
                </>
              }
              {
                md && 
                <>
                  <Route path="/" element={<Home />}/>
                  <Route path="/search/:search" element={<BasicSearchDesktop />} />
                  <Route path="/filter/:filter" element={<FilterSearchDesktop/>}/>
                </>
              }
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
