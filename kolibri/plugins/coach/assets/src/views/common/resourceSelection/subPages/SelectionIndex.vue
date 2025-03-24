<template>

  <div>
    <QuizResourceSelectionHeader
      v-if="target === SelectionTarget.QUIZ && !settings.selectPracticeQuiz"
      class="mb-24"
      :settings="settings"
      @searchClick="onSearchClick"
    />
    <!-- flexDirection is set to row-reverse to align the search button to the right
         when we have no bookmarks and thus, no selectFromBookmarks$ string -->
    <div
      v-if="target === SelectionTarget.LESSON"
      class="subheader"
      :style="{
        flexDirection: bookmarksCount > 0 ? 'row' : 'row-reverse',
      }"
    >
      <div
        v-if="bookmarksCount > 0"
        class="side-panel-subtitle"
      >
        {{ selectFromBookmarks$() }}
      </div>
      <KButton
        icon="filter"
        :text="searchLabel$()"
        @click="onSearchClick"
      />
    </div>

    <div
      v-if="target === SelectionTarget.QUIZ && settings.selectPracticeQuiz"
      class="d-flex-end mb-24"
    >
      <KButton
        icon="filter"
        :text="searchLabel$()"
        @click="onSearchClick"
      />
    </div>

    <div
      v-if="bookmarksCount > 0"
      class="mb-24"
    >
      <KCardGrid
        layout="1-1-1"
        :layoutOverride="gridLayoutOverrides"
      >
        <KCard
          :title="bookmarksLabel$()"
          :headingLevel="3"
          orientation="horizontal"
          thumbnailDisplay="large"
          thumbnailAlign="right"
          :style="{
            height: '172px',
          }"
          :to="selectFromBookmarksLink"
        >
          <template #thumbnailPlaceholder>
            <KIcon
              :style="{
                fontSize: '48px',
              }"
              icon="bookmark"
              :color="$themePalette.grey.v_700"
            />
          </template>
          <template #belowTitle>
            <span>
              {{ numberOfBookmarks$({ count: bookmarksCount }) }}
            </span>
          </template>
        </KCard>
      </KCardGrid>
    </div>
    <div>
      <div class="subheader">
        <div class="side-panel-subtitle">
          {{ selectFromChannels$() }}
        </div>
      </div>
      <p
        v-if="channels.length === 0"
        class="mt-24"
      >
        {{ noAvailableResources$() }}
      </p>
      <KCardGrid
        layout="1-1-1"
        :layoutOverride="gridLayoutOverrides"
      >
        <AccessibleChannelCard
          v-for="channel of channels"
          :key="channel.id"
          :contentNode="channel"
          :to="selectFromChannelsLink(channel)"
          :headingLevel="3"
        />
      </KCardGrid>
    </div>
  </div>

</template>


<script>

  import { coreStrings } from 'kolibri/uiText/commonCoreStrings';
  import AccessibleChannelCard from 'kolibri-common/components/Cards/AccessibleChannelCard.vue';
  import { PageNames } from '../../../../constants';
  import { SelectionTarget } from '../contants';
  import QuizResourceSelectionHeader from '../QuizResourceSelectionHeader.vue';

  /**
   * @typedef {import('../../../../composables/useFetch').FetchObject} FetchObject
   */

  export default {
    name: 'SelectionIndex',
    components: {
      AccessibleChannelCard,
      QuizResourceSelectionHeader,
    },
    setup(props) {
      const { bookmarksFetch, channelsFetch } = props;
      const { count: bookmarksCount } = bookmarksFetch;

      const { data: channels } = channelsFetch;

      const {
        selectFromChannels$,
        noAvailableResources$,
        numberOfBookmarks$,
        bookmarksLabel$,
        selectFromBookmarks$,
        searchLabel$,
      } = coreStrings;

      props.setTitle(props.defaultTitle);
      props.setGoBack(null);

      return {
        bookmarksCount,
        channels,
        SelectionTarget,
        selectFromChannels$,
        noAvailableResources$,
        numberOfBookmarks$,
        bookmarksLabel$,
        selectFromBookmarks$,
        searchLabel$,
      };
    },
    props: {
      setTitle: {
        type: Function,
        default: () => {},
      },
      setGoBack: {
        type: Function,
        default: () => {},
      },
      defaultTitle: {
        type: String,
        required: true,
      },
      /**
       * Fetch object for fetching channels.
       * @type {FetchObject}
       */
      channelsFetch: {
        type: Object,
        required: true,
      },
      /**
       * Fetch object for fetching bookmarks.
       * @type {FetchObject}
       */
      bookmarksFetch: {
        type: Object,
        required: true,
      },
      /**
       * The target entity for the selection.
       * It can be either 'quiz' or 'lesson'.
       */
      target: {
        type: String,
        required: true,
      },
      /**
       * Selection settings used for quizzes.
       */
      settings: {
        type: Object,
        required: false,
        default: null,
      },
    },
    computed: {
      gridLayoutOverrides() {
        return [{ breakpoints: [0, 1, 2, 3, 4, 5, 6, 7], rowGap: '24px', cardsPerRow: 1 }];
      },
      selectFromBookmarksLink() {
        if (this.target === SelectionTarget.LESSON) {
          return {
            name: PageNames.LESSON_SELECT_RESOURCES_BOOKMARKS,
          };
        }
        return {
          name: PageNames.QUIZ_SELECT_RESOURCES_BOOKMARKS,
        };
      },
    },
    beforeRouteEnter(_, __, next) {
      next(vm => {
        // Whenever we land here, we want to fetch the bookmarks again
        // in case the user has added or removed some within the side panel
        vm.bookmarksFetch.fetchData();
      });
    },
    methods: {
      selectFromChannelsLink(channel) {
        if (this.target === SelectionTarget.LESSON) {
          return {
            name: PageNames.LESSON_SELECT_RESOURCES_TOPIC_TREE,
            query: { topicId: channel.id },
          };
        }
        return {
          name: PageNames.QUIZ_SELECT_RESOURCES_TOPIC_TREE,
          query: { topicId: channel.id },
        };
      },
      onSearchClick() {
        this.$router.push({
          name:
            this.target === SelectionTarget.LESSON
              ? PageNames.LESSON_SELECT_RESOURCES_SEARCH
              : PageNames.QUIZ_SELECT_RESOURCES_SEARCH,
        });
      },
    },
  };

</script>


<style scoped>

  .mt-24 {
    margin-top: 24px;
  }

  .side-panel-subtitle {
    font-size: 16px;
    font-weight: 600;
  }

  .subheader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .d-flex-end {
    display: flex;
    justify-content: flex-end;
  }

  .mb-24 {
    margin-bottom: 24px;
  }

</style>
