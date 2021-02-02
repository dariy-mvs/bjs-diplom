'use strict'


let err = new Error('что-то пошло не так');

let logoutUser = new LogoutButton;
logoutUser.action = () => ApiConnector.logout((response) => {
  if(response.succsess) location.reload()
  else return err});

ApiConnector.current((response) => {
  if(response.success) ProfileWidget.showProfile(response.data)
  else return err;
});

let thisUserBoard = new RatesBoard;
function refreshBoard() { 
  ApiConnector.getStocks((response) => {
  if (response.success) {
    thisUserBoard.clearTable();
    thisUserBoard.fillTable(response.data) 
  } else return err;
});
};

refreshBoard();

setInterval(refreshBoard, 60000);

let thisUserMoney = new MoneyManager;

function checkWidget(response, trueString = 'Успешно выполнено!', falseString = 'Что-то пошло не так...') {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    thisUserMoney.setMessage(response.success, trueString);
  } else {
    thisUserMoney.setMessage(response.success, falseString);
    return err};
}

thisUserMoney.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => checkWidget(response, 'Пополнение счёта прошло успешно!')); 
}

thisUserMoney.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data,(response) => checkWidget(response, 'Конвертация прошла успешно!'));

thisUserMoney.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => checkWidget(response, 'Перевод прошёл успешно!'));

let thisUserFavorites = new FavoritesWidget;

function newTable(response) {
  if (response.success) {
    thisUserFavorites.clearTable();
    thisUserFavorites.fillTable(response.data);
    thisUserMoney.updateUsersList(response.data);
  }
}

ApiConnector.getFavorites((response) => newTable(response));

thisUserFavorites.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => newTable(response));

thisUserFavorites.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => newTable(response));