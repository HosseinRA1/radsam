import Toaster from "../toast/Toast";
import {API_URL_V1} from "../system";
import Auth from "../auth/Auth";

export default class Webservice {
    _url;
    _method = GET_METHOD;
    _body = null;
    _isFile = false;


    get isFile() {
        return this._isFile;
    }

    set isFile(value) {
        this._isFile = value;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get method() {
        return this._method;
    }

    set method(value) {
        this._method = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setMethod(method) {
        this.method = method;
    }


    async call() {

        console.log(Auth.token);
        let config = {
            method: this.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.token
            }
        };
        if (this.body !== null) {
            if (!this.isFile) {
                this.body = JSON.stringify(this.body);
                config = {
                    method: this.method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Auth.token
                    },
                    body: this.body,
                }
            }else{
                config = {
                    method: this.method,
                    headers: {
                       // Accept: 'application/json',
                        //'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Auth.token
                    },
                    body: this.body,
                }
            }

        }

        try {
            let response = await fetch(
                this.url, config
            );

            //MethodNotAllowedHttpException
            if (response.status === 405) {
                return new Promise((resolve, reject) => {
                    reject(response);
                })
            }

            console.log(response);
            return new Promise((resolve, reject) => {
                resolve(response);
            });

        } catch (error) {
            new Toaster().error('There was a problem. Try again');
            console.log(error);
            return new Promise((resolve, reject) => {
                reject(error);
            });


        }


    }
}

export const POST_METHOD = 'POST';
export const GET_METHOD = 'GET';