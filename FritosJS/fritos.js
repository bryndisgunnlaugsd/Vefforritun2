class FritosObject {
    constructor(elements) {
        this.elements = Array.from(document.querySelectorAll(selector));    
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

    animate(){
        return
    }

    find(){
        return
    }

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