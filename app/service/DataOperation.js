import { storageService } from './StorageService';
import { urlShare } from './UrlShare';
import { sampleCodeSnippet } from './SampleCodeSnippet';

class DataOperation {
  constructor() {
    this.user = null;
    this.app = null;
    // this.app = {
    //   "appName": "ReactTestApp3",
    //   "username": "CR1KCtfUY",
    //   "password": "a5aaebbe-c734-43e5-89dc-76d0f37689eb",
    //   "type": "test"
    // };
    $.ajaxSetup({
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    });
    this.sampleCodeSnippet = sampleCodeSnippet;
  }
  getUser() {
    return $.ajax({
      type: "GET",
      url: 'https://accapi.appbase.io/user',
      dataType: 'json',
      contentType: "application/json"
    });
  }
  createApp(appname) {
    return $.ajax({
      type: "PUT",
      url: 'https://accapi.appbase.io/app/' + appname,
      dataType: 'json',
      contentType: "application/json"
    });
  }
  updateUser(user) {
    this.user = user;
  }
  updateApp(app) {
    this.app = app;
  }
  updateMapping(type, mappingObj) {
    let credentials = this.app.username + ':' + this.app.password;
    this.app.type = type;
    return $.ajax({
      type: "PUT",
      url: 'https://scalr.api.appbase.io/' + this.app.appName + '/_mapping/' + type + '?ignore_conflicts=true&update_all_types=true',
      dataType: 'json',
      contentType: "application/json",
      headers: {
        'Authorization': 'Basic ' + btoa(credentials)
      },
      data: JSON.stringify(mappingObj)
    });
  }
  indexData(data) {
    let credentials = this.app.username + ':' + this.app.password;
    let finalData = [];
    data.forEach((record) => {
      let indexObj = {
        index: {}
      };
      finalData.push(indexObj);
      finalData.push(record);
    });
    var appbaseRef = new Appbase({
      "url": "https://scalr.api.appbase.io",
      "appname": this.app.appName,
      "username": this.app.username,
      "password": this.app.password
    });
    return appbaseRef.bulk({
      type: this.app.type,
      body: finalData
    });
  }
  createUrl(cb) {
    let obj = {
      url: 'https://'+this.app.username+':'+this.app.password+'@scalr.api.appbase.io',
      appname: this.app.appName,
      version: '2.4.0'
    };
    if(this.app.type) {
      obj.selectedType = [this.app.type];
      obj.selectedTypes = [this.app.type];
    }
    urlShare.setInputs(obj, cb);
  }
  appConfig() {
    return {
      "appname": this.app.appName,
      "username": this.app.username,
      "password": this.app.password,
      "type": this.app.type
    };
  }
  htmlSnippet() {
    return `<div id="root"></div>`;
  }
  resources() {
    let resources = [
      'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js',
      'https://maps.google.com/maps/api/js?key=AIzaSyC-v0oz7Pay_ltypZbKasABXGiY9NlpCIY&libraries=places',
      'https://rawgit.com/appbaseio/reactive-maps/umd/umd/ReactiveMaps.js',
      'https://cdn.rawgit.com/appbaseio/reactive-maps/umd/dist/js/vendor.min.js',
      'https://cdn.rawgit.com/appbaseio/reactive-maps/umd/dist/css/vendor.min.css',
      'https://cdn.rawgit.com/appbaseio/reactive-maps/umd/dist/css/style.min.css'
    ];
    return resources.join(',');
  }
  appSnippet() {
    let obj = this.appConfig();
    return this.sampleCodeSnippet.replace('{{appbaseConfig}}', JSON.stringify(obj, null, 4));
  }
}

export const dataOperation = new DataOperation();
