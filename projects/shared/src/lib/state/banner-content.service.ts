import { Injectable, signal, effect } from '@angular/core';
import { BannerContent } from '../models/banner-content.interface';

@Injectable({ providedIn: 'root' })
export class BannerContentService {
  content = signal<BannerContent | null>(null);

  constructor() {
    const stored = localStorage.getItem('poc_mfe_banner');
    if (stored) this.content.set(JSON.parse(stored));

    effect(() => {
      const c = this.content();
      if (c) localStorage.setItem('poc_mfe_banner', JSON.stringify(c));
      else localStorage.removeItem('poc_mfe_banner');
    });
  }

  setBanner(content: BannerContent) {
    this.content.set(content);
  }
}
