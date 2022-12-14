const express = require("express");
const nodemailer = require("nodemailer");
var cors = require("cors");
require("./db/moogoose");
const User = require("./models/users");
const Supplies = require("./models/supplies");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors()); // Use this after the variable declaration
app.use(express.json());

app.post("/signup", async (req, res) => {
  const test = new User(req.body);
  test
    .save()
    .then(() => {
      res.send(test);
      res.status(200);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});
app.post("/insert", async (req, res) => {
  const test = new Supplies(req.body);
  test
    .save()
    .then(() => {
      res.send(test);
      res.status(200);
    })
    .catch((e) => {
      res.status(400);
      res.send(e);
    });
});
app.post("/login", async (req, res) => {
  let status = 500,
    response = {};
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); /// vì email duy nhất nên findOne

    if (!user) {
      status = 401; /// 401 Unauthorized
      throw new Error("Email or password is incorrect!!");
    }
    /// nếu có email cần check xem password có match đúng với db không?
    const isMatch = (await password) === user.password;
    if (!isMatch) {
      /// nếu password không chính xác thì trả ra lỗi
      status = 401; /// 401 Unauthorized
      throw new Error("Email or password is incorrect!!");
    }

    /// khúc này nếu bạn kỹ tính hãy tạo 1 phương thức chung để format dữ liệu
    /// còn mình làm nhanh thì trả ra dữ liệu luôn
    response.status = 200;
    response.message = "Login successful";
    response.internal_message = `${user.name}`;
    return res.status(response.status).json(response);
  } catch (error) {
    let err = { error: "error", message: error.message };
    response.status = status || 500;
    response.message = error.message;
    response.internal_message = error.message;
    response.errors = [err];

    return res.status(response.status).json(response);
  }
});

app.post("/getall", async (req, res) => {
  let status = 500,
    response = {};
  const { iduser } = req.body;
  const supplies = await Supplies.find({ iduser });
  response.status = 200;
  response.message = supplies;
  response.internal_message = `success with ${iduser}`;

  return res.status(response.status).json(response);
});
app.post("/update", async (req, res) => {
  let status = 500,
    response = {};
  const { name, type, count, unit } = req.body;
  const supply = await Supplies.findOne({ name }); 
  const filter = { name: name };
  // create a document that sets the plot of the movie
  const updateDoc = {
    $set: {
      name: name,
      type: type,
      count: count,
      unit: unit,
    },
  };
  const result = await Supplies.updateOne(filter, updateDoc);
  response.status = 200;
  response.message = 'Update successful';
  response.internal_message = 'success';

  return res.status(response.status).json(response);
});
app.post("/delete", async (req, res) => {
  let status = 500,
    response = {};
  const { name } = req.body;
  
  const result = await Supplies.deleteOne( {name: name});
  response.status = 200;
  response.message = 'delete successful';
  response.internal_message = `delete successful`;

  return res.status(response.status).json(response);
});
//khoi tao 1 api co phuong thuc post de nhan email nguoi dung va gui mail den dia chi email cua nguoi dung cung cap
app.post("/sendMail", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }); /// vì email duy nhất nên findOne
  const randomPass = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
  // create a filter for a movie to update
  const filter = { email: email };
  // create a document that sets the plot of the movie
  const updateDoc = {
    $set: {
      password: `${randomPass}`,
    },
  };
  const result = await User.updateOne(filter, updateDoc);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thanhduong10022001@gmail.com", // generated ethereal user
      pass: "fdoksxyjumlyhtla", // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: "thanhduong10022001@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: "Reset password", // Subject line
      text: "Current password", // plain text body
      html: `<b>New your account 's password is ${randomPass}</b>`, // html body
    },
    (err) => {
      if (err) {
        return res.json({
          message: "Error",
          err,
        });
      }
      return res.json({
        status: 200,
        message: `Email has been sent successfully to ${email}`,
      });
    }
  );
});

app.post("/sendOTP", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }); /// vì email duy nhất nên findOne
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thanhduong10022001@gmail.com", // generated ethereal user
      pass: "fdoksxyjumlyhtla", // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: "thanhduong10022001@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: "OTP code", // Subject line
      text: "OTP code", // plain text body
      html: `<b>Your OTP code is ${user.codeOTP}</b>`, // html body
    },
    (err) => {
      if (err) {
        return res.json({
          message: "Error",
          err,
        });
      }
      return res.json({
        status: 200,
        message: `Email has been sent successfully to ${email}`,
      });
    }
  );
});

app.post("/checkOTP", async (req, res) => {
  let status = 500,
    response = {};
  const { email, codeOTP } = req.body;
  const user = await User.findOne({ email }); /// vì email duy nhất nên findOne
  const isMatch = (await codeOTP) === user.codeOTP;
  if (!isMatch) {
    /// nếu password không chính xác thì trả ra lỗi
    response.status = 401; /// 401 Unauthorized
    response.message = "Login Failed";
    response.internal_message = "Login Failed";
    return res.status(response.status).json(response);
  }
  /// khúc này nếu bạn kỹ tính hãy tạo 1 phương thức chung để format dữ liệu
  /// còn mình làm nhanh thì trả ra dữ liệu luôn
  response.status = 200;
  response.message = "Login successful";
  response.internal_message = "Login successful";

  return res.status(response.status).json(response);
});

app.post("/updateProfile", async (req, res) => {
  let status = 500,
    response = {};
  const { email, name, linkAvt } = req.body;
  const user = await User.findOne({ email }); /// vì email duy nhất nên findOne
  // create a filter for a movie to update
  const filter = { email: email };
  // create a document that sets the plot of the movie
  const updateDoc = {
    $set: {
      linkAvt: `${linkAvt}`,
      name: `${name}`,
    },
  };
  const result = await User.updateOne(filter, updateDoc);
  response.status = 200;
  response.message = `${name}`;
  response.internal_message = `${linkAvt}`;

  return res.status(response.status).json(response);
});
app.post("/updatePassword", async (req, res) => {
  let status = 500,
    response = {};
  const { email, oldPass, newPass } = req.body;
  const user = await User.findOne({ email }); /// vì email duy nhất nên findOne
  const isMatch = (await oldPass) === user.password;
  if (!isMatch) {
    /// nếu password không chính xác thì trả ra lỗi
    response.status = 401; /// 401 Unauthorized
    response.message = "Old Password is wrong";
    response.internal_message = "Update Failed";
    return res.status(response.status).json(response);
  }
  // create a filter for a movie to update
  const filter = { email: email };
  // create a document that sets the plot of the movie
  const updateDoc = {
    $set: {
      password: `${newPass}`
    },
  };
  const result = await User.updateOne(filter, updateDoc);
  response.status = 200;
  response.message = `Password is updated`;
  response.internal_message = `Password is updated`;

  return res.status(response.status).json(response);
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
