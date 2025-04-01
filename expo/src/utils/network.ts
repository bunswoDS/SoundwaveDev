import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected && state.isInternetReachable;
};

export const monitorNetworkConnection = (
  onConnected: () => void,
  onDisconnected: () => void
) => {
  return NetInfo.addEventListener(state => {
    if (state.isConnected && state.isInternetReachable) {
      onConnected();
    } else {
      onDisconnected();
    }
  });
};
