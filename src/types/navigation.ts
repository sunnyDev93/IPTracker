import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Dashboard: any;
  Profile: any;
  MarketData: any;
};

export type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
