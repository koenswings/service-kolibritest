<template>

  <div>
    <ContentArea
      :header="questionLabel(selectedQuestionIndex)"
      :selectedQuestion="selectedQuestion"
      :content="currentContentNode"
      :isExercise="isExercise"
    />

    <SlotTruncator
      v-if="description"
      :maxHeight="75"
      :showViewMore="true"
    >
      <!-- eslint-disable vue/no-v-html -->
      <p
        dir="auto"
        v-html="description"
      ></p>
      <!-- eslint-enable -->
    </SlotTruncator>

    <HeaderTable class="license-detail-style">
      <HeaderTableRow :keyText="coreString('suggestedTime')">
        <template #value>
          {{
            currentContentNode.duration
              ? getTime(currentContentNode.duration)
              : notAvailableLabel$()
          }}
        </template>
      </HeaderTableRow>

      <HeaderTableRow :keyText="licenseDataHeader$()">
        <template #value>
          {{ licenseName }}
        </template>
      </HeaderTableRow>

      <HeaderTableRow :keyText="copyrightHolderDataHeader$()">
        <template #value>
          {{ currentContentNode.license_owner }}
        </template>
      </HeaderTableRow>
    </HeaderTable>
  </div>

</template>


<script>

  import commonCoreStrings from 'kolibri/uiText/commonCoreStrings';
  import { searchAndFilterStrings } from 'kolibri-common/strings/searchAndFilterStrings';
  import { licenseLongName } from 'kolibri/uiText/licenses';
  import markdownIt from 'markdown-it';
  import SlotTruncator from 'kolibri-common/components/SlotTruncator';
  import ContentArea from '../../../../lessons/LessonSelectionContentPreviewPage/LessonContentPreview/ContentArea.vue';
  import HeaderTable from '../../../HeaderTable/index.vue';
  import HeaderTableRow from '../../../HeaderTable/HeaderTableRow.vue';

  export default {
    name: 'PreviewContent',
    components: {
      ContentArea,
      HeaderTable,
      HeaderTableRow,
      SlotTruncator,
    },
    mixins: [commonCoreStrings],
    setup() {
      const { copyrightHolderDataHeader$, licenseDataHeader$, notAvailableLabel$, minutes$ } =
        searchAndFilterStrings;

      return {
        licenseDataHeader$,
        copyrightHolderDataHeader$,
        notAvailableLabel$,
        minutes$,
      };
    },
    props: {
      currentContentNode: {
        type: Object,
        required: true,
      },
      questions: {
        type: Array,
        required: false,
        default: () => [],
      },
      isExercise: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        selectedQuestionIndex: 0,
      };
    },
    computed: {
      selectedQuestion() {
        if (this.isExercise) {
          return this.questions[this.selectedQuestionIndex];
        }
        return '';
      },
      licenseName() {
        return licenseLongName(this.currentContentNode.license_name);
      },
      description() {
        if (this.currentContentNode && this.currentContentNode.description) {
          const md = new markdownIt('zero', { breaks: true });
          return md.render(this.currentContentNode.description);
        }

        return undefined;
      },
    },
    methods: {
      questionLabel(questionIndex) {
        if (!this.isExercise) {
          return '';
        }
        const questionNumber = questionIndex + 1;
        return this.coreString('questionNumberLabel', { questionNumber });
      },
      getTime(seconds) {
        return this.minutes$({ value: Math.floor(seconds / 60) });
      },
    },
  };

</script>


<style lang="scss" scoped>

  .license-detail-style {
    margin-top: 10px;
  }

  /deep/ .content-renderer {
    position: relative;
    max-height: 500px;
  }

</style>
