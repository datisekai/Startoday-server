import axios from "axios";
import cheerio from "cheerio";
import { Request, Response } from "express";
import puppeteer from "puppeteer";

interface newsItem {
  href: string;
  title: string;
  description: string;
  images: string;
}

interface detailItem {
  title: string;
  description: string;
  html: string;
}

const getDataVnExPress = async (url: string) => {
  const html = await axios(url);
  const $ = cheerio.load(html.data);
  let listNews: newsItem[] = [];
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
};

const baseController = {
  vnExpress: async (req: Request, res: Response) => {
    const slug = req.query.slug;
    const url = `https://vnexpress.net/${slug}`;
    try {
      const listNews = await getDataVnExPress(url);
      return res.json({ success: true, data: listNews });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server" });
    }
  },
  chiTietVnExpress: async (req: Request, res: Response) => {
    try {
      const id = req.query.id;
      const url = `https://vnexpress.net/${id}.html`;

      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
      const grabParagraph = await page.evaluate(() => {
        const title = document.querySelector("h1.title-detail");
        const description = document.querySelector("p.description");
        document.querySelectorAll("img").forEach((item) => {
          item.src = item.dataset.src;
        });
        const html = document.querySelector("article.fck_detail");

        return {
          title: title.textContent,
          description: description.textContent,
          html: html.innerHTML,
        };
      });
      await browser.close();
      return res.json({ success: true, data: grabParagraph });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  },
};

export default baseController;
