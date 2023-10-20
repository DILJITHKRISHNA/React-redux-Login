const User = require("../Model/userModel");
const bcrypty = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'path_to_your_upload_directory'); // Replace with your upload directory path
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // You can customize the filename if needed
  },
});

const upload = multer({ storage: storage });


const userImageUpload = upload.single('image'); // 'image' should match the field name in your form

const securedPassword = async (password) => {
  try {
    const passwordHash = await bcrypty.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
  }
};

//====================== USER SIGN UP ==================//
const userRegistration = async (req, res) => {
  try {
  
    const { name, email, phone, password } = req.body;
    const spassword = await securedPassword(password);
    const exist = await User.findOne({ email: email });

    if (exist) {
      res.json({ alert: "Email already exist", status: false });
    } else {
      const user = new User({
        userName: name,
        email: email,
        password: spassword,
        mobile: phone,
      });

      const userSavedData = await user.save();
      const token = jwt.sign(
        { userId: userSavedData._id },
        process.env.tokenSecret,
        {
          expiresIn: "1h",
        }
      );
      res.json({ userSavedData, alert: "registration", token, status: true });
    }
  } catch (error) {
    console.log(error);
  }
};

//====================== USER LOGIN ==========================//

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({email:email});
    
    console.log(email,exist,'gggggggggggggggggggg')
    if (exist) {
      const compared = await bcrypty.compare(password, exist.password);
      if (compared) {
        let token = jwt.sign({ userId: exist._id }, process.env.tokenSecret, {
          expiresIn: "1h",
        });
        res.json({
          userLogindata: exist,
          status: true,
          err: null,
          token,
        });
      }else{
      res.json({ alert: "Entered password is incorect !" });
      }
    } else {
      res.json({ alert: "Email not exist !" });
    }
  } catch (error) {
    console.log(error);
  }
};

//============== USER IMAGE UPLOAD OPTION ======================//

const userImage = async (req, res) => {
  try {
    const id = req.body.userId;
    const image = req.file.filename;
    console.log(image,"imageeeee");
    const updatedImage = await User.findOneAndUpdate(
      { _id: id },
      { $set: { image: image } },
      { new: true }
    ).then((response) => {
      res.json({ updated: true, data: response });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  userImage,
};
