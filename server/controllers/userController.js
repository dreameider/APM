const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// body-parser middleware use
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

/*connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});*/

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var storage_download = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./download"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});
var download = multer({
  storage: storage_download,
});

exports.homePage = (req, res) => {
  res.render("homePage");
};
exports.uploadfile = (req, res) => {
  console.log("yessssss");
  res.render("uploadfiles");
};
exports.adminlogin = (req, res) => {
  res.render("loginpage");
};
exports.studentlogin = (req, res) => {
  res.render("loginpage");
};
exports.facultylogin = (req, res) => {
  res.render("teacherloggedin");
};
exports.studentRegisterForm = (req, res) => {
  res.render("studentRegister");
};
exports.facultyRegisterForm = (req, res) => {
  res.render("facultyRegister");
};

exports.getstudent = (req, res) => {
  res.render("getstudent");
  /*connection.query(
    "SELECT * FROM " + "students" + " WHERE username = '" + "lol"
  );*/
};
exports.studentmark = (req, res) => {
  const username = req.get("Referrer"),
    indexOfQm = username.indexOf("?username=");
  const loll = username
    .split("")
    .slice(indexOfQm + 10)
    .join("");
  console.log("yrrrrrr", loll);
  console.log("yrrrrrr", req.body.comment);
  console.log("yrrrrrr", req.body.mark);

  connection.query(
    "UPDATE students SET mark='" +
      req.body.mark +
      "', comment='" +
      req.body.comment +
      "' WHERE Username='" +
      loll +
      "'"
  );
  console.log("ggggg");
};

exports.facultygetstudent = (req, res) => {
  connection.query(
    "SELECT * FROM " +
      "students" +
      " WHERE username = '" +
      req.query.username +
      "'",
    (err, rows) => {
      if (!err) {
        res.render("facultygetstudent", { rows });
      }
    }
  );
};

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query(
    'SELECT * FROM admin WHERE username = "manu"',
    (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render("home", { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query(
    "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-user");
};

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query(
    "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
    [first_name, last_name, email, phone, comments],
    (err, rows) => {
      if (!err) {
        res.render("add-user", { alert: "User added successfully." });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

exports.studentRegister = (req, res) => {
  const {
    studentName,
    registerNo,
    department,
    admissionNo,
    dob,
    gender,
    religion,
    adhar,
    bloogGroup,
    phone,
    email,
    address,
    psw,
  } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query(
    "INSERT INTO students SET Type = 'student', Username = ?, Registerno = ?, Department = ?, Admissionno = ?, DOB = ?, Gender = ?, Religion = ?, Aadhar = ?, Bloodgroup = ?, Phoneno = ?, Email = ?, Address = ?, psw = ?,Semester = ''   ",
    [
      studentName,
      registerNo,
      department,
      admissionNo,
      dob,
      gender,
      religion,
      adhar,
      bloogGroup,
      phone,
      email,
      address,
      psw,
    ],
    (err, rows) => {
      if (!err) {
        res.render("add-user", { alert: "User added successfully." });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};
exports.facultyRegister = (req, res) => {
  const {
    studentName,
    registerNo,
    department,
    admissionNo,
    dob,
    gender,
    religion,
    adhar,
    bloogGroup,
    phone,
    email,
    address,
    psw,
  } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query(
    "INSERT INTO managment SET Type = 'faculty', Username = ?, Registerno = ?, Department = ?, Admissionno = ?, DOB = ?, Gender = ?, Religion = ?, Aadhar = ?, Bloodgroup = ?, Phoneno = ?, Email = ?, Address = ?, psw = ?,Semester = ''   ",
    [
      studentName,
      registerNo,
      department,
      admissionNo,
      dob,
      gender,
      religion,
      adhar,
      bloogGroup,
      phone,
      email,
      address,
      psw,
    ],
    (err, rows) => {
      if (!err) {
        res.render("add-user", { alert: "User added successfully." });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query(
    "SELECT * FROM students WHERE username = '" + req.query.username + "'",
    (err, rows) => {
      if (!err) {
        console.log("blaaalollll", rows);
        res.render("edit-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query(
    "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
    [first_name, last_name, email, phone, comments, req.params.id],
    (err, rows) => {
      if (!err) {
        // User the connection
        connection.query(
          "SELECT * FROM managment WHERE username = '" +
            req.query.username +
            "'",
          (err, rows) => {
            // When done with the connection, release it

            if (!err) {
              res.render("edit-user", {
                rows,
                alert: `${first_name} has been updated.`,
              });
            } else {
              console.log(err);
            }
            console.log("The data from user table: \n", rows);
          }
        );
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Delete User
exports.delete = (req, res) => {
  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  connection.query(
    "UPDATE user SET status = ? WHERE id = ?",
    ["removed", req.params.id],
    (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent("User successeflly removed.");
        res.redirect("/?removed=" + removedUser);
      } else {
        console.log(err);
      }
      console.log("The data from beer table are: \n", rows);
    }
  );
};

// View Users
exports.viewall = (req, res) => {
  // User the connection
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("view-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

(exports.download = download.single("image")),
  (req, res) => {
    console.log("username:");
    //@type   POST
    //route for post data
    console.log("req: ", req);
    const username = req.get("Referrer"),
      indexOfQm = username.indexOf("?username=");
    const loll = username
      .split("")
      .slice(indexOfQm + 1)
      .join("");

    console.log(req.file.filename);
    var imgsrc = "http://localhost:5000/uploads/" + req.file.filename;
    var insertData = "INSERT INTO students ";
    connection.query(
      "UPDATE students SET DOC = " + imgsrc + " WHERE Username='lol'",
      (err, result) => {
        if (err) throw err;
        console.log("file uploaded");
      }
    );

    console.log("yess save loll");
  };
(exports.save = upload.single("image")),
  (req, res) => {
    console.log("username:");
    //@type   POST
    //route for post data
    console.log("req: ", req);
    const username = req.get("Referrer"),
      indexOfQm = username.indexOf("?username=");
    const loll = username
      .split("")
      .slice(indexOfQm + 1)
      .join("");

    console.log(req.file.filename);
    var imgsrc = "http://localhost:5000/uploads/" + req.file.filename;
    var insertData = "INSERT INTO students ";
    connection.query(
      "UPDATE students SET DOC = " + imgsrc + " WHERE Username='lol'",
      (err, result) => {
        if (err) throw err;
        console.log("file uploaded");
      }
    );

    console.log("yess save loll");
  };

exports.loginuser = (req, res) => {
  const reqname = req.query.username;
  var db_select = "";

  if (req.get("Referrer") === "http://localhost:5000/adminlogin") {
    db_select = "admin";
  }
  if (req.get("Referrer") === "http://localhost:5000/studentlogin") {
    db_select = "students";
  }
  if (req.get("Referrer") === "http://localhost:5000/facultylogin") {
    db_select = "managment";
  }
  console.log("bkoooo", db_select);
  //if(req.query.username)
  // User the connection
  connection.query(
    "SELECT * FROM " +
      db_select +
      " WHERE username = '" +
      req.query.username +
      "'",
    (err, rows) => {
      if (!err) {
        if (req.query.psw === rows[0].psw && rows[0].Type === "student") {
          res.render("loggedInStudent", { rows });
        } else if (db_select === "admin" && req.query.psw === rows[0].psw) {
          res.render("facultyRegister");
        } else if (
          rows[0].Type === "faculty" &&
          req.query.psw === rows[0].psw
        ) {
          res.render("teacherloggedin");
        } else {
          console.log("blaalollll");

          res.render("homePage", { rows });
        }
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};
