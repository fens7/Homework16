function FormValidate(form) {
    const errorWrapperClass = 'error';
    const errorItemClass = 'error__item';
    const elements = Array.from(form.elements);
    elements.pop();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkFormElements();
    });

    this.checkFormElements = function(){
        for (let i = 0; i < elements.length; i++){
            const element = elements[i];
            const passwordMessage = element.dataset.password;
            const emailMessage = element.dataset.email;
            const requiredMessage = element.dataset.req;
            const checkboxMessage = element.dataset.check_req;
            const minLength = element.dataset.min_length;
            const minMessage = element.dataset.min_message;
            if(passwordMessage){
                this.validPassword(passwordMessage);
            }
            if(requiredMessage){
                this.requiredField(element, requiredMessage);
            }
            if(checkboxMessage){
                this.checkboxRequired(element, checkboxMessage)
            }
            if(emailMessage){
                this.validMail(emailMessage)
            }
            if(minMessage){
                this.validLength(element, minMessage.replace("N", minLength))
            }
        }
    };

    this.validPassword = function(message){
        const allPasswords = form.querySelectorAll('input[type="password"]')
        const passValueArr = Array.from(allPasswords).map(element => element.value)
        if(passValueArr[0] !== passValueArr[1]){
            allPasswords.forEach(item => {
                this.errorTemplate(item, message)
            })
        }
    };

    this.validMail = function(message){
        const emailValue = form.querySelector('input[name="email"]');
        if(!emailValue.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
            this.errorTemplate(emailValue, message);
        };
    };

    this.requiredField = function(item, message){
        if(!item.value){
            this.errorTemplate(item, message)
        };
    };

    this.checkboxRequired = function(item, message){
        if(!item.checked){
            this.errorTemplate(item, message);
        };
    };

    this.validLength = function(element, message){
        const minLength = +element.dataset.min_length;
        if(element.value.length < minLength){
            this.errorTemplate(element, message)
        }
    };

    this.errorTemplate = function(item, message){
        const parent = item.closest('.form-control')
        if(!parent.classList.contains(errorWrapperClass)){
            parent.classList.add(errorWrapperClass);
            parent.insertAdjacentHTML('beforeend', `<small class="${errorItemClass}">${message}</small>`)
        };
    };

};

const form = new FormValidate(document.querySelector('#form'));