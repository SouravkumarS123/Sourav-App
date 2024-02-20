import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Signup, Profile } from "./pages";
import { UserProvider } from "./userContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <UserProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
