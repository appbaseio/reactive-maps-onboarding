import { storageService } from './StorageService';
import { urlShare } from './UrlShare';

class DataOperation {
  constructor() {
    this.user = null;
    this.app = {
      appName: 'test-app',
      id: 3243,
      password: "5595b682-00ff-4525-9c95-8f26a6a2a8ef",
      username: "B6kyRK2Ch"
    };
    $.ajaxSetup({
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    });
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
}

export const dataOperation = new DataOperation();
