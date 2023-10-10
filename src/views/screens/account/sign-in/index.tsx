import { Alert } from 'react-native'
import { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import backgroundImg from 'src/assets/background.png'

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'
import { Button } from 'src/views/components'
import * as S from './styles'

WebBrowser.maybeCompleteAuthSession()

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const [request, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  })

  const handleGoogleSignIn = () => {
    setIsAuthenticating(true)

    googleSignIn()
      .then(res => {
        if (res.type !== 'success') {
          setIsAuthenticating(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.authentication?.idToken
      if (token) {
        fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
          .then(res => res.json())
          .then(console.log)
          .catch(console.log)
      } else {
        Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google.')
        setIsAuthenticating(false)
      }
    }
  }, [response])

  return (
    <S.root source={backgroundImg}>
      <S.title>Ignite Fleet</S.title>
      <S.slogan>Gestão de uso de veículos</S.slogan>
      <Button
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
        submitting={isAuthenticating}
      />
    </S.root>
  )
}
