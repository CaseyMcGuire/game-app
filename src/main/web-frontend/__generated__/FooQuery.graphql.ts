/**
 * @generated SignedSource<<addd8e75fec66a462b15ef189989d86b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FooQuery$variables = Record<PropertyKey, never>;
export type FooQuery$data = {
  readonly bar: string;
  readonly " $fragmentSpreads": FragmentRefs<"FooBar_murp">;
};
export type FooQuery = {
  response: FooQuery$data;
  variables: FooQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "baz",
      "value": "asldkfj"
    }
  ],
  "kind": "ScalarField",
  "name": "bar",
  "storageKey": "bar(baz:\"asldkfj\")"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FooQuery",
    "selections": [
      (v0/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FooBar_murp"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FooQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "foo",
        "storageKey": null
      },
      {
        "alias": "murp",
        "args": [
          {
            "kind": "Literal",
            "name": "baz",
            "value": "aljskdfasf"
          }
        ],
        "kind": "ScalarField",
        "name": "bar",
        "storageKey": "bar(baz:\"aljskdfasf\")"
      }
    ]
  },
  "params": {
    "cacheID": "30647c93fa96b5e400894ff144ba8138",
    "id": null,
    "metadata": {},
    "name": "FooQuery",
    "operationKind": "query",
    "text": "query FooQuery {\n  bar(baz: \"asldkfj\")\n  ...FooBar_murp\n}\n\nfragment FooBar_murp on Query {\n  foo\n  murp: bar(baz: \"aljskdfasf\")\n}\n"
  }
};
})();

(node as any).hash = "b03a2748be840aaf8f16509cf45220ad";

export default node;
