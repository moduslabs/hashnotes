import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class RecentHashtagsProvider {
  public hashtags: Array<string> = [];

  public initialized: Promise<void>;

  constructor(private readonly storage: Storage) {
    this.initialized = this.loadRecentHashtags();
  }

  public async addHashtag(hashtag: string): Promise<void> {
    this.hashtags = this.hashtags.filter(
      (recentHashtag: string): boolean => recentHashtag !== hashtag,
    );

    this.hashtags.unshift(hashtag);

    if (this.hashtags.length > 6) {
      this.hashtags.pop();
    }

    return this.saveRecentHashtags();
  }

  private async saveRecentHashtags(): Promise<void> {
    return this.storage.set('recent-hashtags', this.hashtags);
  }

  private async loadRecentHashtags(): Promise<void> {
    return this.storage.get('recent-hashtags').then(
      async (hashtagsAsJson: any): Promise<void> => {
        this.hashtags = hashtagsAsJson ? hashtagsAsJson : [];

        return Promise.resolve();
      },
    );
  }
}
