import * as React from 'react';
import {graphql} from "react-relay";
import FooBar from "./FooBar";
import {useLazyLoadQuery} from "react-relay/hooks";
import {HomePageQuery} from "../__generated__/HomePageQuery.graphql";


export default function HomePage() {
    const query = graphql`
      query HomePageQuery {
        bar(baz: "asldkfj")
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




