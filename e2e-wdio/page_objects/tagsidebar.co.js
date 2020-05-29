class TagSidebarCo {

    get component() { return $('//hn-tag-sidebar');}

    get tagSumText() { return this.component.$('//span[@class="hashtag"]');}

    get numOfTags() {return this.component.$$('//div[@class="tag-container"]');}

    get numOfBullets() {return this.component.$$('//div[@class="content"]');}

    get tagSumLocYAxis() {return $('//div[@class="tag-summary"]')}

    get exportBtnSummary() { return $('ion-button.export-button');}

    get copyBtnSummary() {return $('ion-button.copy-button');}

    clickCopySummary() {
        this.copyBtnSummary.click();
    }

    clickExportSummary(){
        this.exportBtnSummary.click();
    }
    tagDisplayedInViewPort(displayed){
        return $(`.tag-container:nth-child(${3 + displayed} )`).isDisplayedInViewport();
    }

    scrollIntoViewTag(tag) {
        $(`.tag-container:nth-child(${3 + tag} )`).scrollIntoView();
    }

    tagSumYAxis(){
        return this.tagSumLocYAxis.getLocation('y');
    }

    numOfBulletsSum(){
        return this.numOfBullets.length;
    }

    numOfTagsSum(){
        return this.numOfTags.length;
    }

    tagText(){
        return this.tagSumText.getText();
    }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new TagSidebarCo();
