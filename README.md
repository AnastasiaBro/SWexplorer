You can find the result here: https://anastasiabro.github.io/SWexplorer/#/SWexplorer/.

<h2>Проект SWexplorer</h2>
<h3>Общее описание</h3>
<p>Созданное приложение предназначено для изучения принципов, инструментов и технологий, используемых при построении фронт-энда современных веб-приложений в процессе его проектирования и создания. Приложение представляет собой набор веб-страниц и скриптов, использующих REST веб-сервисы для визуального отображения получаемых данных.</p>

<h3>Ограничения и используемые инструменты</h3>
<ol>
<li>Приложение разработано на основе фреймворка React.JS, используется create-react-app.</li>
<li>В качестве инструментов сборки и упаковки приложения выбраны инструменты: Babel и Webpack. Для создания многостраничного приложения используется React-router.</li>
<li>Данные, отображаемые в приложении, получаются из внешнего свободно распространяемого веб-сервиса swapi и из локального сервера. Данные приходят в формате json.</li>
<li>Исходный код приложения размещен в публичном репозитории в сервисе github.</li>
<li>Репозиторий с исходным кодом содержит общее описание функционала приложения и его реализацию.</li>
<li>Приложение реализовано на английском языке.</li>
<li>Изображения, используемые в приложении, находятся на локальном сервере nginx.</li>
</ol>

<h3>Функционал приложения</h3>
<ol>
<li>Веб-интерфейс включает в себя следующие страницы:
<ol>
<li>«Home» с компонентами:
<ul>
<li>информация о данном приложении SWexplorer, о «Звездных войнах», о веб-сервисе swapi</li>
<li>виджет с погодой на случайной планете</li>
<li>виджет с цитатой магистра Йоды</li>
<li>компонент поиска по 6 категориям — персонажи, планеты, корабли, космические станции, расы и фильмы</li>
<li>комментарии пользователей</li>
</ul></li>

<li>«Films» с компонентами:
<ul>
<li>список фильмов</li>
<li>при выборе одного фильма отображается компонент «Active film» с атрибутами выбранного фильма</li>
<li>два модальных окна «Person» и «Planet» для выбранного фильма</li>
</ul></li>

<li>«Directors» с компонентами:
<ul>
<li>список режиссеров</li>
<li>информация о выбранном режиссере</li>
</ul></li>

<li>«Map» с описанием функционала приложения</li>

<li>Страница аутентификации «Login page».</li></ol></li>


<li>На всех страницах:
<ol>
<li>навигация в шапке сайта</li>
<li>кнопка для открытия страницы аутентификации либо кнопка для выхода из системы Login/Logout</li>
<li>в «футере» ссылки на swapi и репозиторий на github.</li>
</ol>
</li>
</ol>

<h3>Доступные действия для всех пользователей</h3>
<ul>
<li>На главной странице доступен поиск по персонажам из мира ЗВ, планетам, кораблям, космическим станциям, расам и фильмам. Поиск срабатывает при изменении поля поиска (input) — появляется список доступных элементов для выбора. После выбора элемента появятся его атрибуты. Атрибуты, отмеченные подчеркиванием, кликабельны и являются ссылками на другие элементы поиска.</li>

<li>На главной странице можно оставить свой комментарий. Единственное требование — должны быть заполнены оба поля «Имя» и «Комментарий». При успешной публикации откроется последняя страница с комментариями. С помощью кнопок <<, <, >, >>  можно перемещаться по страницам.</li>

<li>На странице с фильмами доступен поиск фильмов, который срабатывает по «Enter».</li>

<li>На странице с фильмами при выборе фильма открываются его атрибуты и кнопки для открытия модальных окон с персонажами и фильмами. При открытии модального окна элементы можно смотреть с помощью < и >.</li>

<li>На странице с режиссерами при выборе одного из них доступна информация — имя, дата рождения и биография режиссера, а также какие фильмы он снял.</li>

<li>На странице LoginPage доступна аутентификация пользователя.</li>
</ul>

<h3>Дополнительные действия для администратора</h3>
<ul>
<li>Если вход в систему совершен администратором, с сервера приходит token. Token действителен в течение часа, после этого при действиях администратора в случае устаревания token идет запрос на сервер с помощью refresh_token и token обновляется.</li>

<li>В случае успешной авторизации администратор имеет дополнительные права: просматривать удаленные комментарии на странице с комментариями, удалять новые, редактировать информацию о режиссерах на странице с режиссерами, выбирать и удалять связи с фильмами, а также удалять режиссеров и добавлять новых.</li>
</ul>

<h3>Ссылки</h3>
<ul>
<li>1. Babel - https://babeljs.io/</li>
<li>2. Webpack - https://webpack.js.org/</li>
<li>3. Сервис swapi - https://www.swapi.co/</li>
<li>4. Сервис github - https://github.com/</li>
<li>5. Create-react-app – https://github.com/facebook/create-react-app/</li>
<li>6. React-router - https://www.npmjs.com/package/react-router/</li>
<li>7. Локальный сервер nginx - https://nginx.org/</li>
</ul>