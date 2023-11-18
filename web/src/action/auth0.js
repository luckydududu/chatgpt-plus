import { createAuth0 } from '@auth0/auth0-vue';
import {httpGet} from "@/utils/http";
import Storage from "good-storage";
import {randString} from "@/utils/libs";
import {setSessionId} from "@/store/session";

export const auth0 = createAuth0({
    domain: process.env.VUE_APP_AUTH0_DOMAIN,
    clientId: process.env.VUE_APP_AUTH0_CLIENTID,
    authorizationParams: {
        redirect_uri: window.location.origin
    },
});

export async function getAccessToken() {
    let accessToken = '';
    try {
        accessToken = await auth0?.getAccessTokenSilently();
        // console.info(`accessToken:`, accessToken);
    } catch (err) {
        // console.error(`Error fetching access token:`, err);
    }
    return accessToken;
}

export async function hasAccessToken() {
    let accessToken = '';
    try {
        accessToken = await auth0?.getAccessTokenSilently();
        // console.info(`accessToken:`, accessToken);
    } catch (err) {
        console.error(`Error fetching access token:`, err);
    }
    return accessToken !== undefined && accessToken.length > 0;
}

const global_permissions = ['view:chat'];
export async function checkPermissions(permission) {
    console.info(`checkPermissions, permission=${permission}`);
    if(permission === undefined || permission.length <= 0) {
        try {
            const resp = await httpGet('/api/permission');
            // global_permissions.push(['view:chat']);
        } catch (err) {
            console.error(`checkPermissions:`, err);
            global_permissions.push(['view:chat']);
        }
    }
    return global_permissions.includes(permission);
}