document.addEventListener('DOMContentLoaded', function () {
    Forum.init();
});

/**
 * Virkni fyrir spjallborð. Geymum færslur í fylki þar sem hver færsla er
 * {
 *    name: 'Nafn',
 *    text: 'Texti',
 *    replies: [
 *      {
 *        name: 'Nafn 2',
 *        text: 'Texti 2'
 *      },
 *      ...
 *    ]
 *  }
 */
var Forum = (function () {

    /**
     * Lykill fyrir localstorage, geymum *allar* færslur undir þessum lykli í
     * fylki sem er breytt í JSON streng með JSON.stringify() og til baka í fylki
     * með JSON.parse()
     */
    var LOCALSTORAGE = 'forum';

    /**
     * Inngangur í forrit, viljum:
     *  1. Athuga hvort við eigum vistuð gögn í localStorage, ef svo er,
     *     hlaða þeim inn
     *  2. Ef engin gögn, búa til fyrstu færslu og svar, og vista í
     *     localStorage
     *  3. Binda event handlera við nýja færslu form
     *  4. Binda "takmarkara" við alla reiti á nýja færslu form
     *
     * Þegar ný færsla eða nýtt svar er búið til, er góð leið að finna _allar_
     * færslur og svör úr DOM og vista það, getum þá samnýtt fall úr 1. í það og
     * losnum við tvöfalt bókhald, eitt í DOM og annað í kóða.
     */
    function init() {

        var entries = load(LOCALSTORAGE);

        if (entries) {
            for (var i = 0; i < entries.length; i++) {
                // Búið er að færa i færslur úr entries fylkinu inn á DOM
                var entry = entries[i];
                addEntry(entry.name, entry.rant);

                var entryNode = document.querySelector('.panel-group').lastElementChild;
                var repliesNode = entryNode.querySelector('.replies');

                for (var j = 0; j < entry.replies.length; j++) {
                    // Búið er að færa j svör inn á DOM nóðuna sem geymir færslu númer i+1
                    var reply = entry.replies[j];
                    addReply(repliesNode, reply.name, reply.replytext);
                }
            }
        } else {
           /*
            * Mér fannst snyrtilegra að búa til fyrstu færsluna í þessu tilfelli frekar
            * en að taka hana út þegar gögn eru í localStorage. Geri ráð fyrir að það sé
            * í lagi þar sem ekki kom fram í verkefnislýsingu hvernig upphafsgögnin ættu
            * að vera sýnd/geymd þegar vefurinn er opnaður í fyrsta skipti.
            */
            addEntry(
                'Sjovneld Mahogna from Norland',
                'I hate rant boards..');
            addReply(document.querySelector('.replies'), 'Beggi Bongó', 'I hate people who rant about rant boards on rant boards.');

            save(LOCALSTORAGE, parseEntries());
        };

        // Bind event listeners við allar nóður sem þurfa og sem eru alltaf inni á DOM.
        // Þær nóður sem ekki eru alltaf inni, heldur koma inn á DOM fyrir tilstilli notanda (reply nóðurnar)
        // fá sína event listeners í föllunum createReplyForm og createFormGroup til einföldunar.
        document.querySelector('.toggle-form').addEventListener('click', toggleFormHandler);
        document.querySelector('.rant-form .btn').addEventListener('click', newEntryHandler);
        document.querySelector('#new-topic').addEventListener('keypress', constrainText.bind(null, 1000));
        document.querySelector('#new-name').addEventListener('keypress', constrainText.bind(null, 300));
    }


    /**
     * Togglar sýnileika "New rant" formsins, ásamt því að stilla átt örvarinnar á "new rant" takkanum
     * sem sýnir hver hegðun formsins verður þegar ýtt er á takkann.
     */


    /**
     * Finnur núverandi færslur á síðu og skilar í gagnastrúktúr
     *
     * @return {array} Fylki af færslum á núverandi síðu í gagnastrúktúr
     */
    function parseEntries() {
        var entries = document.querySelectorAll('article');
        var entriesArr = [];

        for (var i = 0; i < entries.length; i++) {
            // entriesArr[0..i] inniheldur i hluti sem hver um sig geymir upplýsingar
            // um nafn, efni og svör sem tilheyra tiltekinni færslu frá DOM
            var node = entries[i];
            var name = node.querySelector('h3').firstChild.textContent;
            var rant = node.querySelector('p').firstChild.textContent;
            var replies = parseReplies(node);

            entriesArr.push({
                name: name,
                rant: rant,
                replies: replies
            });
        };

        return entriesArr;
    }

    /**
     * Finnur svör við færslum úr DOMi
     *
     * @param {node} element DOM element fyrir færslum
     *
     * @return {array} Fylki af svörum, tómt ef engin svör
     */
    function parseReplies(element) {
        var replynodes = element.querySelectorAll('.reply');
        var repliesArr = [];

        for (var i = 0; i < replynodes.length; i++) {
            // repliesArr[0..i] inniheldur i hluti sem hver um sig geymir upplýsingar
            // um nafn og efni tiltekins svars sem tilheyrir færslunni (DOM nóðunni) element.
            var name = replynodes[i].querySelector('h4').firstChild.textContent;
            var replytext = replynodes[i].querySelector('p').firstChild.textContent;

            repliesArr.push({
                name: name,
                replytext: replytext
            });
        };

        return repliesArr;
    }

    /**
     * Event handler fyrir nýja færslu. Bætir nýrri færslu við DOM.
     * Setur nafn í alla aðra input reiti.
     * Eyðir textanum úr textarea reitnum.
     * Vistar allar færslur inni á DOM í localStorage.
     */
    function newEntryHandler() {
        var name = document.getElementById('new-name').value;
        var topic = document.getElementById('new-topic');
        addEntry(name, topic.value);

        setName(name);
        topic.value = '';

        save(LOCALSTORAGE, parseEntries());
    }

    /**
     * Event handler fyrir nýtt svar. Bætir nýrri færslu við DOM útfrá e.target
     * Setur nafn í alla aðra input reiti
     *
     * @param {object} e Event frá formi
     */
    function newReplyHandler(e) {
        var formNode = e.target.parentNode;
        var repliesNode = formNode.parentNode.firstElementChild;

        var name = formNode.querySelector('[name="name"]');
        var reply = formNode.querySelector('[name="reply"]');

        addReply(repliesNode, name.value, reply.value);

        setName(name.value);
        reply.value = '';

        save(LOCALSTORAGE, parseEntries());

    }

    /**
     * Event handler fyrir skrif í box, leyfir ekki að skrifa ef stafir eru fleiri
     * en maxChars og birtir þá skilaboð um það.
     * Hint: Getum notað constrainText.bind(null, 100) í addEventListener
     *
     * @param {number} maxChars Hámark stafa sem má vera
     * @param {object} e Event frá formi
     */
    function constrainText(maxChars, e) {
        if (e.target.value.length > maxChars) {
            e.preventDefault();
            alert('The text field has reached its maximum allowed length of ' + maxChars + ' characters.');
        }
    }

    /**
     * Bætir nýju svari við DOM undir repliesNode
     *
     * @param {string} name Nafn fyrir svar
     * @param {string} text Texti á svar
     */
    function addReply(repliesNode, name, text) {
        var replyNode = document.createElement('div');
        replyNode.classList.add('well', 'reply');

        var subtitle = document.createElement('small');
        subtitle.appendChild(document.createTextNode(' replied'));

        var nameNode = document.createElement('h4');
        nameNode.classList.add('name', 'text-info');
        nameNode.appendChild(document.createTextNode(name));
        nameNode.appendChild(subtitle);

        var textNode = document.createElement('p');
        textNode.classList.add('text');
        textNode.appendChild(document.createTextNode(text));

        replyNode.appendChild(nameNode);
        replyNode.appendChild(textNode);

        repliesNode.appendChild(replyNode);
    }

    /*
     * setur nafn sem síðast var skráð á færslu eða svar í alla input
     * reiti þar sem nafn skal skráð af notanda.
     *
     * @param {string} name Nafn sem notandi hefur skráð fyrir færslu/svari
     */
    function setName(name) {
        var nameInputs = document.querySelectorAll('[name="name"]');

        for (var i = 0; i < nameInputs.length; i++) {
            nameInputs[i].value = name;
        }
    }

    /**
     * Bætir nýrri færslu við DOM
     *
     * @param {string} name Nafn fyrir færslu
     * @param {string} text Texti á færslu
     */
    function addEntry(name, text) {
        var content = document.createElement('p');
        content.appendChild(document.createTextNode(text));

        var replies = document.createElement('div');
        replies.classList.add('replies');

        var repliesContainer = document.createElement('div');
        repliesContainer.classList.add('col-xs-offset-1');
        repliesContainer.appendChild(replies);
        repliesContainer.appendChild(createReplyForm());

        var body = document.createElement('div');
        body.classList.add('panel-body');
        body.appendChild(content);
        body.appendChild(repliesContainer);

        var subtitle = document.createElement('small');
        subtitle.appendChild(document.createTextNode(' posted'));

        var nameTitle = document.createElement('h3');
        nameTitle.appendChild(document.createTextNode(name));
        nameTitle.appendChild(subtitle);

        var header = document.createElement('header');
        header.classList.add('panel-heading');
        header.appendChild(nameTitle);

        var entry = document.createElement('article');
        entry.classList.add('panel', 'panel-info', 'entry');
        entry.appendChild(header);
        entry.appendChild(body);


        var entryContainer = document.querySelector('.panel-group');
        entryContainer.appendChild(entry);
    }

    /**
     * Býr til DOM tré fyrir reply form. Nýtir createFormGroup fall til að búa til
     * input, bætir við takka með icon.
     * Hint: Til að laga spacing mál er nóg að bæta við ' ' á eftir form-group
     *
     * @return {node} DOM node fyrir reply form
     */
    function createReplyForm() {
        var author = createFormGroup('Name', 'name');
        var reply = createFormGroup('Reply', 'reply');

        var icon = document.createElement('span');
        icon.classList.add('glyphicon', 'glyphicon-pencil');

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('btn', 'btn-primary', 'btn-sm', 'reply-btn');
        btn.appendChild(icon);
        btn.appendChild(document.createTextNode(' Reply'));
        btn.addEventListener('click', newReplyHandler);

        var form = document.createElement('form');
        form.classList.add('form-inline');
        form.appendChild(author);
        form.appendChild(document.createTextNode(' ')); // spacing-bil sbr. hint
        form.appendChild(reply);
        form.appendChild(document.createTextNode(' '));
        form.appendChild(btn);

        return form;
    }

    /**
     * Býr til DOM tré fyrir form group.
     *
     * @param {string} label Label á form
     * @param {string} name Nafn á input
     *
     * @return {node} DOM node fyrir form group
     */
    function createFormGroup(label, name) {
        var lab = document.createElement('label');
        lab.setAttribute('for', name);
        lab.appendChild(document.createTextNode(label));
        lab.classList.add('sr-only');

        var input = document.createElement('input');
        input.type = 'text';
        input.name = name;
        input.placeholder = label;
        input.classList.add('form-control');
        input.addEventListener('keypress', constrainText.bind(null, 300));

        var formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
        formGroup.appendChild(lab);
        formGroup.appendChild(input);

        return formGroup;
    }

    /**
     * Sækir færslur úr localStorage og skilar í fylki
     *
     * @param {string} key Lykill sem við notum í localStorage
     * @param {array} Fylki af færslum til að vista
     */
    function save(key, items) {
        var jsonItems = JSON.stringify(items);

        localStorage.setItem(key, jsonItems);
    }

    /**
     * Sækir færslur úr localStorage og skilar í fylki
     *
     * @param {string} key Lykill sem við notum í localStorage
     *
     * @return {array} Fylki af færslum í localStorage ef einhverjar
     * @return {null} Ef engin færsla til staðar í localStorage
     */
    function load(key) {
        var jsonItems = localStorage.getItem(key);

        if (jsonItems) {
            return JSON.parse(jsonItems);
        }
        return null;
    }

    return {
        init: init
    };
})();
