import { useContext, useEffect } from 'react';
import { Context } from "./context";
import { check as check_storage } from '../funcs/storage';
import { check as check_settings } from '../funcs/settings';

// LOCALIZED NAMES
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

        // CHECK LOCALSTORAGE HEALTH
        const profiles = check_storage();
        const settings = check_settings();

        // SET GLOBAL STATE & STOP LOADING
        dispatch({
            type: 'init',
            payload: {
                profiles: profiles,
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