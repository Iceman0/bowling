import bridge from '@vkontakte/vk-bridge';
//import * from jQuery;
import { GoogleSpreadsheet } from "google-spreadsheet";
import auth from './auth.json';

export const btnSendClick = (name, surname, team, count) => {

// Config variables
    const SPREADSHEET_ID = auth.SPREADSHEET_ID; //'1ueVeSFIImgOy0z4JVkNCU3Z8mTdTsswfSK8ar9Jk6pQ';
    const SHEET_ID = auth.SHEET_ID; //'0';
    const CLIENT_EMAIL = auth.client_email; //'bowling@bowlingsheets-1600545716945.iam.gserviceaccount.com';
    const PRIVATE_KEY = auth.private_key; //"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCgsuMIRdYFU0I+\nJhLY6Spcrzp+8cAbIHqQSslf0Km0igISQohSIAZn1RyGGc8GoKSoEudb9kfAL2BD\nYgggqJnwNJLQzsQLeL/eePpRrakYlKuhscJQV4ouo/oOM4tRdzQl+113hdYrmKbV\nmXGoqFLAZR5cw7Ak3L4rdairFsgmnAc1OOV7Un2ImaGCeKU/PLVA9/V38g5wTPCH\nmArmOXUHLcZzj2aZInpgy1i2nct9IhNCP5fiqan5a0FMtn5aVAvw/1zd3L+KAhN3\nhZ+FO4oVoxqKwHqkJ/FZia8wwHDxu1X5B9r0nQLN/QjjKQrEwJqoCO7qtShjF9Dw\n6cBHQR0JAgMBAAECggEAEChcboEDF277Kp+OZpPvJ/mQcqIhFDksSaTTYZhr79Su\nh6J77XH94uPJJeyjZcGyPJoF/DejmD3LOos5UPtS2xWWK3uWt6aQ+DAGzz6cUXXl\nWfEzHfvnT3A6XMIvAGZxbl47VCC3W5PSNojipjgidejU6DPe2p39WwZOCsHUJxmB\nLSCow6wmycEwXq2qMlg522TZWklMgsk9xPVJ+Y7B2VAHGiQB+EMJ25aYGzWigZ3O\nQVmShzsxJr5dPioFuljvpJpgOhAYP5qVhjZCnha2580z6qWdeaSeOMtWHlzNzwwe\nP4vDa4MGudQ0xG7bW3bmx2n4sYoMYRK5WX7HIH0L9wKBgQDcMdkdoUgOa6MZCtv6\nP66btgVhEnQCdzpWPN/wUvquF0NvG7P7yBDBr72xNeevq38y8A021lRwY+s1NdTS\n7Eo0yM0hSx/97+x+sQOabFVWX7gyrzvpWLRI8OJzkEiTQbGDMe8qLxFk432SBio2\nfKoeCOsstbz1MOwEuyFQzru6AwKBgQC61F9WjZt2IRADfWstpj4er4k1sfFSWIk1\naTHIm7mQrk2WBUcfq8D3vV7crRtwj0nMhWhJqxVmQ3zmox5bZ5BHuPMM4NUGdIrm\n+EhfpG80pHNRYQsAjNoDOS06lu8C5FoxHih79tkD/8pI+fP6mCWg9AMzYCk2R6Gr\nrzPjkA6lAwKBgCpcbKiGnpYnnvjyXd+G4NCT8/T419ihl1d/3pUdYZycXRzC9504\noACjDptJA4mINLBX/jLOiPAWSOmzsX3id2QwPUZqbX0s6xJ0e3z52nEDeSxHCf+a\nURS3Qtl4qH2r5bqXoKs84tvF6CJvjS9uTEv660Nusyt4fe9rEL27B+KBAoGBAIS7\n11Ql3TpK+RaRp3DSODYS3jewyVOIpUq2BvGQeYDp5SNdco90te8MsnWz4tfQZU0R\nxur3yodSEU3GvA2SgXYDV2Jh5dblO74mzTxuFbff0jIR8QAeEdHScGi8zOhQFifp\nVjfkQ4BM3YmFU6pJKAq28gMxIXZ348uW+RWGxnDDAoGBAISnJBFMZZirS4JXvf/z\nIqviIPUllV+7igFd9ZHLYCyIrfeJW4B24Zf05T9FFX9ZOwUXl4vwyIG2ZyUXbsUt\nxmj9KojIxLhkmLtR543pWeqlmhybuDfbEZNNdahnR/tuzAIMiQ5gv9REiEFehIRC\niXZ1RyLCWlBH3E01jdNbkQ+L\n-----END PRIVATE KEY-----\n";

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
