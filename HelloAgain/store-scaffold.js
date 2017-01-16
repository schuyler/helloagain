"use strict";

// Scaffolding an initial store state to allow manual testing. Will remove this
// module and all references once addressbook importing is implemented.

// For reasons I don't understand,trying to
//   import { CONTACT_FIXTURE } from "./__tests__/fixtures/contacts" 
// yields an error in node, so I'm just cut-n-pasting in here, since this code
// will go away soon.
const CONTACT_FIXTURE = [
    { recordID: 1, familyName: "Copernicus", givenName: "Nicolaus" },
    { recordID: 2, familyName: "Brahe", givenName: "Tycho" },
    { recordID: 3, familyName: "Tombaugh", givenName: "Clyde" },
    { recordID: 4, familyName: "Herschel", givenName: "William" },
    { recordID: 5, familyName: "Herschel", givenName: "John" },
    { recordID: 6, familyName: "Messier", givenName: "Charles" },
    { recordID: 7, familyName: "Leavitt", givenName: "Henrietta", middleName: "Swan" },
    { recordID: 8, familyName: "Lalande", givenName: "Jérôme" },
    { recordID: 9, familyName: "Herzsprung", givenName: "Ejnar" },
    { recordID: 10, familyName: "Hubble", givenName: "Edwin" },
    { recordID: 11, familyName: "Rubin", givenName: "Vera" },
    { recordID: 12, familyName: "Kepler", givenName: "Johannes" },
    { recordID: 13, familyName: "Humason", givenName: "Milton", middleName: "L." },
    { recordID: 14, familyName: "Oort", givenName: "Jan" },
    { recordID: 15, familyName: "Klumpke", givenName: "Dorothea" },
    { recordID: 16, familyName: "Struve", givenName: "Gustav Wilhelm Ludvig" },
    { recordID: 17, familyName: "Wolf", givenName: "Max" },
]

const initialFriends = {}
CONTACT_FIXTURE.forEach((item) => {initialFriends[item.recordID] = item})

const initialState = {friends: initialFriends}

export default initialState
