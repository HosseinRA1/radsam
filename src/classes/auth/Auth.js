import React from 'react';
import {AsyncStorage} from 'react-native'

export default class Auth {

    static  _mobile = null;
    static  _firstName = null;
    static  _family = 'null';
    static  _token = null;
    static  _login = false;
    static _registerForm = false;


    static get registerForm() {
        return this._registerForm;
    }

    static set registerForm(value) {
        this._registerForm = value;
    }

    static get mobile() {
        return this._mobile;
    }

    static set mobile(value) {
        this._mobile = value;
    }


    static get firstName() {
        return this._firstName;
    }

    static set firstName(value) {
        this._firstName = value;
    }


    static get family() {
        return this._family;
    }

    static set family(value) {
        this._family = value;
    }

    static get token() {
        return this._token;
    }

    static set token(value) {
        this._token = value;
    }

    static get login() {
        return this._login;
    }

    static set login(value) {
        this._login = value;
    }


    static async setMobile(mobile) {
        await AsyncStorage.setItem('_mobile', mobile);
        Auth.mobile = mobile;
    }

    static async setFirstName(name) {
        await AsyncStorage.setItem('_firstName', name);
        Auth.firstName = name;
    }


    static async setFamily(family) {
        await AsyncStorage.setItem('_family', family);
        Auth.family = family;
    }


    static async setToken(token) {
        await AsyncStorage.setItem('_token', token);
        Auth.token = token;
    }

    static async setLogin(login) {
        Auth.login = login;

        if (login) {
            login = '1';
        } else {
            login = '0';
        }
        await AsyncStorage.setItem('_login', login);

    }

    static async setRegisterForm(value) {
        Auth.registerForm = value;

        if (value) {
            value = '1';
        } else {
            value = '0';
        }
        await AsyncStorage.setItem('_register_form', value);

    }

    static async getLogin() {
        try {
            let result = await AsyncStorage.getItem('_login');
            Auth.login = (result === '1');
            return Auth.login;
        } catch (error) {
            console.log(error);
            Auth.login = false;
            return Auth.login;
        }
    }

    static async getRegisterForm() {
        try {
            let result = await AsyncStorage.getItem('_register_form');
            Auth.registerForm = (result === '1');
            return Auth.registerForm;
        } catch (error) {
            console.log(error);
            Auth.registerForm = false;
            return Auth.registerForm;
        }
    }

    static async getToken() {
        try {
            Auth.token = await AsyncStorage.getItem('_token');
        } catch (error) {
            console.log(error);
            Auth.token = null;
        }
        return Auth.token;
    }

    static async getMobile() {
        try {
            Auth.mobile = await AsyncStorage.getItem('_mobile');
        } catch (error) {
            console.log(error);
            Auth.mobile = null;
            return Auth.mobile;


        }
    }

    static async getFirstName() {
        try {
            Auth.firstName = await AsyncStorage.getItem('_firstName');
        } catch (error) {
            console.log(error);
            Auth.firstName = null;
            return Auth.firstName;


        }
    }


    static async getFamily() {
        try {
            Auth.family = await AsyncStorage.getItem('_family');
        } catch (error) {
            console.log(error);
            Auth.family = null;
            return Auth.family;


        }
    }

    static async initial() {
        await Auth.getToken();
        await Auth.getFirstName();
        await Auth.getFamily();
        await Auth.getLogin();
        await Auth.getMobile();
        await Auth.getRegisterForm();
    }

    static async logout() {
        await Auth.setLogin(false);
        await Auth.setFirstName('');
        await Auth.setFamily('');
        await Auth.setToken('');
        await Auth.setMobile('');
        await Auth.setRegisterForm(false);

    }


}
