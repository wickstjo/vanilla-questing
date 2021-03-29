import { shorten } from '../funcs/misc';

// PARSE QUESTLOG
function filter({ current, data }) {

    // QUEST CONTAINER
    const container = new Map();

    // LOOP THROUGH DATA TO CURRENT BLOCK
    for (let x = 0; x < current; x++) {

        // SHORTHAND
        const waypoints = data.route[x].waypoints;

        // LOOP THROUGH EACH WAYPOINT
        waypoints.forEach(waypoint => {

            // LOOP THROUGH ENDS
            if (waypoint.ends !== undefined) {
                waypoint.ends.forEach(quest => {

                    // QUEST NAME
                    const name = quest_name(quest);

                    // REMOVE IT
                    container.delete(name);
                })
            }

            // LOOP THROUGH STARTS
            if (waypoint.starts !== undefined) {
                waypoint.starts.forEach(quest => {

                    // QUEST NAME
                    const name = quest_name(quest);

                    // ADD IT
                    container.set(name, quest)
                })
            }
        })
    }

    // CONVERT TO ARRAY & RETURN
    return Array.from(container.values());
}

// FIND QUEST NAME
function quest_name(quest) {
    switch (quest instanceof Array) {
        case true: { return quest[0] }
        default: { return quest; }
    }
}

// EXTRACT QUEST NAME & ID
function extract(data, state) {

    // NAME PLACEHOLDER & ID
    let name = quest_name(data);
    const id = fetch_id(data, state.data.quests);

    // TRANSLATE IF NECESSARY
    if (state.settings.language !== 'en') {
        name = state.lang[state.settings.language][id];
    }

    return {
        name: shorten(name),
        id: id
    }
}

// FETCH QUEST ID FOR SIDEPANEL LINKS
function fetch_id(quest, quests) {

    // FETCH NAME & TARGET DATA -- FORCE LOWERCASE
    const name = quest_name(quest).toLowerCase();
    const target = quests[name];

    // PLACEHOLDER
    let split;

    // SPLIT IF THERE ARE MORE THAN ONE ELEMENT
    if (typeof quest === 'object' && quest.length > 1) {
        split = quest[1].split('-');

    // OTHERWISE, RETURN FIRST INDEX VALUE
    } else { split = quest[0] }

    // FETCH ID
    const id = parseInt(split[0].replace(/[^0-9]/g, ''));

    // IF THE QUEST DOESNT EXIST
    if (target === undefined) {
        console.log(name + ' ID was not found');
        return 2;
    }

    // DEFAULT TO STANDALONE QUEST
    let response = target;

    // IF IT HAS A TYPE
    if (typeof target === 'object') {
        switch (isNaN(id)) {

            // THE ID WAS VALID
            case false:
                response = target[id - 1];
            break;

            // OTHERWISE, DEFAULT TO FIRST INDEX
            default:
                response = target[0]
                console.log(name + ' found an indexless array')
            break;
        }
    }

    return response;
}

export {
    filter,
    extract
}