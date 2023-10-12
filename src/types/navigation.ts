import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type NavigationParamList = {
  home: undefined
  departure: undefined
}

export type NavigationProps = NativeStackScreenProps<NavigationParamList, any>
