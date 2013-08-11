angular.module('moedict', [])
    .directive('moedict', function ($http) {
        return function (scope, element, attrs) {
            var moedictConfig;
            moedictConfig = {
              initialized_a: false,
              regex_a: null,
              initialized_t: false,
              regex_t: null,
              initialized_h: false,
              regex_h: null
            };
            _moedictDataCallback = function (data) {
                var lang, lenToRegex, keys, words;
                lang = 'a';
                if (data.lenToRegex != null) {
                    lang = 'a';
                    lenToRegex = data.lenToRegex;
                } else if (data.lenToRegex_t != null) {
                    lang = 't';
                    lenToRegex = data.lenToRegex_t;
                } else if (data.lenToRegex_h != null) {
                    lang = 'h';
                    lenToRegex = data.lenToRegex_h;
                }
                keys = Object.keys(lenToRegex).sort(function(a, b){
                    return b - a;
                });
                words = [];
                keys.forEach(function(k){
                    return words.push(lenToRegex[k]);
                });
                moedictConfig["regex_" + lang] = new RegExp(words.join('|'), 'g');
                var html = element.html();
                var a= html.replace(moedictConfig["regex_t"], function (w) {
                    var buf;
                    buf = w;
                    buf += " ";
                    return buf;
                });
                element.replaceWith(a);
                return moedictConfig["initialized_" + lang] = true;
            }
            $http.jsonp('https://www.moedict.tw/lenToRegex.t.json.js');
        };
    });
