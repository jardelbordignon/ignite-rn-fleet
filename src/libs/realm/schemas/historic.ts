import { Realm } from '@realm/react'
import type { ObjectSchema } from 'realm'

import type { CoordsSchemaProps } from './coords'

type GenerateProps = {
  user_id: string
  description: string
  license_plate: string
  coords: CoordsSchemaProps
}

export class Historic extends Realm.Object<Historic> {
  _id!: object
  user_id!: string
  license_plate!: string
  description!: string
  coords!: CoordsSchemaProps
  status!: string
  created_at!: Date
  updated_at!: Date

  static generate({ coords, user_id, description, license_plate }: GenerateProps) {
    const at = new Date()

    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      coords,
      description,
      license_plate,
      status: 'departure',
      created_at: at,
      updated_at: at,
    }
  }

  static schema: ObjectSchema = {
    name: 'Historic',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      coords: {
        type: 'list',
        objectType: 'Coords',
      },
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
