import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Spinner from "./components/Spinner.jsx";

// Route-level code splitting keeps the initial bundle small
const Auth = lazy(() => import("./pages/Auth.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const CourseDetail = lazy(() => import("./pages/CourseDetail.jsx"));
const LessonPage = lazy(() => import("./pages/LessonPage.jsx"));
const MyLearning = lazy(() => import("./pages/MyLearning.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/login" render={() => <Auth mode="login" />} />
            <Route path="/register" render={() => <Auth mode="register" />} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/course/:id" component={CourseDetail} />
            <PrivateRoute path="/course/:id/lesson/:lid" component={LessonPage} />
            <PrivateRoute path="/my-learning" component={MyLearning} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  );
}
