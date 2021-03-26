import { useContext, useEffect } from 'react';
import { Context } from "./context";
import { random, specific } from '../funcs/build';
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

        // BUILD PLACEHOLDER
        let build = random();

        // SET GLOBAL STATE & STOP LOADING
        dispatch({
            type: 'init',
            payload: {
                profiles: profiles,
                settings: settings,
                data: build.data,
                current: build.current,
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

    // LOAD REQUESTED RACE/BLOCK BUILD
    useEffect(() => {
        if (window.request !== undefined) {
            dispatch({
                type: 'load-request',
                payload: specific(window.request)
            })
        }
    }, [window.request])

    return null;
}