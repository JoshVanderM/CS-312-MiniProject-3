import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'BlogDB',
    password: 'vander2003',
    port: 5432,
});

db.connect();

// variable to store blogs
let blogs = [];
let currentUser = null;

// Set up view engine and static files
app.set('view engine', 'ejs');

// get it so the static objects can use css
app.use(express.static("public"));

// parse incoming data 
app.use(bodyParser.urlencoded({ extended: true }));

// renders the main home page 
app.get("/", async(req, res) => {
    if(currentUser === null)
    {
        res.render("signup", { error: null });
    } else {
        const result = await db.query('SELECT * FROM blogs ORDER BY date_created DESC');
        res.render("index.ejs", {
            blogs: result.rows
        });
    }   
});

// Renders the signup page
app.get("/signup", (req, res) => {
    res.render("signup", { error: null });
});

// Handle signup form submission
app.post("/signup", async (req, res) => {
    const { password, name } = req.body;

    const userPassword = String(password);
    const userName = String(name);

    const result = await db.query('SELECT * FROM users WHERE name = $1', [name]);

    // check for user already taken
    if (result.rowCount > 0) {
        // Username is already taken
        return res.render("signup", { error: 'Username is already taken. Please choose a different one.' });
    }

    // if client info is fine send to datbase 
    await db.query('INSERT INTO users (password, name) VALUES ($1, $2)', [userPassword, userName]);

    // redirect to signin page to use new login we created 
    res.redirect('/signin');
});

// Renders the signin page
app.get("/signin", (req, res) => {
    res.render("signin", { error: null });
});

// Handle signin form submission
app.post("/signin", async (req, res) => {
    const { name, password } = req.body;

    const userPassword = String(password);
    const userName = String(name);

    const result = await db.query('SELECT * FROM users WHERE name = $1 AND password = $2', [userName, userPassword]);

    // check for invalid log in
    if (result.rows.length === 0) {
        return res.render("signin", { error: 'Invalid User ID or Password. Please try again.' });
    }

    // Successful login
    currentUser = {
        id: result.rows[0].user_id,
        name: result.rows[0].name,
    };

    // successful login redirect to main page
    res.redirect("/");
});

// renders the home page after updating blogs with the new blog data
// uses .toLocaleString() to help make data format look better 
app.post("/submit", async (req, res) => {
    const blog = {
        creator_name: String(currentUser.name),
        creator_user_id: currentUser.id, 
        title: String(req.body.blog_title), 
        body: String(req.body.blog), 
        date: String(new Date().toLocaleString())
    };

    console.log(blog);

    // Using new Date() to get the current timestamp
    await db.query(
        'INSERT INTO blogs (creator_name, creator_user_id, title, body, date_created) VALUES ($1, $2, $3, $4, $5)',
        [blog.creator_name, blog.creator_user_id, blog.title, blog.body, blog.date]
    );

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

