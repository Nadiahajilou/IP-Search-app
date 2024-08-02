import AuthPage from "./pages/AuthPage";
import IPSearch from "./pages/IPSearch";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth-page" />} />
        <Route path="/auth-page" element={<AuthPage />} />
        <Route path="/IP-page" element={<IPSearch />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
