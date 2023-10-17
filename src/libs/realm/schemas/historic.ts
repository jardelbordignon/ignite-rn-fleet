import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

type GenerateProps = {
  user_id: string
  description: string
  license_plate: string
}

export class Historic extends Realm.Object<Historic> {
  _id!: object
  user_id!: string
  license_plate!: string
  description!: string
  status!: string
  created_at!: Date
  updated_at!: Date

  static generate({ user_id, description, license_plate }: GenerateProps) {
    const at = new Date()

    return {
      _id: new Realm.BSON.UUID(),
      user_id,
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
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
