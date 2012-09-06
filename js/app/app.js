/**
 * Created with JetBrains PhpStorm.
 * User: Alex
 * Date: 05.09.12
 * Time: 14:56
 * To change this template use File | Settings | File Templates.
 */


define(
    [
        'router',
        'models/page',
        'views/nav'
    ],
    function (cls_Router, cls_mPage, cls_nav) {

        /**
         * Initial settings
         */

        return {

            settings:{
                defaultPageSuffix: "Александр Антипин — Школа разработки интерфейсов Яндекс",
                pageTitleDelimiter: ' | '
            },

            nav:{

                "primary":{

                    "about-me":{
                        "title":"Обо мне"
                    },

                    "dev-exp":{
                        "title":"Опыт разработки",
                        "items":{
                            "practic":{
                                "title":"Практический опыт",
                                "description": "Расскажите нам о вашем опыте разработки. Ничего не упускайте: это может быть как серьезный интерфейс, так и просто домашняя страничка.",
                                "default": true
                            },
                            "languages-n-technologies":{
                                "title":"Языки, технологии",
                                "description": "Какие языки программирования, фреймворки и технологии вы использовали? Сложились ли у вас личные предпочтения?"
                            },
                            "ide":{
                                "title":"Редакторы, IDE",
                                "description": "Какие редакторы и среды разработки вы использовали? Чем обычно пользуетесь?"
                            },
                            "os":{
                                "title":"Операционные системы",
                                "description": "С какими ОС приходилось сталкиваться? Для каких целей вы их использовали?"
                            },
                            "vcs":{
                                "title":"Системы контроля версий",
                                "description": "Приходилось ли вам пользоваться системами контроля версий? Если да, то какими? Какая из них вам нравится больше всего?"
                            },
                            "task-management":{
                                "title":"Системы постановки задач",
                                "description": "Использовали ли вы системы постановки и ведения задач?"
                            },
                            "resources":{
                                "title":"Профессиональные веб-ресурсы",
                                "description": "Какие полезные для фронтенд-разработчика ресурсы вы используете и можете посоветовать?"
                            },
                            "team-coworking":{
                                "title":"Работа в команде",
                                "description": "Работали ли вы где-нибудь? Какие у вас были должностные обязанности? Есть ли опыт работы в команде?"
                            }
                        }
                    },

                    "tech-tasks":{
                        "title":"Технические вопросы",
                        "items":{
                            "tools-n-methods":{
                                "title":"1. Инструменты и приемы отладки",
                                "description": "Перечислите известные вам инструменты и приёмы для отладки кода в разных браузерах",
                                "default": true
                            },
                            "click-story":{
                                "title":"2. Клик на ссылку",
                                "description": "Опишите своими словами, что происходит в браузерах при клике на ссылку yandex.ru (полнота ответа — на ваше усмотрение)."
                            },
                            "motor-showroom-upgrade":{
                                "title":"3. Автосалон",
                                "description": "Предположим, что мы представляем автосалон по продаже японских и немецких автомобилей. У нас есть базовые классы и примеры их использования. Допишите недостающий код."
                            },
                            "files-search":{
                                "title":"4. Поиск текстовых файлов",
                                "description": "Найдите все текстовые файлы (*.txt), в имени которых содержится «yandex», а в содержимом — «школа разработки интерфейсов»."
                            },
                            "verbose":{
                                "title":"5. Опция -verbose",
                                "description": "Дана программа, реализованная одновременно на Bash, Python и Perl. Программа принимает произвольное количество аргументов и печатает их количество. Нужно добавить опцию -v для verbose-режима, в котором дополнительно выводится значение каждого из аргументов."
                            },
                            "programming-school":{
                                "title":"6. Изучении программирования",
                                "description": "Расскажите, в каком объёме и при каких обстоятельствах вы изучали следующие темы: языки программирования (императивные/декларативные, разные системы типов), структуры (классы, структуры данных, примитивные типы), парадигмы (события, ООП, параллельность/асинхронность, кеширование), алгоритмы (парсинг, сортировка, поиск), паттерны."
                            }
                        }
                    }

                }

            },

            initialize:function () {

                // Init models
                App.mPage = new cls_mPage();

                // Init router
                App.Router = new cls_Router();
                Backbone.history.start({pushState:true});

                // Init views
                App.vPrimaryNav = new cls_nav({
                    type: 'primary',
                    id: 'nav-primary',
                    className: 'nav clearfix'
                });
                App.vSecondaryNav = new cls_nav({
                    type: 'secondary',
                    id: 'nav-secondary',
                    className: 'nav nav-list'
                });

                // Insert base views into DOM
                $('#nav-primary').html(
                    App.vPrimaryNav.render().el
                );
                $('#nav-secondary > .sidebar-nav').html(
                    App.vSecondaryNav.render().el
                );
            },

            /**
             * Helper functions
             * TODO: maybe move them to some kind of library
             */
            utils:{

                buildPath:function (parameters) {
                    var mergedParameters = [];
                    for (var key in parameters) {
                        if (parameters.hasOwnProperty(key)) {
                            mergedParameters.push(key + '=' + parameters[key]);
                        }
                    }
                    App.settings.apiPath = App.settings.apiPath || '';
                    return App.settings.apiPath + 'api.' + App.settings.apiExtension + '?' + mergedParameters.join('&');
                }

            }

        }

    });


