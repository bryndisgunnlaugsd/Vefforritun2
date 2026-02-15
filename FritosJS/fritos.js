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

    animate(cssProp, animationOpt) {
        var opts = animationOpt || {};
    
        var options = {
            duration: opts.duration || 0,
            delay: opts.delay ? parseFloat(opts.delay) * 1000 : 0,
            easing: opts.easing || 'ease',
            iterations: opts.iterationCount === 'infinite' ? Infinity : (opts.iterationCount || 1),
            fill: opts.fillMode || 'none'
        };
    
        this.elements.forEach(function(el) {
            el.animate([cssProp], options);
        });
    
        return this;
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