import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import ViewBio from './components/ViewBio';

function App() {
    return (
        <div className="">
            <Router>
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route path="/" element={<Register />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/my-account" element={<MyAccount />}></Route>
                        <Route path="/view-bio" element={<ViewBio />}></Route>
                    </Route>
                </Routes>                
            </Router>
        </div>
    );
}

export default App;
