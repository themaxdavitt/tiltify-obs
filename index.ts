import { promises as fsp } from 'fs';
import got from 'got';

import { template } from './template';

require('dotenv').config();

let donoString = '';

(async () => {
    const { DONO_FILENAME, DONO_UPDATE_INTERVAL_IN_SECONDS, TILTIFY_ACCESS_TOKEN, TILTIFY_CAMPAIGN_ID } = process.env;

    async function update() {
        const response = await got(`https://tiltify.com/api/v3/campaigns/${TILTIFY_CAMPAIGN_ID}/donations`, {
            headers: {
                authorization: `bearer ${TILTIFY_ACCESS_TOKEN}`
            }
        }).json();
    
        const newDonoString = template(response as any);
    
        if (donoString !== newDonoString) {
            donoString = newDonoString;
            await fsp.writeFile(DONO_FILENAME!, newDonoString);
        }
    
    }

    await update();
    setInterval(update, 1000 * Number(DONO_UPDATE_INTERVAL_IN_SECONDS));
})().catch(console.error);
