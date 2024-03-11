
// @ts-ignore
import entries from '../entries.js';
import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';



function MyComponent() {
  return (
    <div>
      hello there
    </div>
  )
}
console.log(entries);

for (const entry in entries) {
  console.log(entry)
  //const data = fs.readFileSync(entries[entry] + '.tsx', 'utf8');
  //console.log(data);
}

console.log(renderToStaticMarkup(<MyComponent />));
