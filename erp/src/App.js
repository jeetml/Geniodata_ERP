import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Per from './per';
import Navbar from './navbar';
import Home from './home';
import Ran from './random';
import Bundle from './bundle';
import Dprice from './dprice';
import Predictsales from './Predictsales';
import Chart from './chart';
import Concept from './concept';
import AboutUs from './aboutus';
import Login from './login';
import Signup from './signup';
function App() {
    return (
        <div>
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                <Route path="/per" element={<Per />} />
                <Route path="/" element={<Home />} />
                <Route path='/bundle' element={<Bundle/>}/>
                <Route path ='/dprice' element={<Dprice/>}/>
                <Route path='/Predictsales' element={<Predictsales/>}/>
                <Route path='/chart' element={<Chart/>}/>
                <Route path='/ran' element={<Ran/>}/>
                <Route path='/con' element={<Concept/>}/>
                <Route path='/aboutus' element={<AboutUs/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route  path='/signup' element={<Signup/>}/>
                </Routes>
            </div>
        </Router>
        </div>
    );
}

export default App;
