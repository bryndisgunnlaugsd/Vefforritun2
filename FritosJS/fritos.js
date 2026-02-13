class FritosObject {
    constructor(elements) {
        this.elements = Array.from(elements).filter(el => el !== undefined);  
    }

    hide(){
        return
    }

    parent(){
        return
    }

    ancestor(){
        return
    }


    //TODO: Bryndís
    animate(){
        return
    }

    //TODO: Bryndís
    find(){
        return
    }

    //TODO: Bryndís
    onEvent(){
        return
    }

    remoteCall(){
        return
    }

    validation(){
        return
    }

    prune(){
        return
    }

    raise(){
        return
    }

    attr(){
        return
    }

    val(){
        return
    }
}
const fritos = (selector) => {
    const elements = document.querySelectorAll(selector);
    return new FritosObject(elements);
};