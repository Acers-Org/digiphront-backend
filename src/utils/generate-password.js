const password_characters =
  "abcdefghijklmnop0123456789qrstuvwxyzABCDEFGHIJK!@#$%^&*_-+=LMNOPQRSTUVWXYZ";

const generatePassword = (length, characters = password_characters) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};

export default generatePassword;
