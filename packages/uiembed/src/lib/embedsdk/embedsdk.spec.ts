import EmbedSDK from './embedsdk'

describe('EmbedSDK', () => {
  it('init() is defined', () => {
    expect(EmbedSDK.init).toBeDefined()
  })

  it('cleanup() is defined', () => {
    expect(EmbedSDK.cleanup).toBeDefined()
  })
});
