export const addIPFSGateway = (mediaUrl: string, customGateway?: string) => {
  try {
    if (mediaUrl.startsWith('ipfs'))
      return mediaUrl.replace(
        /^ipfs?:\/\//,
        `https://${customGateway ? customGateway : 'ipfs.io'}/ipfs/`
      )
  } catch (err) {
    return mediaUrl
  }
}
