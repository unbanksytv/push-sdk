const Constants = {
  API_ENDPOINTS: {
    SPAM_FEEDS_API: 'feeds/get_spam_feeds',
    FEEDS_API: 'feeds/get_feeds',
    CHANNELS_SEARCH_API: 'channels/search',
    GET_SUBSCRIBERS_API: 'channels/get_subscribers',
    SUBSCRIBE_OFFCHAIN_API: 'channels/subscribe_offchain',
    UNSUBSCRIBE_OFFCHAIN_API: 'channels/unsubscribe_offchain'
  },
  PAGINATION: {
    INITIAL_PAGE: 1,
    PAGE_SIZE: 10
  },
  DEFAULT_CHAIN_ID: 42,
  DEV_CHAIN_ID: 99999
};

export default Constants;