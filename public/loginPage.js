"use strict";

let thisUser = new UserForm();
let err = new Error("Неверное имя пользователя и/или пароль");

thisUser.loginFormCallback = (data) =>
  ApiConnector.login(data, (response) => {
    if (response.succsess) location.reload();
    else thisUser.setLoginErrorMessage(response.error);
  });
thisUser.registerFormCallback = (data) =>
  ApiConnector.register(data, (response) => {
    if (response.succsess) location.reload();
    else thisUser.setLoginErrorMessage(response.error);
  });
