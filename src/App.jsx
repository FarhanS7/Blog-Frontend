import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostsList";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <PublicNavbar />
      <Routes>
        {/* create post */}
        <Route element={<Home />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/posts" />
        <Route element={<PostDetails />} path="/posts/:postId" />
        {/* <Route element={<UpdatePost />} path="/posts/:postId" /> */}
        {/* <CreatePost />
        <PostsList /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
