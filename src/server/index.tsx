import cors from "cors";
import express from "express";
import head from "lodash/head";
import React from "react";
import { renderToString } from "react-dom/server";
import { matchPath, StaticRouter } from "react-router-dom";
import serialize from "serialize-javascript";
import App from "../App";
import routes, { CustomRoute } from "../routes";
import { getProduct, search } from "../Api";

const app = express();

app.use(cors());
app.use(express.static("dist"));

/**
 * Endpoints consuming ML API
 */

app.get("/api/items", (req, res) => {
  const query = (req.query && req.query.q) || "";
  search(query).then(data => res.json(data));
});

app.get("/api/items/:id", (req, res) => {
  getProduct(req.params.id).then(data => res.json(data));
})
/**
 * Serve React App
 */

app.get("*", (req, res, next) => {
  const activeRoute: CustomRoute | undefined = routes.find(route =>
    matchPath(head(req.url.split("?"))!, route)
  );

  const promise =
    activeRoute && activeRoute.initData
      ? activeRoute.initData(req.path, req.query)
      : Promise.resolve(null);

  promise
    .then(data => {
      const markup = renderToString(
        <StaticRouter location={req.url} context={data}>
          <App />
        </StaticRouter>
      );

      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>ML Test</title>
            <script src="/vendors.js"></script>
            <script src="/app.js" defer></script>
            <link rel="stylesheet" href="/app.css">
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          </head>
          <body>
            <div id="app">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
