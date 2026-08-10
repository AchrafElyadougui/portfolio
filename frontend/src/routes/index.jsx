import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import ProjectsPage from "../pages/projectsPage";
import Blog from "../pages/Blog";
import ContactSection from "../components/ContactSection";


export const router = createBrowserRouter([
  {
    element: (
        <Layout />
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/Home",
        element: <Home/>,
      },
      {
        path: "/projects",
        element: <ProjectsPage />
      },
      {
        path:"/Blog",
         element:<Blog />
      },
      {
        path:"/contact",
        element:<ContactSection />
      },
    ],
  },
]);
