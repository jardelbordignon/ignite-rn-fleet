import Realm from 'realm'
import { createRealmContext } from '@realm/react'

import { Historic } from './schemas'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const syncConfiguration: Partial<Realm.SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
}

export const { RealmProvider, useObject, useQuery, useRealm } = createRealmContext({
  schema: [Historic],
})
