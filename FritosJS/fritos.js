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