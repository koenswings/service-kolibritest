<template>

  <AccordionContainer>
    <template #header="{ canExpandAll, expandAll, canCollapseAll, collapseAll }">
      <div class="questions-accordion-header">
        <div>
          <KCheckbox
            v-if="isSelectable"
            ref="selectAllCheckbox"
            class="select-all-box"
            :style="{
              marginLeft: isSortable ? '1.5em' : '0',
            }"
            :label="selectAllLabel$()"
            :disabled="selectAllIsDisabled"
            :checked="selectAllIsChecked"
            :indeterminate="selectAllIsIndeterminate"
            @change="handleSelectAll"
            @click.stop="() => {}"
          />
        </div>
        <div class="trailing-actions">
          <KIconButton
            icon="expandAll"
            :tooltip="expandAll$()"
            :disabled="!canExpandAll"
            @click="expandAll"
          />
          <KIconButton
            icon="collapseAll"
            :tooltip="collapseAll$()"
            :disabled="!canCollapseAll"
            @click="collapseAll"
          />
          <slot name="header-trailing-actions"></slot>
        </div>
      </div>
    </template>

    <DragContainer
      key="drag-container"
      :items="questions"
      @sort="handleQuestionOrderChange"
      @dragStart="handleDragStart"
    >
      <transition-group
        tag="div"
        name="list"
      >
        <Draggable
          v-for="(question, index) in questions"
          :key="`drag-${question.item}`"
          tabindex="-1"
          :style="{
            background: $themeTokens.surface,
          }"
        >
          <AccordionItem
            :title="displayQuestionTitle(question, getQuestionContent(question).title)"
            :disabledTitle="questionItemsToReplace?.includes(question.item)"
            :aria-selected="questionIsChecked(question)"
            :headerAppearanceOverrides="{
              userSelect: dragActive ? 'none !important' : 'text',
            }"
          >
            <template #leading-actions>
              <DragHandle v-if="isSortable">
                <div>
                  <DragSortWidget
                    :moveUpText="upLabel$"
                    :moveDownText="downLabel$"
                    :noDrag="true"
                    :isFirst="index === 0"
                    :isLast="index === questions.length - 1"
                    @moveUp="() => handleKeyboardDragUp(index)"
                    @moveDown="() => handleKeyboardDragDown(index)"
                  />
                </div>
              </DragHandle>
              <KCheckbox
                v-if="isSelectable"
                class="accordion-item-checkbox"
                :checked="questionIsChecked(question)"
                :disabled="questionCheckboxDisabled(question)"
                @change="
                  (value, $event) => handleQuestionCheckboxChange(question.item, value, $event)
                "
              />
            </template>
            <template #trailing-actions>
              <span v-if="questionItemsToReplace?.includes(question.item)">
                {{ replacingThisQuestionLabel$() }}
              </span>
              <slot
                name="question-trailing-actions"
                :question="question"
              ></slot>
            </template>
            <template #content>
              <div
                :id="`question-panel-${question.item}`"
                :style="{ userSelect: dragActive ? 'none !important' : 'text' }"
              >
                <ContentRenderer
                  :ref="`contentRenderer-${question.item}`"
                  :kind="getQuestionContent(question).kind"
                  :lang="getQuestionContent(question).lang"
                  :files="getQuestionContent(question).files"
                  :available="getQuestionContent(question).available"
                  :itemId="question.question_id"
                  :assessment="true"
                  :allowHints="false"
                  :interactive="false"
                  :showCorrectAnswer="true"
                  @interaction="() => null"
                  @updateProgress="() => null"
                  @updateContentState="() => null"
                  @error="err => $emit('error', err)"
                />
                <slot
                  name="questionExtraContent"
                  :question="question"
                ></slot>
              </div>
            </template>
          </AccordionItem>
        </Draggable>
      </transition-group>
    </DragContainer>
  </AccordionContainer>

</template>


