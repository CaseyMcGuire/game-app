import * as React from 'react';
import {graphql} from "react-relay";
import {HomePageQuery} from "__generated__/HomePageQuery.graphql";
import FooBar from "./FooBar";
import {useLazyLoadQuery} from "react-relay/hooks";


export default function HomePage() {
  const query = graphql`
    query HomePageQuery {
      bar(baz: "")
      ...FooBar_murp
    }
  `;

  const result = useLazyLoadQuery<HomePageQuery>(query, {})

  return (
    <div>
      <div>{result?.bar}</div>
      <FooBar murp={result}/>
    </div>
  )
}



