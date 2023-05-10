import { useContext } from "react";

import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import UserContext from "./store/user-context";
import AddTopicPage from "./pages/AddTopicPage";
import DiscussionPage from "./pages/DiscussionPage";

import AddReplyPage from "./pages/AddReplyPage";

const App = () => {
    // Context
    const { token } = useContext(UserContext);

    return (
        <Layout>
            <Routes>
                {/* <Route path="/main" element={<MainPage />} /> */}
                <Route path="main/:type" element={<MainPage />} />
                <Route path="discussion/:id" element={<DiscussionPage />} />
                {token === "" ? (
                    <Route path="auth" element={<LoginPage />} />
                ) : (
                    <Route path="add">
                        <Route path="topic" element={<AddTopicPage />} />
                        <Route
                            path="discussion/:id"
                            element={<AddReplyPage />}
                        />
                    </Route>
                )}

                <Route path="*" element={<Navigate to="/main/all" />} />
            </Routes>
        </Layout>
    );
};

export default App;
