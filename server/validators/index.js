const isEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let isNum = (char) => {
  if (char >= "0" && char <= "9") {
    return true;
  } else return false;
};

const validatePhone = (phone) => {
  if (phone.length) {
    for (let i = 0; i < phone.length; i++) {
      if (isNum(phone[i]) === false) return false;
    }
    if (phone[0] === "0") {
      if (phone[1] === "1") {
        if (phone.length === 11) return true;
        else return false;
      } else return false;
    } else return false;
  } else return false;
};

const passwordValidator = (password) => {
  let len = password.length;
  if (len < 6) return false;
  else {
    let check = /\s/g.test(password);
    return !check;
  }
};

const validSignup = (data) => {
  let valid = {
    msg: "",
    status: true,
  };

  let isValidEmail = isEmail.test(data.email);
  if (!isValidEmail) {
    valid.msg = "Email is not Valid";
    valid.status = false;

    return valid;
  }

  let isName = /\S/.test(data.name);
  if (!isName) {
    valid.msg = "Name cannot be empty";
    valid.status = false;

    return valid;
  }

  let isPhone = validatePhone(data.phone);
  if (!isPhone) {
    valid.msg = "Phone number is not valid";
    valid.status = false;
  }

  let isPassword = passwordValidator(data.password);
  if (!isPassword) {
    valid.msg =
      "Password must be minimum of 6 characters and must not hold space";

    valid.status = false;

    return valid;
  }

  return valid;
};

const validAddProduct = (data) => {
  let valid = {
    msg: "",
    status: true,
  };

  let isName = /\S/.test(data.name);
  if (!isName) {
    valid.msg = "Product Name cannot be empty";
    valid.status = false;

    return valid;
  }

  let isPath = /\S/.test(data.imagePath);
  if (!isPath) {
    valid.msg = "Image path is not defined";
    valid.status = false;

    return valid;
  }

  let isDesc = /\S/.test(data.description);
  if (!isDesc) {
    valid.msg = "";
    valid.status = false;

    return valid;
  }

  return valid;
};

const validUpdate = (data) => {
  let valid = {
    msg: "",
    status: true,
  };

  let isName = /\S/.test(data.name);
  if (!isName) {
    valid.msg = "Product Name cannot be empty";
    valid.status = false;

    return valid;
  }

  let isDesc = /\S/.test(data.description);
  if (!isDesc) {
    valid.msg = "";
    valid.status = false;

    return valid;
  }

  return valid;
};

module.exports = { validSignup, validAddProduct, validUpdate };
