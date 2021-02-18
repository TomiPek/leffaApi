const http = require("http");

const url = "http://www.omdbapi.com/?s=lord+of+the+rings&apikey=33bea0dc";

let data = "";
const request = http.request(url, (response) => {
  response.on("error", (err) => {
    console.error(err);
  });
  response.on("data", (chunk) => {
    data += chunk;
  });
  response.on("end", () => {
    data = JSON.parse(data);

    data = data["Search"];
    createServer(data);
  });
});

request.end();

function createServer(data) {
  const server = require("http");
  server
    .createServer((request, response) => {
      response.writeHead(200, { "Content-type": "text/html" });
      if (request.url === "/") {
        response.write("<table>");
        for (let i = 0; i < data.length; i++) {
          response.write("<tr>");
          response.write("<td><h1>" + data[i]["Title"] + "</h1></td>");
          response.write("<td><h1>" + data[i]["Year"] + "</h1></td>");
          response.write("<td><h1>" + data[i]["Type"] + "</h1></td>");
          response.write(
            "<td>" + "<img src=" + data[i]["Poster"] + "'>" + "</td>"
          );
          response.write("</tr>");
        }
        response.write("</table>");
      }
      response.end();
    })
    .listen(8000);
}
