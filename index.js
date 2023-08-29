const fs = require("fs");
const js = require("http");
const http = require("http");

// const data = fs.readFileSync("./txt/append.txt", 'utf-8');
// console.log(data);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const replaceTemplate = (temp, product) => {
    temp = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    temp = temp.replace(/{%IMAGE%}/g, product.image);
    temp = temp.replace(/{%PRICE%}/g, product.price);
    temp = temp.replace(/{%FROM%}/g, product.from);
    temp = temp.replace(/{%NUTRIENTS%}/g, product.nutrients);
    temp = temp.replace(/{%QUANTITY%}/g, product.quantity);
    temp = temp.replace(/{%DESCRIPTION%}/g, product.description);
    temp = temp.replace(/{%ID%}/g, product.id);

    if (!product.organic) temp = temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return temp;
}

const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/overview") {
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, dataObj.map(el => replaceTemplate(tempCard, el)))
        res.end(output)
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to the server!");

})