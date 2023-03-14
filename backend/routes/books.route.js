const router = require("express").Router();

const { books } = require("../controller");

router.get("/", books.listBooks);
router.get("/:id", books.getBookyId);
router.post("/", books.createBook);
router.patch("/:id", books.updateBook);
router.delete("/:id", books.deleteBook);

module.exports = router;
