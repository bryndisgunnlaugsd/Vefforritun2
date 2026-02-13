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

    raise(level){
        for(let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            for(let j = 0; j < level; j++) {
                const parent = element.parentNode;
                const grandparent = parent.parentNode;
                grandparent.insertBefore(element, parent);
            }
        }
        return this;
    }

    attrs(attr_name, value){
        for(let i = 0; i < this.elements.length; i++) {
            this.elements[i].setAttribute(attr_name, value)
        }
        return this;
    }

    val(value){
        if (value === undefined) {
            return this.elements[0].value
        }else {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].value = value
            }
            return this;
        }

    }
}
const fritos = (selector) => {
    const elements = document.querySelectorAll(selector);
    return new FritosObject(elements);
};