import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  const gestureHandler = jest.requireActual('react-native-gesture-handler');
  return {
    ...gestureHandler,
    GestureHandlerRootView: ({ children }) => <>{children}</>,
    GestureDetector: ({ children }) => <>{children}</>,
    gestureHandlerRootHOC: jest.fn().mockImplementation((Component) => (props) => <Component {...props} />),
    Directions: {},
  };
});
