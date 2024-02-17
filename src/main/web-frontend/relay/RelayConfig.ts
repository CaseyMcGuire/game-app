import {Environment, Network, RecordSource, RequestParameters, Store, Variables} from "relay-runtime";

export class RelayConfig {
  static getEnvironment(): Environment {
    return new Environment({
      network: Network.create(this.fetchQuery),
      store: new Store(new RecordSource())
    });

  }

  private static fetchQuery(
    operation: RequestParameters,
    variables: Variables
  ) {
    return fetch("/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => response.json())
  }
}