class PromptCo {

    get component(){ return $('//ion-toast');}

    get componentTiny(){ return $('.tox-silver-sink')}

    get closeButtonTiny() { return this.componentTiny.$('.tox-button--icon')}

    get notificationPrompt(){ return this.component.shadow$('.toast-header');}

    get cancelButton() { return this.component.shadow$('.toast-button-group button:first-child');}

    get dismissButton () { return this.component.shadow$('.toast-button-group button:nth-child(2)');}

    waitForTiny(){
        this.componentTiny.isDisplayed();
    }

    closeBtnClickTiny(){
        this.closeButtonTiny.click();
    }

    promptDisplayed(){
       return this.notificationPrompt.getText();
    }

    cancelBtnDisplayed(){
        return this.cancelButton.getText();
    }

    dismissBtnDisplayed(){
        return this.dismissButton.getText();
    }

    cancelBtnClick(){
        this.cancelButton.click();
    }

    dismissBtnClick(){
        this.dismissButton.click();
    }
}
module.exports = new PromptCo();
