import {
  ENGLISH_QUICK_ANSWERS,
  type QuickAnswerPageId,
} from '@/data/quick-answers';

export function getEnglishQuickAnswersSource(): Record<QuickAnswerPageId, string> {
  return { ...ENGLISH_QUICK_ANSWERS };
}
