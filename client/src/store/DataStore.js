import { action, observable, decorate } from "mobx"

class DataStore {
    county = '';
    where = '';
    inputGeometry = '';
    outFields = '';
    returnGeometry = '';
    clicked = false;
    loaded = false;


    setCounty(x) {
        this.county = x;
    }
    setWhere(x) {
        this.where = x;
    }
    setInputGeometry(x) {
        this.inputGeometry = x;
    }
    setOutFields(x) {
        this.outFields = x;
    }
    setReturGeometry(x) {
        this.returnGeometry = x;
    }
    setClicked(x) {
        this.clicked = !x;
    }
    setLoaded(x) {
        this.loaded = !x;
    }
}


decorate(DataStore, {
    county: observable,
    where: observable,
    inputGeometry: observable,
    outFields: observable,
    returnGeometry: observable,
    clicked: observable,
    loaded: observable,
    setCounty: action,
    setWhere: action,
    setInputGeometry: action,
    setOutFields: action,
    setReturGeometry: action,
    setClicked: action,
    setLoaded: action
})

export default new DataStore()