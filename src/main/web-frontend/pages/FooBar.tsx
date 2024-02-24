import { graphql} from "react-relay";
import * as React from "react";
import { FooBar_murp$key } from "__generated__/FooBar_murp.graphql";
import {useFragment} from "react-relay/hooks";

type Props = {
  murp: FooBar_murp$key
}
export default function FooBar(props: Props) {
  const data = useFragment(
    graphql`
      fragment FooBar_murp on Query {
        foo
        murp: bar(baz: "aljskdfasf")
      }
    `,
    props.murp
  )

  return (
    <div>
      <div>
        <div>
          Welcome to Puzzlr!!!!
        </div>
        foo: {data.foo}
        murp: {data.murp}
      </div>
    </div>
  )
}
