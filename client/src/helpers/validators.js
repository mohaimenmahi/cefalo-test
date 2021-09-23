export const validateEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let isNum = (char) => {
  if (char >= "0" && char <= "9") {
    return true;
  } else return false;
};

export const validatePhone = (phone) => {
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

export const validateNameField = (name) => {
  return name.length > 0 && name.length < 30;
};

export const passwordValidator = (password) => {
  let len = password.length;
  if (len < 6) return false;
  else {
    let check = /\s/g.test(password);
    return !check;
  }
};

export const confirmPassValidator = (password, confirm) => {
  return password === confirm;
};
