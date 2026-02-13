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

    find(selector) {
        if (!selector) {
            return new FritosObject([]);
        }
        var matched = [];
        this.elements.forEach(function(el) {
            var children = el.querySelectorAll(selector);
            children.forEach(function(child) {
                if (matched.indexOf(child) === -1) {
                    matched.push(child);
                }
            });
        });
        return new FritosObject(matched);
    }

    onEvent(eventType, eventFunction) {
        this.elements.forEach(function(el) {
            el.addEventListener(eventType, eventFunction);
        });
        return this;
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