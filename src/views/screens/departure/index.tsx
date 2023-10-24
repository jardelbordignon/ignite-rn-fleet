import { useUser } from '@realm/react'
import { Car } from 'phosphor-react-native'
import { useRef, useState, useEffect } from 'react'
import { TextInput, ScrollView, Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import {
  useForegroundPermissions,
  requestBackgroundPermissionsAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationObjectCoords,
} from 'expo-location'
import type { LocationGeocodedAddress, LocationSubscription } from 'expo-location'

import { useRealm } from 'src/libs/realm'
import { Historic } from 'src/libs/realm/schemas'
import { startLocationTask } from 'src/tasks/background-location'
import type { NavigationProps } from 'src/types/navigation'
import { getAddressLocation, licensePlateValidate } from 'src/utils'
import {
  Button,
  Header,
  LicensePlateInput,
  Loading,
  LocationInfo,
  Map,
  TextAreaInput,
} from 'src/views/components'

import * as S from './styles'

export function Departure({ navigation }: NavigationProps) {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<LocationGeocodedAddress>()
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords>()
  const [submitting, setSubmitting] = useState(false)
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')
  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  const user = useUser()
  const realm = useRealm()

  const [locationForegroundPermissions, requestLocationForegroundPermissions] =
    useForegroundPermissions()

  const locationPermissionDenied = !locationForegroundPermissions?.granted

  const handleDepartureRegister = async () => {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Toast.show({
          type: 'info',
          text1: 'Informe corretamente a placa do veículo',
        })
      }

      if (!description.trim().length) {
        descriptionRef.current?.focus()
        return Toast.show({
          type: 'info',
          text1: 'Informe a finalidade da utilização do veículo',
        })
      }

      setSubmitting(true)

      const backgroundPermissions = await requestBackgroundPermissionsAsync()

      if (!backgroundPermissions.granted) {
        setSubmitting(false)

        return Alert.alert(
          'Localização',
          'É necessario permitir que o app tenha acesso a localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo".'
        )
      }

      await startLocationTask()

      if (!currentCoords) {
        return Alert.alert('Erro', 'Não foi possível obter a localização atual')
      }

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            description,
            license_plate: licensePlate,
            coords: [
              {
                latitude: currentCoords.latitude,
                longitude: currentCoords.longitude,
                timestamp: new Date().getTime(),
              },
            ],
          })
        )
      })

      Toast.show({
        type: 'success',
        text1: 'Saída do veículo registrada com sucesso!',
      })

      navigation.goBack()
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Não foi possível registrar a saída do veículo',
      })
      setSubmitting(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermissions()
  }, [])

  useEffect(() => {
    if (locationPermissionDenied) return

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      location => {
        setCurrentCoords(location.coords)

        getAddressLocation(location.coords)
          .then(address => {
            setCurrentAddress(address)
          })
          .catch(error => {
            console.log('error', error)
          })
          .finally(() => {
            setIsLoadingLocation(false)
          })
      }
    ).then(response => {
      subscription = response
    })

    return () => subscription?.remove()
  }, [locationForegroundPermissions])

  if (locationPermissionDenied) {
    return (
      <S.root>
        <Header title="Saída" />
        <S.message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          utilizar essa funcionalidade. Por favor, acesse as configurações do seu
          dispositivo para conceder essa permissão ao aplicativo.
        </S.message>
      </S.root>
    )
  }

  if (isLoadingLocation) return <Loading />

  return (
    <S.root>
      <Header title="Saída" />

      <S.keyboardAwareScrollView>
        <ScrollView>
          {currentCoords && <Map coords={[currentCoords]} />}
          <S.content>
            {currentAddress && (
              <LocationInfo
                icon={Car}
                label="Localização atual"
                description={`${currentAddress.name}`}
              />
            )}

            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA-1B34"
              value={licensePlate}
              onChangeText={setLicensePlate}
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              blurOnSubmit
              value={description}
              onChangeText={setDescription}
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
            />

            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              submitting={submitting}
            />
          </S.content>
        </ScrollView>
      </S.keyboardAwareScrollView>
    </S.root>
  )
}
