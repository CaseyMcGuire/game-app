/**
 * @generated SignedSource<<0ae2aaa272de60761d6bc0fa064b168b>>
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
      "value": ""
    }
  ],
  "kind": "ScalarField",
  "name": "bar",
  "storageKey": "bar(baz:\"\")"
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
    "cacheID": "1c02a9b6ac60dc99b5d4dac067eca579",
    "id": null,
    "metadata": {},
    "name": "HomePageQuery",
    "operationKind": "query",
    "text": "query HomePageQuery {\n  bar(baz: \"\")\n  ...FooBar_murp\n}\n\nfragment FooBar_murp on Query {\n  foo\n  murp: bar(baz: \"aljskdfasf\")\n}\n"
  }
};
})();

(node as any).hash = "e68fa1507ee2d3bda814332e0e76a542";

export default node;
