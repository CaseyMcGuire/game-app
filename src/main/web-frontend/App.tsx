import * as React from "react";
import * as ReactDOM from "react-dom";
import {QueryRenderer, graphql} from "react-relay";
import {RelayConfig} from "relay/RelayConfig";
import {AppQuery} from "__generated__/AppQuery.graphql";
import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import {createUseStyles}  from "react-jss";
import Foo from "pages/Foo";
import {useLazyLoadQuery} from "react-relay/hooks";
import {RelayEnvironmentProvider} from "react-relay/hooks";
import {createRoot} from "react-dom/client";

const styles = createUseStyles({
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

  const response = useLazyLoadQuery<AppQuery>(query, {})
  return <Body />
}

const Body = () => {
  return (<BrowserRouter>
    <Link to="/">Home</Link>
    <Link to="/there">There</Link>
    <Link to="/foo_bar">foo bar</Link>
    <Routes>
      <Route path="/" element={<Foo />}/>
      <Route path="/there" element={<Bar />}/>
      <Route path="/foo_bar" element={<Baz /> }/>
      <Route element={<Forohfor />}/>
    </Routes>
  </BrowserRouter>);
};

const Bar = () => {
  return <div className={styles().bar}>there</div>;
};

const Baz = () => {
  return <div className={styles().baz}>baz</div>;
};

const Forohfor = () => {
  return <div>404</div>;
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
