import * as paragraph from '../../node_modules/@wordpress/block-library/build/paragraph';
import * as image from '../../node_modules/@wordpress/block-library/build/image';
import * as heading from '../../node_modules/@wordpress/block-library/build/heading';
import * as quote from '../../node_modules/@wordpress/block-library/build/quote';
import * as gallery from '../../node_modules/@wordpress/block-library/build/gallery';
import * as archives from '../../node_modules/@wordpress/block-library/build/archives';
import * as audio from '../../node_modules/@wordpress/block-library/build/audio';
import * as buttons from '../../node_modules/@wordpress/block-library/build/buttons';
import * as button from '../../node_modules/@wordpress/block-library/build/button';
import * as calendar from '../../node_modules/@wordpress/block-library/build/calendar';
import * as categories from '../../node_modules/@wordpress/block-library/build/categories';
import * as code from '../../node_modules/@wordpress/block-library/build/code';
import * as embed from '../../node_modules/@wordpress/block-library/build/embed';
import * as file from '../../node_modules/@wordpress/block-library/build/file';
import * as html from '../../node_modules/@wordpress/block-library/build/html';
import * as mediaText from '../../node_modules/@wordpress/block-library/build/media-text';
import * as navigationLink from '../../node_modules/@wordpress/block-library/build/navigation-link';
import * as latestComments from '../../node_modules/@wordpress/block-library/build/latest-comments';
import * as latestPosts from '../../node_modules/@wordpress/block-library/build/latest-posts';
import * as list from '../../node_modules/@wordpress/block-library/build/list';
import * as missing from '../../node_modules/@wordpress/block-library/build/missing';
import * as more from '../../node_modules/@wordpress/block-library/build/more';
import * as nextpage from '../../node_modules/@wordpress/block-library/build/nextpage';
import * as preformatted from '../../node_modules/@wordpress/block-library/build/preformatted';
import * as reusableBlock from '../../node_modules/@wordpress/block-library/build/block';
import * as rss from '../../node_modules/@wordpress/block-library/build/rss';
import * as search from '../../node_modules/@wordpress/block-library/build/search';
import * as group from '../../node_modules/@wordpress/block-library/build/group';
import * as shortcode from '../../node_modules/@wordpress/block-library/build/shortcode';
import * as spacer from '../../node_modules/@wordpress/block-library/build/spacer';
import * as subhead from '../../node_modules/@wordpress/block-library/build/subhead';
import * as textColumns from '../../node_modules/@wordpress/block-library/build/text-columns';
import * as verse from '../../node_modules/@wordpress/block-library/build/verse';
import * as video from '../../node_modules/@wordpress/block-library/build/video';
import * as tagCloud from '../../node_modules/@wordpress/block-library/build/tag-cloud';

const parseBlock = (block: {settings: Record<string, unknown>; name: string; metadata: Record<string, unknown>}): BlockSettings => {
  const { settings, name, metadata } = block;

  // eslint-disable-next-line
  // @ts-ignore
  return { name, ...settings, attributes: metadata?.attributes || {} };
};

export const getCoreBlocks = (): BlockSettings[] => [
  // Common blocks are grouped at the top to prioritize their display
  // in various contexts — like the inserter and auto-complete components.
  paragraph,
  image,
  heading,
  gallery,
  list,
  quote,

  // Register all remaining core blocks.
  shortcode,
  archives,
  audio,
  button,
  buttons,
  calendar,
  categories,
  code,
  embed,
  ...embed.common,
  ...embed.others,
  file,
  group,
  html,
  mediaText,
  latestComments,
  latestPosts,
  missing,
  more,
  navigationLink,
  nextpage,
  preformatted,
  rss,
  search,
  reusableBlock,
  spacer,
  subhead,
  tagCloud,
  textColumns,
  verse,
  video,
].map((block: {settings: Record<string, unknown>; name: string; metadata: Record<string, unknown>}) => parseBlock(block));
