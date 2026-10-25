import { Heart, Star, UserPlus } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';

/** Decorative profile card visual (matches the prototype). */
function ProfileVisual() {
  return (
    <div className="vis vis-profile" aria-hidden="true">
      <span className="bg-blob" />
      <span className="bg-dot dot-a" />
      <span className="bg-dot dot-b" />
      <div className="pf-card rv-pop">
        <div className="pf-top">
          <span className="pf-av" />
          <span className="pf-lines">
            <b />
            <i />
          </span>
        </div>
        <div className="pf-stats">
          <span>
            <b className="bar" />
            <em>Posts</em>
          </span>
          <span className="on">
            <b className="bar" />
            <em>Followers</em>
          </span>
          <span>
            <b className="bar" />
            <em>Following</em>
          </span>
        </div>
        <div className="pf-grid">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <span className="chip-float cf-1 rv-pop">
        <Heart className="ic" aria-hidden="true" /> Likes
      </span>
      <span className="chip-float cf-2 rv-pop">
        <UserPlus className="ic" aria-hidden="true" /> Followers
      </span>
      <svg className="doodle d-spark" viewBox="0 0 60 60">
        <path d="M8 30h12M40 30h12M30 8v12M30 40v12" />
      </svg>
    </div>
  );
}

/** Decorative growth visual (matches the prototype). */
function GrowthVisual() {
  return (
    <div className="vis vis-growth" aria-hidden="true">
      <svg className="g-arrow" viewBox="0 0 520 440">
        <path d="M30 410 L330 140 L290 110 L490 30 L430 230 L395 190 L95 460 Z" />
      </svg>
      <span className="av av-a rv-pop">
        <span className="av-in">
          <UserPlus className="ic" aria-hidden="true" />
        </span>
      </span>
      <span className="av av-b rv-roll">
        <span className="av-in">
          <Heart className="ic" aria-hidden="true" />
        </span>
      </span>
      <svg className="doodle d-curve" viewBox="0 0 200 120">
        <path d="M10 100 C 60 20, 120 120, 186 26" pathLength="1" />
      </svg>
      <svg className="doodle d-star" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <svg className="doodle d-burst" viewBox="0 0 60 60">
        <path d="M10 20 L22 26M16 6 L26 18M32 4 L32 18" />
      </svg>
    </div>
  );
}

export function HomeV5Stories({ content = HOME_V5 }: { content?: HomeV5Content }) {
  return (
    <>
      {content.stories.map((story, index) => {
        const reversed = index % 2 === 1;
        return (
          <section key={story.id} id={story.id} className={reversed ? 'story rev' : 'story'}>
            <div className="wrap story-grid">
              <div className={reversed ? 'story-text rv-right' : 'story-text rv-left'}>
                <SplitTitle title={story.title} className="h2 left" />
                <p className="body">{story.body}</p>
                <blockquote className="callout">
                  <Star className="ic" aria-hidden="true" />
                  <p>{story.callout}</p>
                </blockquote>
              </div>
              <div className={reversed ? 'story-vis rv-left' : 'story-vis rv-right'}>
                {story.visual === 'profile' ? <ProfileVisual /> : <GrowthVisual />}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
