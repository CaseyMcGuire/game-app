/**
 * @generated SignedSource<<bceb93d7ba316f9ab44aa3dac81f13b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FooBar_murp$data = {
  readonly foo: string;
  readonly murp: string;
  readonly " $fragmentType": "FooBar_murp";
};
export type FooBar_murp$key = {
  readonly " $data"?: FooBar_murp$data;
  readonly " $fragmentSpreads": FragmentRefs<"FooBar_murp">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FooBar_murp",
  "selections": [
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "692b8eb8df20e2f8f44d76dce9ba7ce8";

export default node;
