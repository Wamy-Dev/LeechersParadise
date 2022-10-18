import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Main from "./components/main";
import AdminPanel from "./pages/admin-panel";
import About from "./pages/about";
import ButtonAppBar from "./components/topnav";
import UserPanel from "./pages/userpanel";
import Premium from "./pages/premium";
import Donate from "./pages/donate";
import NotFound from "./pages/404";
import Success from "./pages/success"
import Forgot from "./pages/forgot"
import Torrent from "./pages/torrent"
import ChangeEmail from './pages/changeemail'
export default function App() {
    return (
        <Router>
            <ButtonAppBar/>
            <div>
                <Routes>
                    <Route path="/admin"  element={<AdminPanel />} />
                    <Route path="/"  element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<UserPanel />} />
                    <Route path="/getpremium" element={<Premium />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/torrent" element={<Torrent />} />
                    <Route path="/changeemail" element={<ChangeEmail />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}
