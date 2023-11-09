import http from 'k6/http';
import {check} from "k6";
import {scenario} from "k6/execution";
import {getEnvironmentConfig} from "./test-utils/config-reader-util.js";
import {getSpacxDetailsQuery} from "./graphql-querys/spacex/query.js";

const {baseUrl} = getEnvironmentConfig();

export let options = {
    scenarios: {
        "get-spacex-details": {
            executor: "ramping-arrival-rate",
            startRate: 1,
            timeUnit: "1s",
            preAllocatedVUs: 100,
            maxVUs: 10000,
            stages: [
                {target: 5, duration: "2m"}
            ]
        }
    }
}

export default function () {
    const headers = {
        "Content-Type": "application/json",
    };

    const response = http.post(baseUrl, JSON.stringify({query: getSpacxDetailsQuery()}), {headers: headers});

    check(response, {
        "Get spacex details status is 200": r => r.status === 200,
        "RESPONSE_HAS_SPACEX_DETAILS_DATA": r => r.json("data.company") !== null
    });
}
