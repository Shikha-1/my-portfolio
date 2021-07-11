const express = require("express");
const router = new express.Router();

try {
    router.get("/", (req, res) => {
    res.status(200).render("index")
    })
} catch (err) {
    res.status(404).send(`Error! ${err.message}!`);
}


try {
    router.get("/about", (req, res) => {
    res.status(200).render("about")
    })
} catch (err) {
    res.status(404).send(`Error! ${err.message}!`);
}


try {
    router.get("/contact", (req, res) => {
    res.status(200).render("contact")
    })
} catch (err) {
    res.status(404).send(`Error! ${err.message}!`);
}

try {
    router.get("/skills", (req, res) => {
    res.status(200).render("skills")
    })
} catch (err) {
    res.status(404).send(`Error! ${err.message}!`);
}


try {
    router.get("/projects", (req, res) => {
    res.status(200).render("project")
    })
} catch (err) {
    res.status(404).send(`Error! ${err.message}!`);
}

module.exports = router;