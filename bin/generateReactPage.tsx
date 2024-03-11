
// @ts-ignore
import entries from '../entries.js';
import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as fs from "fs";
import {html_beautify} from "js-beautify";


function PageStencil(props: {
  entryKey: string
}) {
  const bundlePath = `/bundles/${props.entryKey}.bundle.js`;
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title>Title</title>
      <script type="text/javascript" src="/assets/javascripts/react.production.min.js"></script>
      <script type="text/javascript" src="/assets/javascripts/react-dom.production.min.js"></script>
      <style dangerouslySetInnerHTML={{
        __html: `* {
          margin: 0;
          padding: 0;
          /* Taken from: https://furbo.org/2018/03/28/system-fonts-in-css/ */
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
          "Droid Sans", "Helvetica Neue", sans-serif;
        }`
      }} />
    </head>
    <body>
    <div id="root"></div>
    <script src={bundlePath} />
    </body>
    </html>
  )
}


for (const entry in entries) {
  const formattedHtmlString = html_beautify("<!DOCTYPE html>" + renderToStaticMarkup(<PageStencil entryKey={entry} />));
  const htmlFileName = `src/main/resources/templates/${entry}.html`
  const htmlAlreadyExists = fs.existsSync(htmlFileName);
  if (htmlAlreadyExists) {
    continue;
  }
  console.log(`Creating HTML file for ${entry} at ${htmlFileName}`)
  fs.writeFileSync(htmlFileName, formattedHtmlString);
}