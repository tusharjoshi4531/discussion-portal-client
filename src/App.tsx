import { useContext } from "react";

import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UserContext from "./store/user-context";
import AddTopicPage from "./pages/AddTopicPage";

const App = () => {
    // Context
    const { token } = useContext(UserContext);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage />} />
                {token === "" ? (
                    <Route path="auth" element={<LoginPage />} />
                ) : (
                    <Route path="add">
                        <Route path="topic" element={<AddTopicPage />} />
                    </Route>
                )}

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    );
};

export default App;
