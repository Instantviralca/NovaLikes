-- Planned editorial calendar: intended date is never an auto-publish trigger.
-- status remains TEXT so existing draft/scheduled/published/trash rows are unchanged.

ALTER TABLE cms_articles
  ADD COLUMN IF NOT EXISTS intended_publish_on TEXT;
