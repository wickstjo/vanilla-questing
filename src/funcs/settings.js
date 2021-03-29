// STORAGE KEY
const key = 'settings';

// CHECK STORAGE HEALTH
function check() {

    // IF SETTINGS KEY DOENST EXIST
    if (localStorage.getItem(key) === null) {

        // SET DEFAULT SETTINGS
        set({
            database: 'classicdb',
            language: 'en',
            keybinds: 'enable',
            binds: {
                close: 'Escape',
                references: 'KeyQ',
                backward: 'KeyA',
                forward: 'KeyD'
            }
        })
    }

    // FETCH THE CONTENT
    const settings = fetch();

    // IF THE DATABASE PROP DOESNT EXIST
    if (settings.database === undefined) {

        // SET IT & UPDATE STORAGE
        settings.database = 'classicdb';
        set(settings);
    }

    // IF THE DATABASE PROP DOESNT EXIST
    if (settings.language === undefined) {

        // SET IT & UPDATE STORAGE
        settings.language = 'en';
        set(settings);
    }

    // PARSE & RETURN STORAGE ITEM
    return settings;
}

// PARSE & RETURN STORAGE VALUE
function fetch() {
    return JSON.parse(localStorage.getItem(key));
}

// STRINGIFY & SET STORAGE VALUE
function set(settings) {
    localStorage.setItem(key, JSON.stringify(settings));
}

// CHECK IF KEY EXISTS
function exists(bind) {

    // FETCH BIND VALUES & CONVERT THEM TO A SET
    const content = Object.values(fetch().binds);
    const values = new Set(content);

    // RETURN CHECK RESULT
    return values.has(bind);
}

// CHANGE KEYBIND
function update_bind(settings, payload) {

    // PAYLOAD PROPS
    const { name, bind } = payload;

    // UPDATE OBJECT & LOCALSTORAGE
    settings.binds[name] = bind;
    set(settings);

    // RETURN UPDATED OBJECT
    return settings;
}

// CHANGE OTHER PROP
function update_prop(settings, payload) {

    // PAYLOAD PROPS
    const { prop, value } = payload;

    // UPDATE OBJECT & LOCALSTORAGE
    settings[prop] = value;
    set(settings);

    // RETURN UPDATED OBJECT
    return settings;
}

// FETCH DB PREFIX & URK
function resource(state) {

    // PLACEHOLDERS
    let prefix = '';
    let url = '';

    // SELECT PREFIX
    switch(state.settings.language) {

        // ENGLISH
        case 'en':
            prefix = ''
        break;

        // GERMAN
        case 'ge':
            prefix = 'de.'
        break;

        // KOREAN
        case 'kr':
            prefix = 'ko.'
        break;

        // SPANISH
        case 'sp':
            prefix = 'es.'
        break;

        default:
            prefix = state.settings.language + '.'
        break;
    }

    // SELECT URL
    switch(state.settings.database) {

        // CLASSICDB
        case 'classicdb':
            url = 'https://classicdb.ch/?quest='
        break;

        // WOWHEAD
        default:
            url = 'https://' + prefix + 'classic.wowhead.com/quest='
        break;
    }

    return {
        prefix: prefix,
        url: url
    }
}

export {
    check,
    exists,
    update_bind,
    update_prop,
    resource
}