import bridge from '@vkontakte/vk-bridge';
//import * from jQuery;
import { GoogleSpreadsheet } from "google-spreadsheet";
import auth from './auth.json';

export const btnSendClick = (name, surname, team, count) => {

// Config variables
    const SPREADSHEET_ID = auth.SPREADSHEET_ID;
    const SHEET_ID = auth.SHEET_ID;
    const CLIENT_EMAIL = auth.client_email;
    const PRIVATE_KEY = auth.private_key;

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });
            // loads document properties and worksheets
            await doc.loadInfo();

            const sheet = doc.sheetsById[SHEET_ID];
            const result = await sheet.addRow(row);
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    const newRow = { Name: name, Surname: surname, Team: team, Points: count };

    appendSpreadsheet(newRow);
    //alert(JSON.stringify({name: name, surname: surname, team: team, count: count}));
};
