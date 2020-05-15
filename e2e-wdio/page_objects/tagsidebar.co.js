class TagSidebarCo {

    get component() { return $('//hn-tag-sidebar');}

    get tagSumText() { return this.component.$('//span[@class="hashtag"]');}

    get numOfTags() {return this.component.$$('//div[@class="tag-container"]');}

    get numOfBullets() {return this.component.$$('//div[@class="content"]');}


    numOfBulletsSum(){
        return this.numOfBullets.length;
    }

    numOfTagsSum(){
        return this.numOfTags.length;
    }

    isTagDisplayed(){
        return this.tagSumText.getText();
    }

    isLoaded() {
        expect(this.component.getProperty('hidden')).to.equal(false)
    }
}

module.exports = new TagSidebarCo();
