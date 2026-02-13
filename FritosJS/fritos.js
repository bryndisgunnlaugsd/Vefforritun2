class FritosObject {
    constructor(elements) {
        this.elements = Array.from(elements).filter(el => el !== undefined);  
    }

    hide(){
        for(let i = 0; i < this.elements.length; i++){
            this.elements[i].style.display = "none";
        }
        return this
    }

    parent(selector){
        const parents = []

        for(let i = 0; i < this.elements.length; i++){
            const parentEl = this.elements[i].parentElement;
            if(selector){
                if(parentEl && parentEl.matches(selector)){
                    parents.push(parentEl)
                }
            }
            else{
                if(parentEl){
                    parents.push(parentEl)
                }
            }
        }

        return new FritosObject(parents)
    }

    ancestor(selector){
        const ancestors = []
        for(let i = 0; i < this.elements.length;i++){
            let curr = this.elements[i].parentElement

            while(curr){
                if(selector){
                    if(curr.matches(selector))
                        ancestors.push(curr)
                }
                else{
                    ancestors.push(curr)
                }

                curr = curr.parentElement

            }
        }
        return new FritosObject(ancestors)
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