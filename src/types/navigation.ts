import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type NavigationParamList = {
  home: undefined
  arrival: { id: string }
  departure: undefined
}

export type NavigationProps = NativeStackScreenProps<NavigationParamList, any>
export type ArrivalNavigationProps = NativeStackScreenProps<
  NavigationParamList,
  'arrival'
>
