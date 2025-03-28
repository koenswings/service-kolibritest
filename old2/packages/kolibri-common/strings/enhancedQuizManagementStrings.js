import { createTranslator } from 'kolibri/utils/i18n';

export const enhancedQuizManagementStrings = createTranslator('EnhancedQuizManagementStrings', {
  selectAllLabel: {
    message: 'Select all',
  },
  sectionLabel: {
    message: 'Section { sectionNumber, number }',
  },
  quizSectionsLabel: {
    message: 'Quiz sections',
    context: 'Used as an aria-label for screen readers to describe the purpose of the list of tabs',
  },
  addSectionLabel: {
    message: 'Add section',
  },
  editSectionLabel: {
    message: 'Edit section',
  },
  deleteSectionLabel: {
    message: 'Delete section',
  },
  noQuestionsInSection: {
    message: 'There are no questions in this section',
  },
  addQuizSectionQuestionsInstructions: {
    message: 'To add questions, select resources from the available channels',
    context:
      "'Resources' refers to 'exercise' type of content, which contain multiple questions. Feel free to translate as '...select exercises from the available channels'.",
  },
  addQuestionsLabel: {
    message: 'Add questions',
  },
  addMoreQuestionsLabel: {
    message: 'Add more questions',
  },
  sectionSettings: {
    message: 'Section settings',
  },
  sectionTitle: {
    message: 'Section title',
  },
  sectionTitleUniqueWarning: {
    message: 'Section title already used',
    context: 'Informs the user that they must use a unique title for each section',
  },
  numberOfQuestionsLabel: {
    message: 'Number of questions',
  },
  numberOfQuestionsToAdd: {
    message: 'Number of questions to add',
  },
  tooManyQuestions: {
    message: 'You cannot select more than { count, number } questions',
    context: 'This number will always be at least 10.',
  },
  optionalDescriptionLabel: {
    message: 'Description (optional)',
  },
  sectionOrder: {
    message: 'Section order',
  },
  currentSection: {
    message: 'Current section',
  },
  applySettings: {
    message: 'Apply settings',
  },
  addNumberOfQuestions: {
    message: 'Add { count, number } { count, plural, one { question } other { questions }}',
  },
  replaceNumberOfQuestions: {
    message: 'Replace { count, number } { count, plural, one { question } other { questions }}',
  },
  selectResourcesDescription: {
    message: "Add questions to '{ sectionTitle }'",
  },
  numberOfSelectedBookmarks: {
    message: '{ count, number } { count, plural, one { bookmark } other { bookmarks }}',
  },
  numberOfSelectedQuestions: {
    message: '{count, number} {count, plural, one {question selected} other {questions selected}}',
  },
  maxNumberOfQuestions: {
    message: 'Maximum number of questions is { count, number }',
  },
  replaceQuestions: {
    message: 'Replace questions in { sectionTitle }',
  },
  collapseAll: {
    message: 'Collapse all',
    context:
      "Refers to 'questions' - by default coach sees the list of question titles, but the titles are clickable and when opened, the whole content of the question is visible. When many questions are opened, the coach can use the button with this label 'Collapse all' to close them all at once.",
  },
  expandAll: {
    message: 'Expand all',
  },
  autoReplaceAction: {
    message: 'Auto-replace',
  },
  replaceAction: {
    message: 'Replace',
  },
  noLearnersEnrolled: {
    message: 'No learners enrolled in { className }',
  },
  noResourcesAvailable: {
    message:
      'There are no resources on your device yet. Ask an administrator to add resources to your device.',
  },
  replaceQuestionsHeading: {
    message: 'The new questions you select will replace the current ones.',
  },
  replaceQuestionsExplaination: {
    message: 'The new questions you selected will replace the current ones.',
  },
  noUndoWarning: {
    message: "You can't undo or cancel this.",
  },
  sectionOrderLabel: {
    message: 'Section order',
    context: 'A label for the place where the section order option is shown.',
  },
  questionOrder: {
    message: 'Question order',
  },
  randomizedLabel: {
    message: 'Randomized',
  },
  randomizedOptionDescription: {
    message: 'Each learner sees a different question order',
  },
  randomizedSectionOptionDescription: {
    message: 'Each learner sees a different section order',
  },
  fixedLabel: {
    message: 'Fixed',
  },
  fixedOptionDescription: {
    message: 'Each learner sees the same question order',
  },
  fixedSectionOptionDescription: {
    message: 'Each learner sees the same section order',
  },
  deleteConfirmation: {
    message: "Are you sure you want to delete '{section_title}'?",
    context:
      'A warning message that appears when the user tries to leave the page without saving their work',
  },
  numberOfSelectedReplacements: {
    message:
      '{ count, number } of { total, number } {total, plural, one {replacement selected} other {replacements selected}}',
  },
  numberOfReplacementsAvailable: {
    message:
      '{count, number, integer} {count, plural, one {replacement question available} other {replacement questions available}}',
  },
  numberOfQuestionsAdded: {
    message:
      '{ count, number } { count, plural, one { question successfully added } other { questions successfully added }} ',
  },
  numberOfQuestionsReplaced: {
    message:
      '{ count, number } { count, plural, one { question successfully replaced } other { questions successfully replaced }} ',
  },
  numberOfQuestionsSelected: {
    message: 'Current number of questions in this section: {count, number}',
  },
  selectQuestionsToContinue: {
    message: 'Select { count } { count, plural , one { question } other { questions }} to continue',
  },
  selectQuiz: {
    message: 'Select quiz',
    context:
      "Practice quizzes are pre-made quizzes, that don't require the curation work on the part of the coach. Selecting a practice quiz refers to importing a ready-to-use quiz.",
  },
  selectPracticeQuizLabel: {
    message: 'Select a practice quiz',
    context:
      "Practice quizzes are pre-made quizzes, that don't require the curation work on the part of the coach. Selecting a practice quiz refers to importing a ready-to-use quiz.",
  },
  cannotSelectSomeTopicWarning: {
    message: 'You can only select a total of { count, number } questions or fewer.',
  },
  changesSavedSuccessfully: {
    message: 'Changes saved successfully',
    context: 'A snackbar message that appears when the user saves their changes',
  },
  sectionDeletedNotification: {
    message: "'{ section_title }' deleted",
    context: 'A snackbar message that appears when the user deletes a SECTION',
  },
  questionsDeletedNotification: {
    message: '{ count, number } { count, plural, one { question } other { questions }} deleted',
    context: 'A snackbar message that appears when the user deletes questions',
  },
  allSectionsEmptyWarning: {
    message: "You don't have any questions in the quiz",
  },
  questionsUnusedInSection: {
    message: '{ count, number } { count, plural, one { question } other { questions }} unused',
  },
  questionsFromResources: {
    message:
      '{ questions, number } { questions, plural, one { question } other { questions }} selected',
  },
  questionsLabel: {
    message: 'Questions',
    context: 'Label for a list of questions',
  },
  jumpToQuestion: {
    message: 'Jump to question',
    context: 'A label for the section of the page that contains all questions as clickable links',
  },
  saveAndClose: {
    message: 'Save and close',
  },
  questionsSettingsLabel: {
    message: "Questions settings for '{ sectionTitle }'",
    context:
      'A title label for the section of the page that contains settings for questions selection',
  },
  maxNumberOfQuestionsInfo: {
    message:
      'You can add up to { count, number } { count, plural, one { question } other { questions }}  to this section',
    context: 'A message that informs the user about the maximum number of questions they can add',
  },
  chooseQuestionsManuallyLabel: {
    message: 'Choose questions manually',
    context: 'A label for a checkbox that allows the user to manually select questions',
  },
  clearSelectionNotice: {
    message: 'Changing this setting will clear your current selections',
    context: 'A message that informs the user that changing a setting will remove their selections',
  },
  selectUpToNResources: {
    message:
      'Select up to { count, number } { count, plural, one { resource } other { resources }}',
    context:
      'A message that informs the user about the maximum number of resources they can select',
  },
  selectNQuestions: {
    message: 'Select { count, number } { count, plural, one { question } other { questions }}',
    context: 'A message that informs the user about the number of questions they need to select',
  },
  selectUpToNQuestions: {
    message:
      'Select up to { count, number } { count, plural, one { question } other { questions }}',
    context:
      'A message that informs the user about the maximum number of questions they can select',
  },
  maximumResourcesSelectedWarning: {
    message: 'Maximum resources selected',
    context:
      'A warning message that appears when the user has already selected the maximum number of resources',
  },
  maximumQuestionsSelectedWarning: {
    message: 'Maximum questions selected',
    context:
      'A warning message that appears when the user has already selected the maximum number of questions',
  },
  manualSelectionOnNotice: {
    message: 'Manual question selection is on',
    context: 'A message that appears when the user has enabled the manual selection of questions',
  },
  manualSelectionOffNotice: {
    message: 'Manual question selection is off',
    context: 'A message that appears when the user has disabled the manual selection of questions',
  },
  replacingThisQuestionLabel: {
    message: 'Replacing this question',
    context: 'A label for the question that is being replaced',
  },
});

const { sectionLabel$ } = enhancedQuizManagementStrings;

export function displaySectionTitle(section, index) {
  return section.section_title === ''
    ? sectionLabel$({ sectionNumber: index + 1 })
    : section.section_title;
}

export function displayQuestionTitle(question, exerciseTitle) {
  return question.title === ''
    ? `${exerciseTitle} (${enhancedQuizManagementStrings.$formatNumber(
        question.counter_in_exercise,
      )})`
    : question.title;
}
