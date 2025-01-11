import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import CreatePost from "./components/Posts/CreatePost";
import UpdatePost from "./components/Posts/UpdatePost";
import PostsList from "./components/PostsList/PostsList";
function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Create Post */}
        <Route path="/create-post" element={<CreatePost />} />
        {/* PostList */}
        <Route path="/lists" element={<PostsList />} />
        <Route path="/posts/:postId" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
