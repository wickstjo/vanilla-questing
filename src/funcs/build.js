// ALLIANCE ROUTES
import human from '../routes/alliance/human.json';
import gnorf from '../routes/alliance/gnorf.json';
import nelf from '../routes/alliance/nelf.json';
import alliance_shared from '../routes/alliance/shared.json';
import alliance_quests from '../routes/alliance/quests.json';

// HORDE ROUTES
import trorc from '../routes/horde/trorc.json';
import tauren from '../routes/horde/tauren.json';
import undead from '../routes/horde/undead.json';
import horde_shared from '../routes/horde/shared.json';
import horde_quests from '../routes/horde/quests.json';

// RACE SPECIFIC STARTERS
const races = {
    alliance: new Map([
        ['human', human],
        ['dwarf', gnorf],
        ['gnome', gnorf],
        ['nelf', nelf]
    ]),
    horde: new Map([
        ['orc', trorc],
        ['troll', trorc],
        ['tauren', tauren],
        ['undead', undead],
    ])
}

// CONSTRUCT REQUESTED ROUTE
function route(race) {

    // PLACEHOLDER
    let data = {}

    // CONSTRUCT ROUTE
    switch (races.alliance.has(race)) {

        // ALLIANCE
        case true:
            data = {
                quests: alliance_quests,
                route: [
                    ...races.alliance.get(race).path,
                    ...alliance_shared.path
                ]
            }
        break;

        // HORDE
        default:
            data = {
                quests: horde_quests,
                route: [
                    ...races.horde.get(race).path,
                    ...horde_shared.path
                ]
            }
        break;
    }

    // CONSTRUCT & RETURN DATA OBJECT
    return {
        quests: data.quests,
        route: data.route,
        hearthstones: hearthstones(data.route),
        race: race
    }
}

// RANDOM ROUTE
function random() {

    // PICK A RACE RANDOMLY
    const all = [ ...races.alliance.keys(), ...races.horde.keys() ];
    const race = Math.floor((Math.random() * all.length) + 0);

    // CONSTRUCT BUILD
    const build = route(all[race]);

    // RETURN FINALIZED BUILD
    return {
        data: build,
        current: Math.floor((Math.random() * build.route.length - 1) + 1)
    }
}

// SPECIFIC ROUTE
function specific({ race, block }) {

    // DEFAULT TO RANDOM ROUTE
    let response = {};

    // MAKE SURE THE RACE EXISTS
    if (exists(race)) {

        // FETCH BUILD
        const build = route(race);

        // IF THE REQUESTED BLOCK IS WITHIN LIMITS
        if (block <= build.route.length) {

            // UPDATE RESPONSE WITH REQUESTED ROUTE
            response = {
                data: build,
                current: parseInt(block)
            }

        // OTHERWISE
        } else {

            // SET CURRENT TO ZERO
            response = {
                data: build,
                current: 0
            }

            // SEND ERROR
            console.log('OUT OF BOUNDS, BACK TO ZERO')
        }

    // OTHERWISE, LOAD RANDOM ROUTE
    } else { response = random(); }

    return response;
}

// IMPORTED DATASET
function custom({ build, faction }) {
    return {
        data: {
            quests: faction === 'alliance' ? alliance_quests : horde_quests,
            route: build.path,
            hearthstones: hearthstones(build.path)
        },
        current: 0
    }
}

// FIND HEARTHSTONE BLOCK INDEXES
function hearthstones(route) {
    const container = [];

    // ASSEMBLE LIST OF EACH 'SET HS' OCCURRENCE
    route.forEach((block, index) => {
        block.waypoints.forEach(waypoint => {
            if (waypoint.special !== undefined) {
                waypoint.special.forEach(message => {
                    if (typeof message === 'string' && message.toLowerCase() === 'set hearthstone') {
                        container.push({
                            block: index,
                            zone: block.zone
                        })
                    }
                })
            }
        })
    })

    return container;
}

// CHECK IF RACE EXISTS --- FORCE LOWERCASE
function exists(race) {

    // MAKE UNITED MAP
    const keys = new Map([
        ...races.alliance,
        ...races.horde
    ])

    // PERFORM & RETURN CHECK
    return keys.has(race.toLowerCase())
}

export {
    random,
    specific,
    custom,
    exists
}