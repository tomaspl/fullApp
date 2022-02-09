import "App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Books from "pages/Books";
import { TokenContextProvider } from "contexts/TokenContext";
import RequireAuth from "containers/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <TokenContextProvider>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Books />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </TokenContextProvider>
    </BrowserRouter>
  );
}

export default App;
