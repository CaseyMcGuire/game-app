/**
 * @generated SignedSource<<08e4d748520c703415845e380279db1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateUserErrorType = "EMAIL_ALREADY_EXISTS" | "OTHER" | "PASSWORD_MISMATCH" | "USERNAME_ALREADY_EXISTS" | "%future added value";
export type CreateUserInput = {
  confirmPassword: string;
  email: string;
  password: string;
  username: string;
};
export type SignUpPageMutation$variables = {
  input: CreateUserInput;
};
export type SignUpPageMutation$data = {
  readonly createUser: {
    readonly errors: ReadonlyArray<{
      readonly message: string | null | undefined;
      readonly type?: CreateUserErrorType | null | undefined;
    }> | null | undefined;
    readonly success: boolean;
    readonly user: {
      readonly email: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type SignUpPageMutation = {
  response: SignUpPageMutation$data;
  variables: SignUpPageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "success",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "CreateUserError",
  "abstractKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignUpPageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserResponse",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpPageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserResponse",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9bec9013d3d4f7b3ae2d1f8ac29e52f9",
    "id": null,
    "metadata": {},
    "name": "SignUpPageMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpPageMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    success\n    errors {\n      __typename\n      ... on CreateUserError {\n        type\n      }\n      message\n    }\n    user {\n      email\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a3904e4613694d593819ff35033da5bf";

export default node;
