import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Buckets from "./component/Buckets";
import ViewBucket from "./component/ViewBucket";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/buckets",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Buckets />
      </div>
    ),
  },
  {
    path: "/bucket/:id",
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <ViewBucket />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
