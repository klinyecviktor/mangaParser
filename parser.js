const request = require("request"),
    cheerio = require("cheerio");

var Agent = require('socks5-http-client/lib/Agent');

let agentOptions = [
    {
        host: '112.90.51.50',
        port: 1080
    },
    {
        host: '81.21.114.52',
        port: 9050
    },
    {
        host: '182.50.152.163',
        port: 60088
    }
]

function parser(url, callback) {
    if (/mangafox/.test(url)) {
        request({
            url,
            // agentClass: Agent,
            // agentOptions: {
            //     socksHost: '81.21.114.52', // Defaults to 'localhost'.
            //     socksPort: 9050 // Defaults to 1080.
            // }
        }, function (error, response, body) {
            let date;

            if (!error) {
                let $ = cheerio.load(body),
                    search = $('#chapters li').eq(0).find('.date').text(),
                    dateText = search + " GMT",
                    parsed = Date.parse(dateText);

                if (isNaN(parsed)) {
                    date = new Date();

                    date.setHours(3);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);

                    if (search === 'Yesterday') date.setDate(date.getDate() - 1);
                } else date = new Date(parsed);

            } else {
                console.log("Произошла ошибка: " + error);
            }

            callback(error, date);
        });
    } else if (/readmanga/.test(url) || /mintmanga/.test(url)) {
        request(url, function (error, response, body) {
            let date;

            if (!error) {
                let $ = cheerio.load(body),
                    dateArr = $('#mangaBox .chapters-link tr td.hidden-xxs').eq(0).text().trim().split('/').map((item) => parseInt(item));

                date = new Date();
                date.setFullYear('20' + dateArr[2]);
                date.setMonth(dateArr[1] - 1);
                date.setDate(dateArr[0]);
                date.setHours(3);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            } else {
                console.log("Произошла ошибка: " + error);
            }

            callback(error, date);
        });
    } else {
        console.error("Wrong url", url);
        callback()
    }
}

exports.parse = parser;