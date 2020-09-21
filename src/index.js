import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import style from "./assets/main.css";

import InstApp from "./containers/app";
import reducer from "./reducers";
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;

const unsplash = new Unsplash({
    accesskey: "cBnPpakxBx-IWxu74sAcs9s2ptvxUSEWKwVICB0KAu8",
    secret: "j29XTDwZKf9XLUX9LduM47QFwyIUcBLNdnY_9qhEon4",
    callbackUrl: "http://localhost:8080/"
});

const code = location.search.split("code=")[1];
let store = "";

//q_local: "https://unsplash.com/oauth/token?client_id=cBnPpakxBx-IWxu74sAcs9s2ptvxUSEWKwVICB0KAu8&client_secret=j29XTDwZKf9XLUX9LduM47QFwyIUcBLNdnY_9qhEon4&redirect_uri=http://localhost:8080&code=" + code + "&grant_type=authorization_code"
//q_global: "https://unsplash.com/oauth/token?client_id=cBnPpakxBx-IWxu74sAcs9s2ptvxUSEWKwVICB0KAu8&client_secret=j29XTDwZKf9XLUX9LduM47QFwyIUcBLNdnY_9qhEon4&redirect_uri=http://rchat.info/skillbox_js_diplom/auth&code=" + code + "&grant_type=authorization_code"

let q = fetch(
    "https://unsplash.com/oauth/token?client_id=cBnPpakxBx-IWxu74sAcs9s2ptvxUSEWKwVICB0KAu8&client_secret=j29XTDwZKf9XLUX9LduM47QFwyIUcBLNdnY_9qhEon4&redirect_uri=http://localhost:8080/&code=" +
        code +
        "&grant_type=authorization_code"
)
    .then(response => response.json())
    .then(json => {
      console.log(json);
        unsplash.auth.setBearerToken(json.access_token);
        unsplash.photos
            .getRandomPhoto({ count: 10 })
            .then(toJson)
            .then(json => {
                let resultArray = [];
                json.map((it, i) => {
                    resultArray = [...resultArray, { ...it }];
                });
                store = createStore(reducer, {
                    photos: resultArray,
                    active: "none",
                    bigPhotoClass: "big-image",
                    photoDownloader: unsplash,
                    loading: false
                });
                ReactDOM.render(
                    <InstApp store={store} />,
                    document.querySelector("body")
                );
            });
    });