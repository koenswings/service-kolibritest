<template>

  <KCard
    :to="to"
    :orientation="windowBreakpoint === 0 ? 'vertical' : 'horizontal'"
    thumbnailDisplay="small"
    thumbnailAlign="right"
    :thumbnailSrc="contentNode.thumbnail"
    :title="contentNode.name"
    :headingLevel="headingLevel"
  >
    <template #thumbnailPlaceholder>
      <div>
        <ContentIcon
          kind="channel"
          class="type-icon"
          :color="$themeTokens.annotation"
        />
      </div>
    </template>
    <template #belowTitle>
      <div>
        <p style="margin-top: 0">
          <KTextTruncator
            :text="coachString('numberOfResources', { value: contentNode.total_resource_count })"
            :maxLines="1"
          />
        </p>
        <p>
          <KTextTruncator
            :text="contentNode.description"
            :maxLines="3"
          />
        </p>
        <MetadataChips :tags="getChannelTags()" />
      </div>
    </template>
  </KCard>

</template>


<script>

  import ContentIcon from 'kolibri-common/components/labels/ContentIcon';
  import useKResponsiveWindow from 'kolibri-design-system/lib/composables/useKResponsiveWindow';
  import MetadataChips from 'kolibri-common/components/MetadataChips';
  import { useCoachMetadataTags } from 'kolibri-common/composables/useCoachMetadataTags';
  import commonCoach from './../../../../kolibri/plugins/coach/assets/src/views/common';

  export default {
    name: 'AccessibleChannelCard',
    components: {
      ContentIcon,
      MetadataChips,
    },
    mixins: [commonCoach],
    setup(props) {
      const { windowBreakpoint } = useKResponsiveWindow();

      const { getChannelTags } = useCoachMetadataTags(props.contentNode);
      return {
        getChannelTags,
        windowBreakpoint,
      };
    },
    props: {
      to: {
        type: Object,
        required: true,
      },
      headingLevel: {
        type: Number,
        required: false,
        default: 2,
      },
      contentNode: {
        type: Object,
        required: true,
      },
    },
  };

</script>


<style scoped>

  .type-icon {
    right: 10px;
    font-size: 3em;
  }

</style>
