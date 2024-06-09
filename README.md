# UnadeskTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Задание
Создать страницу со списком пользователей. Дизайн не важен, нужно сделать так, чтобы было человекопонятно.
Требования:
1. Заголовок страницы.
2. Список пользователей в двух видах: карточки и строчки.
3. Сделать мок сервиса получения данных в соответствии с приложенным файлом (считаем, что это http-ответы от сервера). Имитировать задержку ответа от сервера (например, с помощью delay). Запросы на мок сервер должны быть не чаще 1 раза в 500 мс.
4. Показать индикатор загрузки (можно просто слово Загрузка...).
5. Должна быть строка поиска, которая ищет по имени пользователя user_name.
6. Должна быть пагинация и возможность выбора количества элементов на странице (5, 10 или 20).
7. У каждого элемента должна быть кнопка Удалить
Разделить код на уместные с Вашей точки зрения файлы. Не использовать сторонние библиотеки. 
Код разместить на github.

## Что стоит отметить
1. Про дизайн не важен: делать что-то с откровенно неоч дизайном мне неприятно и не хочется поэтому тут я +-сделал все красиво
2. Про "Запросы на мок сервер должны быть не чаще 1 раза в 500 мс", это плохая практика, запросы должны идти и если сервер не успевает отвечать то они должны прерываться. Например если пользователь как псих кликает по пагинатору туда сюда то некорректно блокировать эту возможность пока первый запрос не отработает. Запросы должны идти по порядку, каждый следующий будет отменять предыдущий. Думаю тут конечно было сказано про debounceTime для фильтра, и если так, то сформулировано некорректно
3. В присланой инфе для моков у всех пользователей флаг `is_active` был true и у одного я изменил значение чтобы на интерфейсе хоть кто-то отличался
4. Пункт про сторонние библиотеки странный, а когда я задал уточняющий вопрос то ничего внятного не получил в ответ. Помимо Angular и RxJs использовал component-store пакет из NgRx для работы со сторами, линтер и плагины для него чтобы код маломальски нормально выглядел а также вебпак плагин для удобного линтинга в лайв формате. Ну и конечно же компонентную библиотеку TaigaUI. Неприятный дизайн как я уже сказал мне делать не хотелось, поэтому выбрал существующую компонентную библиотеку, чтоб не мучать себя и не тратить время на то чтобы сделать приемлемо-красиво. Кажется суть задания была направлена не на это так что думаю это не должно на что-то повлиять

Буду рад услышать фидбек по решению 
## Development server

Run `yarn && yarn start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
