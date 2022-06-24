let fs = require("fs");
let Koa = require("koa");
let router = require("koa-router")();
let views = require("koa-views");
let nunjucks = require("nunjucks");
let static = require("koa-static");
let parser = require("koa-parser");
const path = require("path");

let app = new Koa();
app.use(parser());//用于解析post请求

function add_string(string) {
    let p = fs.openSync("daily.txt", "a+");
    fs.writeSync(p, `<div class='p'>${string}<div class='delete'><img src="html/image/完成.png" class="target_img"></div></div>`);
}//向任务列表文本中添加内容

function update_string(string) {
    let p = fs.openSync("daily.txt", "w");
    fs.writeSync(p, string);
}//覆盖原文本，更新整个文本

function get_string() {
    let result = fs.readFileSync('daily.txt').toString();
    result = result.replace("\n", "");
    return result;
}//获取任务列表文本内容

function del_string(num) {
    let str = get_string();
    let arr = str.split("<div class='p'>");
    arr.splice(0, 1);
    arr.splice(num, 1);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = "<div class='p'>" + arr[i]
    }

    update_string(arr.join(""));
}//删除任务文本中的部分内容

function get_music() {
    let p = fs.readdirSync(path.resolve(__dirname, "html/music"));
    return p;
}

function get_link() {
    let result = fs.readFileSync("link.txt").toString();
    return result;
}

function add_link(name, url) {
    let p = fs.openSync("link.txt", "a+");
    fs.writeSync(p, `<a class="table_link" href=${url} target="_blank"><div class="logo_href">${name[0]}</div><p class="link_name">${name}</p></a>`);
}

function delete_link(i) {
    let string = get_link().replace("<div class=\"table\"><div class=\"add_link logo_href\"><img src=\"html/image/加号.png\" class=\"add_img\"></div><p class=\"link_name\">添加</p></div>", "");
    let arr = string.split("</a>");
    arr.splice(i, 1);
    arr.splice(arr.length - 1, 1);
    for (let j = 0; j < arr.length; j++) {
        arr[j] = arr[j] + "</a>";
    }

    let result = "<div class=\"table\"><div class=\"add_link logo_href\"><img src=\"html/image/加号.png\" class=\"add_img\"></div><p class=\"link_name\">添加</p></div>" + arr.join("");
    link_update(result);
}

function link_update(s) {
    let p = fs.openSync("link.txt", "w");
    fs.writeSync(p, s);
}

app.use(views(__dirname, {
    map: {html: "nunjucks"}
}))//引入nunjucks模板渲染html


app.use(static(__dirname));//设置静态目录


router.get("/", async ctx => {
    await ctx.render("./home", {title: get_string(), link: get_link()});
})//路由设置进入主页的get请求返回内容

router.post("/", async ctx => {
    if (ctx.request.body.goal) {
        add_string(ctx.request.body.goal);
        await ctx.render("./home", {title: get_string(), link: get_link()});
    }
    if (ctx.request.body.link_url || ctx.request.body.link_name) {
        add_link(ctx.request.body.link_name, ctx.request.body.link_url);
        await ctx.render("./home", {link: get_link(), link: get_link()});
    }
})//路由设置添加文本时的post返回内容

router.post("/delete", async ctx => {
    del_string(ctx.request.body.delete_num);
    await ctx.render("./home", {title: get_string()})
})//路由设置删除文本时的post返回内容

router.get("/music", async ctx => {
    ctx.body = get_music();
})

router.post("/delete_link", async ctx => {
    delete_link(ctx.request.body.del_i);
    await ctx.render("./home", {link: get_link()});
})


app.use(router.routes());//将路由添加至中间件

app.listen(8080, () => {
    console.log("ok")
})//开始监听8080端口
