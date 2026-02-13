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
                    if(curr.matches(selector)){
                        ancestors.push(curr)
                    }
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

fritos.remoteCall = function(url, options) {
    const method = options.method || 'GET';
    const timeout = (options.timeout || 45) * 1000;  // milliseconds
    const headers = options.headers || {};
    const body = options.body;
    const onSuccess = options.onSuccess;
    const onError = options.onError;
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort(); 
    }, timeout);

    fetch(url, {
        method: method,
        headers: headers,
        body: body,
        signal: controller.signal 
    })

    .then(response => {
        clearTimeout(timeoutId); 
        return response.json();    
    })
    
    .then(data => {
        if (onSuccess) {
            onSuccess(data);
        }
    })

    .catch(error => {
        clearTimeout(timeoutId);
        if (onError) {
            onError(error);
        }
    });

}