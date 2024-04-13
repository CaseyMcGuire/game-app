import fs from "fs";

import {join} from "path";

import { makeExecutableSchema } from '@graphql-tools/schema'
import { printSchema } from "graphql/utilities";

/**
 * DGS supports defining your GraphQL schema across multiple files whereas Relay does not. As such,
 * this script combines multiple GraphQL files into a single schema and writes it to a file that can be
 * read by Relay
 */

const schemaDirectory = join(__dirname, '../src/main/resources/schema');
const existingSchemaFile = 'src/main/resources/relay/schema.graphql'

let graphqlFiles: string[] = [];
function combineFiles(path: string) {
  for (const file of fs.readdirSync(path, 'utf8')) {
    if (!file.endsWith(".graphql")) {
      continue
    }
    const newPath = `${path}/${file}`
    const isFile = fs.lstatSync(newPath).isFile()
    if (isFile) {
      graphqlFiles.push(newPath)
    }
    else {
      combineFiles(newPath)
    }
  }
}

combineFiles(schemaDirectory)
const combinedSchema = makeExecutableSchema({
  typeDefs: graphqlFiles.map(file => fs.readFileSync(file, 'utf8'))
})
fs.writeFileSync(existingSchemaFile, printSchema(combinedSchema))