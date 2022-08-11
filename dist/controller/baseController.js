"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const getDataVnExPress = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const html = yield (0, axios_1.default)(url);
    const $ = cheerio_1.default.load(html.data);
    let listNews = [];
    $("#automation_TV0 > div").each(function (i) {
        if (i === 0) {
            let href = $(this).find("article > div > a").attr("href");
            if (href) {
                href = href.split("vnexpress.net/")[1].split(".html")[0];
            }
            const images = $(this)
                .find("article > div > a > picture > img")
                .attr("data-src");
            const title = $(this).find("article > div > a").attr("title");
            const description = $(this).find("article > p > a").text();
            if (href && images && title && description) {
                listNews.push({ href, images, title, description });
            }
        }
        if (i === 1) {
            $(this)
                .find("article")
                .each(function () {
                let href = $(this).find("div > a").attr("href");
                if (href) {
                    href = href.split("vnexpress.net/")[1].split(".html")[0];
                }
                const images = $(this)
                    .find("div > a > picture > img")
                    .attr("data-src");
                const title = $(this).find("div > a").attr("title");
                const description = $(this).find("p > a").text();
                if (href && images && title && description) {
                    listNews.push({ href, images, title, description });
                }
            });
        }
    });
    return listNews;
});
const baseController = {
    vnExpress: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const slug = req.query.slug;
        const url = `https://vnexpress.net/${slug}`;
        try {
            const listNews = yield getDataVnExPress(url);
            return res.json({ success: true, data: listNews });
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ success: false, message: "Internal server" });
        }
    }),
    chiTietVnExpress: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.query.id;
        const url = `https://vnexpress.net/${id}.html`;
        // try {
        //   const html = await axios(url);
        //   const $ = cheerio.load(html.data);
        //   const detail: detailItem = { title: "", description: "", html: "" };
        //   $(".page-detail.top-detail > div > div").each(function (i) {
        //     if (i === 1) {
        //       detail.title = $(this).find("h1").text();
        //       detail.description = $(this).find(".description").text();
        //       detail.html = $(this).find("#divfirst").html();
        //     }
        //   });
        //   return res.json({ success: true, data: detail });
        // } catch (err) {
        //   console.log(err);
        //   return res
        //     .status(500)
        //     .json({ success: false, message: "Internal server" });
        // }
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        const grabParagraph = yield page.evaluate(() => {
            const title = document.querySelector("h1.title-detail");
            const description = document.querySelector("p.description");
            document.querySelectorAll("img").forEach((item) => {
                item.src = item.dataset.src;
                console.log(item.dataset.src);
            });
            const html = document.querySelector("article.fck_detail");
            return {
                title: title.textContent,
                description: description.textContent,
                html: html.innerHTML,
            };
        });
        yield browser.close();
        return res.json({ success: true, data: grabParagraph });
    }),
};
exports.default = baseController;
//# sourceMappingURL=baseController.js.map