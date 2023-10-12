import { NavigationParamList } from 'src/types/navigation'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationParamList {}
  }
}