<script>

  import { computed, ref } from 'vue';
  import {
    enhancedQuizManagementStrings,
    displayQuestionTitle,
  } from 'kolibri-common/strings/enhancedQuizManagementStrings';
  import Draggable from 'kolibri-common/components/sortable/Draggable';
  import DragHandle from 'kolibri-common/components/sortable/DragHandle';
  import DragContainer from 'kolibri-common/components/sortable/DragContainer';
  import DragSortWidget from 'kolibri-common/components/sortable/DragSortWidget';
  import AccordionItem from 'kolibri-common/components/accordion/AccordionItem';
  import AccordionContainer from 'kolibri-common/components/accordion/AccordionContainer';
  import { searchAndFilterStrings } from 'kolibri-common/strings/searchAndFilterStrings';
  import useDrag from './useDrag.js';

  export default {
    name: 'QuestionsAccordion',
    components: {
      Draggable,
      DragHandle,
      DragContainer,
      DragSortWidget,
      AccordionItem,
      AccordionContainer,
    },
    setup(props) {
      const dragActive = ref(false);

      const { upLabel$, downLabel$ } = searchAndFilterStrings;
      const { selectAllLabel$, expandAll$, collapseAll$, replacingThisQuestionLabel$ } =
        enhancedQuizManagementStrings;

      const { moveUpOne, moveDownOne } = useDrag();

      function questionCheckboxDisabled(question) {
        if (
          props.disabled ||
          props.unselectableQuestionItems?.includes(question.item) ||
          props.questionItemsToReplace?.includes(question.item)
        ) {
          return true;
        }
        if (
          props.selectedQuestions.includes(question.item) ||
          props.maxSelectableQuestions === null
        ) {
          return false;
        }
        return props.selectedQuestions.length >= props.maxSelectableQuestions;
      }

      function questionIsChecked(question) {
        if (props.questionItemsToReplace?.includes(question.item)) {
          return false;
        }
        if (props.unselectableQuestionItems?.includes(question.item)) {
          return true;
        }
        return props.selectedQuestions.includes(question.item);
      }

      const selectableQuestions = computed(() => {
        if (!props.isSelectable) {
          return [];
        }
        return props.questions.filter(
          question => !props.unselectableQuestionItems?.includes(question.item),
        );
      });

      const selectAllIsChecked = computed(
        () =>
          selectableQuestions.value.length > 0 &&
          selectableQuestions.value.every(question =>
            props.selectedQuestions.includes(question.item),
          ),
      );

      const selectAllIsIndeterminate = computed(
        () =>
          selectableQuestions.value.length > 0 &&
          !selectAllIsChecked.value &&
          selectableQuestions.value.some(question =>
            props.selectedQuestions.includes(question.item),
          ),
      );

      const selectAllIsDisabled = computed(() => {
        if (props.disabled) {
          return true;
        }
        if (props.maxSelectableQuestions === null || selectAllIsChecked.value) {
          return false;
        }
        if (props.selectedQuestions.length >= props.maxSelectableQuestions) {
          return true;
        }
        const deselectedQuestions = selectableQuestions.value.filter(
          question => !props.selectedQuestions.includes(question.item),
        );
        const selectedQuestionsLength = props.selectedQuestions.length;
        const potentialSelectionLength = selectedQuestionsLength + deselectedQuestions.length;
        return potentialSelectionLength > props.maxSelectableQuestions;
      });

      return {
        dragActive,
        selectableQuestions,
        selectAllIsDisabled,
        selectAllIsChecked,
        selectAllIsIndeterminate,

        moveUpOne,
        moveDownOne,
        questionIsChecked,
        displayQuestionTitle,
        questionCheckboxDisabled,

        upLabel$,
        downLabel$,
        selectAllLabel$,
        expandAll$,
        collapseAll$,
        replacingThisQuestionLabel$,
      };
    },
    props: {
      questions: {
        type: Array,
        required: true,
      },
      getQuestionContent: {
        type: Function,
        required: true,
      },
      selectedQuestions: {
        type: Array,
        required: false,
        default: () => [],
      },
      isSelectable: {
        type: Boolean,
        required: false,
        default: true,
      },
      /**
       * Maximum number of questions that can be selected.
       */
      maxSelectableQuestions: {
        type: Number,
        required: false,
        default: null,
      },
      /**
       * If true, all checkboxes will be disabled.
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Array of question ids that already belongs to the quiz,
       * and should not be selectable.
       */
      unselectableQuestionItems: {
        type: Array,
        required: false,
        default: null,
      },
      /**
       * If provided, the question with this item will appear as disabled
       * and with a `Replacing this question` message.
       */
      questionItemsToReplace: {
        type: Array,
        required: false,
        default: null,
      },
    },
    computed: {
      isSortable() {
        return this.$listeners.sort !== undefined;
      },
    },
    methods: {
      handleDragStart() {
        // Used to mitigate the issue of text being selected while dragging
        this.dragActive = true;
      },
      handleQuestionOrderChange({ newArray }) {
        this.$emit('sort', { newArray });
        this.dragActive = false;
      },
      handleKeyboardDragDown(oldIndex) {
        const newArray = this.moveDownOne(oldIndex, this.questions);
        this.handleQuestionOrderChange({ newArray });
      },
      handleKeyboardDragUp(oldIndex) {
        const newArray = this.moveUpOne(oldIndex, this.questions);
        this.handleQuestionOrderChange({ newArray });
      },
      handleQuestionCheckboxChange(questionItem, value, $event) {
        $event.stopPropagation();
        if (value) {
          this.$emit('selectQuestions', [questionItem]);
        } else {
          this.$emit('deselectQuestions', [questionItem]);
        }
      },
      handleSelectAll(value) {
        if (value) {
          this.$emit(
            'selectQuestions',
            this.selectableQuestions.map(question => question.item),
          );
        } else {
          this.$emit(
            'deselectQuestions',
            this.selectableQuestions.map(question => question.item),
          );
        }
      },
    },
  };

</script>


<style lang="scss" scoped>

  .questions-accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 8px;

    .select-all-box {
      margin-top: 0;
      margin-bottom: 0;

      // Vertical centering here into the KCheckbox
      /deep/ & label {
        line-height: 28px;
      }
    }

    .trailing-actions {
      display: flex;
      align-items: center;
    }
  }

  .accordion-item-checkbox {
    margin-left: 0.5em;
  }

</style>
