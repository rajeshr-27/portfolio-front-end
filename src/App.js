
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import ViewBio from './components/ViewBio';
import {Provider} from 'react-redux';
import store from './redux/app/store';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="">
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Header />}>
                            <Route path="/" element={<Register />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            
                            
                            <Route path="/" element={<ProtectedRoute />}>
                                 <Route path="/my-account" element={<MyAccount />}></Route>
                            </Route>
                        </Route>
                        <Route path="/view-bio/:userId" element={<ViewBio />}></Route>
                    </Routes>                
                </Router>
            </Provider>
            <ToastContainer />
        </div>
    );
}

export default App;
