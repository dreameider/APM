const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.get("/", userController.homePage);
router.get("/adminlogin", userController.adminlogin);
router.get("/studentlogin", userController.adminlogin);
router.get("/facultylogin", userController.adminlogin);
router.get("/studentregister", userController.studentRegisterForm);
//router.get("/facultyregister", userController.facultyRegisterForm);
//router.post("/", userController.find);
router.get("/adduser", userController.form);
router.get("/loggedinuser", userController.loginuser);
router.post("/save", userController.save);
router.post("/download", userController.download);

router.post("/adduser", userController.create);
router.post("/addStudent", userController.studentRegister);
router.post("/addFaculty", userController.facultyRegister);
router.get("/edituser/:username", userController.edit);
router.post("/edituser/:username", userController.update);
router.get("/viewuser/:id", userController.viewall);
router.get("/:id", userController.delete);
router.post("/uploadfiles");

module.exports = router;
