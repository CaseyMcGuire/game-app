import * as React from "react";
import {graphql} from "react-relay";
import {RelayConfig} from "relay/RelayConfig";
import {AppQuery} from "__generated__/AppQuery.graphql";
import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import {createUseStyles}  from "react-jss";
import HomePage from "pages/HomePage";
import {useLazyLoadQuery} from "react-relay/hooks";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {createRoot} from "react-dom/client";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";

const useStyles = createUseStyles({
  foo: {
    color: 'blue',
    margin: '10px'
  },
  bar: {
    color: 'green',
    margin: '20px'
  },
  baz: {
    color: 'grey',
  }
});

export function App() {
  return (
    <RelayEnvironmentProvider environment={RelayConfig.getEnvironment()}>
      <React.Suspense fallback={null}>
        <AppImpl />
      </React.Suspense>
    </RelayEnvironmentProvider>
  );
}

function AppImpl() {
  const query = graphql`
    query AppQuery {
      foo
    }
  `;
  const styles = useStyles();
  const response = useLazyLoadQuery<AppQuery>(query, {})
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blog">Blog</Link>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/blog" element={<BlogPage /> }/>
        <Route element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
