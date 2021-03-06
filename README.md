Стек: Vue 3 + composition api + Vuex + Typescript // Laravel

Задание было следующим:


back-end<br>
Необходимо реализовать API CRUD интерфейс для работы с сущностью «оборудование». Обязательные методы:<br>

Роут <br>
Действие <br>
GET: /api/equipment<br>
Вывод списка оборудования <br><br>

GET: /api/equipment/{id}<br>
Запрос данных по id<br><br>

POST: /api/equipment<br>
Создание новой записи<br><br>

PUT: /api/equipment/{id}<br>
Редактирование записи <br><br>

DELETE: /api/equipment/{id}<br>
Удаление записи <br><br>

Для хранения информации об оборудовании используются 2 таблицы в базе данных (использовать MySQL):<br>
    1. «Тип оборудования» поля: код, наименование типа, маска серийного номера.<br>
    2. «Оборудование» поля:  код, код типа оборудования, серийный номер (уникальное поле), примечание.<br><br>

При создании новых записей в поле «серийный номер» интерфейс принимает массив номеров каждый из которых  валидируется на соответствие маске и отсутствие в таблице «оборудование» в качестве уникального ключа. Создание может быть как по одному объекту, так и коллекция (на входе json-массив).
Если «серийный номер» не проходит валидацию, по нему формируется соответствующие сообщение, которое возвращает интерфейс, после обработки всего массива номеров.<br><br>   

Тип оборудования / Маска SN<br>
TP-Link TL-WR74 / XXAAAAAXAA<br>
D-Link DIR-300 / NXXAAXZXaa<br>
D-Link DIR-300 S / NXXAAXZXXX<br><br>

Где: <br>
N – цифра от 0 до 9;<br>
A – прописная буква латинского алфавита;<br>
a – строчная буква латинского алфавита;<br>
X – прописная буква латинского алфавита либо цифра от 0 до 9;<br>
Z –символ из списка: “-“, “_”, “@”.<br><br>


front-end<br>
Для отображения сделать минимальное SPA-приложение с использованием TypeScript и Vue, работающее с разработанным API. <br><br>

Форма добавления записей, содержащая:<br>
    1. Список «Тип оборудования» (id типа) select.<br>
    2. поле «Серийные номера» input-text/textarea.<br>
    3. Поле «Примечание» textarea<br>
    4. Кнопка «Добавить».<br><br>
    
Реализовать поиск, редактирование и удаление записей:<br>
1. Поисковая строка input-text, для поиск по серийному номеру/примечанию.<br>
