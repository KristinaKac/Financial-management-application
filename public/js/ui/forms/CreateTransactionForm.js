
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelect = this.element.querySelector('.accounts-select');

    Account.list(User.current(), (err, response) => {
      if (response && response.success === true) {

        const option = Array.from(accountsSelect.querySelectorAll('option'));
        option.forEach(item => item.remove());

        response.data.forEach(item => {
          const account = `<option value="${item.id}">${item.name}</option>`;
          accountsSelect.insertAdjacentHTML('beforeend', account);
        });
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success === true) {
        this.element.reset();
        this.element.closest('.modal').style.removeProperty('display');
        App.update();
      }
    });
  }
}