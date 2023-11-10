/* eslint-disable no-undef */
import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const Register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const { error } = signupSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const checkEmail = await User.checkEmailExists(email);
    if (checkEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(name, email, hashedPassword, phone, address);
    const accessToken = jwt.sign({ id: userId }, "duantotnghiep", {
      expiresIn: "1d",
    });
    res.json({
      id: userId,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.checkEmailExists(email);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }
    const accessToken = jwt.sign({ id: user.id }, "duantotnghiep", {
      expiresIn: "1d",
    });
    res.json({
      user,
      accessToken
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendResetLinkEmail = async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hainv21123@gmail.com",
      pass: "yfaqudeffxnjptla",
    },
  });
  const hashedEmail = await bcrypt.hash(
    email,
    parseInt(process.env.BCRYPT_SALT_ROUND)
  );

  try {
    const checkEmail = await User.checkEmailExists(email);
    if (!checkEmail) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }
    const mailOptions = {
      from: email,
      to: email,
      subject: "Thông tin khóa",
      html: `<div style="font-family: sans-serif; margin: 0 40px;">
        <img
          style="width: 200px"
          src="https://res.cloudinary.com/dksgvucji/image/upload/v1698334367/samples/logo2_bmcqc2.png"
          alt=""
        />
        <p>Chào <span style="font-weight: 600">${checkEmail.name},</span></p>
        <p>
          Bạn đã yêu cầu đổi mật khẩu tại
          <span style="font-weight: 600">Website Đặt lịch chăm sóc thú cưng PetCare</span>
        </p>
        <p>Bạn vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu</p>
        <div style="padding: 20px 0 20px 40px">
          <a
            href="http://localhost:3000/reset-password?email=${encodeURIComponent(
              email
            )}&token=${encodeURIComponent(hashedEmail)}""
            target="_blank"
            style="
              background-color: #00575C;
              border: none;
              color: white;
              padding: 10px 15px;
              text-decoration: none;
              font-size: 20px;
              border-radius: 6px;
            "
          >
            Nhấn vào đây
          </a>
        </div>
        <p style="width: 100%;height: 1px; background-color: #00575C;"></p>
        <div style="text-align: right;">
    
          <p>Nếu Bạn có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại</p>
          <p>Trân trọng,</p>
          <p style="font-weight: 600;">Ban quản trị Website Đặt lịch chăm sóc thú cưng PetCare</p>
        </div>
      </div>`,
    };
    await transporter.sendMail(mailOptions);
    res.json({
      message: "Bạn vui lòng check email của mình",
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  try {
    bcrypt.compare(email, token, (err, result) => {
      console.log("compare", result);
      if (result == true) {
        bcrypt
          .hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
          .then(async (password) => {
            await User.resetPassword(email, password);
            res.status(200).json({
              message: "Đổi mật khẩu thành công",
            });
          });
      } else {
        res.status(400).json({
          message: "Đổi mật khẩu thất bại",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
