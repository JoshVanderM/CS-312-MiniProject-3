import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// variable to store blogs
let blogs = [];

// get it so the static objects can use css
app.use(express.static("public"));

// parse incoming data 
app.use(bodyParser.urlencoded({ extended: true }));

// renders the main home page 
app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogs: blogs
    })
});

// renders the home page after updating blogs with the new blog data
// uses .toLocaleString() to help make data format look better 
app.post("/submit", (req, res) => {
    const blog = {
        author: req.body.author,
        blog_title: req.body.blog_title,
        blog: req.body.blog,
        date: new Date().toLocaleString()
    };
    blogs.push(blog)
    res.redirect("/");
});

// Deletes the blog at index returned and fills gap wih function (splice)
app.post("/delete", (req, res) => {
    const blogIndex = req.body.index;
    blogs.splice(blogIndex, 1);
    res.redirect("/")
});

// grab the data at index in blogs to load into the for on edit.ejs and render
app.get("/edit/:index", (req, res) => {
    const blogIndex = req.params.index;
    const blog = blogs[blogIndex];
    res.render("edit.ejs", {
        blog: blog,
        index: blogIndex
    })
});

// update the data at index with form data from edit.ejs return to home page
// uses .toLocaleString() to help make data format look better 
app.post("/update/:index", (req,res) => {
    const blogIndex = req.params.index;
    blogs[blogIndex] = {
        author: req.body.author,
        blog_title: req.body.blog_title,
        blog: req.body.blog,
        date: new Date().toLocaleString() 
    };
    res.redirect("/");
});

// make web app run on ${port}
app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
});

