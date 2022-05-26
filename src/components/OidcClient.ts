/* eslint-disable @typescript-eslint/no-unused-expressions */
import { UserManager } from 'oidc-client-ts'

export default class OidcClient {

    private _userManager: UserManager
    
    private _authority: string
    private _signin_callback: string
    private _signout_callback: string
    private _client_id: string

    public constructor() {

        this._authority = 'https://dev-flex-login.compusoftgroup.com';
        this._signin_callback = '';
        this._signout_callback = '';
        // this._client_id = 'contentStudio2020';
        this._client_id = 'IdealSpaces7';

        this._userManager = new UserManager({
            scope: 'openid email profile',
            response_type: 'code',
            authority: this._authority,
            redirect_uri: `${window.location.origin}${this._signin_callback}`,
            post_logout_redirect_uri: `${window.location.origin}${this._signout_callback}`,
            client_id: this._client_id,
            automaticSilentRenew: true,
            loadUserInfo: false,
            monitorSession: false
        })

        // TODO: Should be done in the redirect uri
        if (window.location.search.includes('code=')) {
            this.signinCallback();
        }

        this._userManager.events.addUserLoaded((user) => {
            let uri = sessionStorage.getItem('redirectUri')
            if (uri) {
                console.log(uri);
                sessionStorage.removeItem('redirectUri');
                window.location.replace(uri);
            }
        })
    }

    public user = async () => {
        return await this._userManager.getUser();
    }

    public isAuthenticated = () => {
        let auth = sessionStorage.getItem(`oidc.user:${this._authority}:${this._client_id}`);

        if (auth && auth !== '') {
            const storage = JSON.parse(auth);
            return (!!storage && !!storage.access_token);
        }
        
        return false;
    }

    public signin = async () => {
        sessionStorage.setItem('redirectUri', `${window.location.pathname}${window.location.search}`);

        this._userManager.signinRedirect({
            extraQueryParams: {
                bypass: true
            }
        });
    }

    public signinCallback = async () => {
        this._userManager.signinRedirectCallback();
    }

    public signout = async () => {
        this._userManager.signoutRedirect({
            id_token_hint: localStorage.getItem('id_token') ?? ''
        });

        this._userManager.clearStaleState();
    }

    public signoutCallback = async () => {
        this._userManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
        })

        this._userManager.clearStaleState();
    }
}