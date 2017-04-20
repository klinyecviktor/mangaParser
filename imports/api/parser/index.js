import needle from "needle"
import cheerio from "cheerio";

const today = () => {
    const date = new Date();

    date.setHours(3);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
};

const yesterday = () => {
    const date = today();

    date.setDate(date.getDate() - 1);

    return date;
};

const requestOptions = {
    timeout: 5000
};

export const parser = (url) => {
    const type = /mangafox/.test(url) ? 1 :
        (/readmanga/.test(url) || /mintmanga/.test(url)) ? 2 : 0;

    const promise = new Promise((resolve, reject) => {
        if (type === 0) reject('Wrong url');

        needle.get(url, requestOptions, (error, response, body) => {
            error && reject(error);

            const $ = cheerio.load(body);

            if (type === 1) {
                const search = $('#chapters li').eq(0).find('.date').text();
                const parsed = Date.parse(search + " GMT");

                if (search === 'Yesterday') resolve(yesterday());
                else if (search === 'Today') resolve(today());
                else resolve(new Date(parsed));
            }

            if (type === 2) {
                const date = today();
                const dateArr = $('#mangaBox .chapters-link tr td.hidden-xxs').eq(0).text().trim().split('/').map((item) => parseInt(item));

                date.setFullYear(parseInt('20' + dateArr[2]));
                date.setMonth(dateArr[1] - 1);
                date.setDate(dateArr[0]);

                resolve(date);
            }
        })
    });

    return promise;
};