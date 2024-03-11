/**
 * @generated SignedSource<<66d266c3aef973660081714caf1031c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomePageQuery$variables = Record<PropertyKey, never>;
export type HomePageQuery$data = {
  readonly bar: string;
  readonly " $fragmentSpreads": FragmentRefs<"FooBar_murp">;
};
export type HomePageQuery = {
  response: HomePageQuery$data;
  variables: HomePageQuery$variables;
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
    "name": "HomePageQuery",
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
    "name": "HomePageQuery",
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
    "cacheID": "28a96c9df69b1a1d4f4ac455957531d8",
    "id": null,
    "metadata": {},
    "name": "HomePageQuery",
    "operationKind": "query",
    "text": "query HomePageQuery {\n  bar(baz: \"asldkfj\")\n  ...FooBar_murp\n}\n\nfragment FooBar_murp on Query {\n  foo\n  murp: bar(baz: \"aljskdfasf\")\n}\n"
  }
};
})();

(node as any).hash = "fbfa424d1bed52ba427f6ca2845da4bf";

export default node;
