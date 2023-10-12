import { createRealmContext } from '@realm/react'
import { Historic } from './schemas'

export const { RealmProvider, useObject, useQuery, useRealm } = createRealmContext({
  schema: [Historic],
})
