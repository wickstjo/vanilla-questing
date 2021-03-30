import { useContext, useEffect } from 'react';
import { Context } from "./context";
import { check as check_settings } from '../funcs/settings';

// LOCALIZED QUESTS
import chinese from '../langs/cn.json';
import french from '../langs/fra.json';
import german from '../langs/ger.json';
import korean from '../langs/kor.json';
import russian from '../langs/rus.json';
import spanish from '../langs/spa.json';

// LOCALIZED TERMS
import terms from '../langs/terms.json';

export default () => {

    // GLOBAL STATE
    const { dispatch } = useContext(Context);

    // ON INITIAL PAGE LOAD
    useEffect(() => {

        // INITIALIZE SETTINGS FROM LOCALSTORAGE
        const settings = check_settings();

        // SET IN STATE
        dispatch({
            type: 'init',
            payload: {
                settings: settings,
                lang: {
                    cn: chinese,
                    fr: french,
                    ge: german,
                    kr: korean,
                    ru: russian,
                    sp: spanish,
                    terms: terms
                }
            }
        })
    }, [])

    return null;
}