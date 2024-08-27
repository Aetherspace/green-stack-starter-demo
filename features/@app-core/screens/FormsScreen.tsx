import React from 'react'
import { View, Text, Image } from '../components/styled'
import BackButton from '../components/BackButton'
import { TextInput } from '../forms/TextInput.styled'

/* --- <FormsScreen/> ------------------------------------------------------------------------- */

const FormsScreen = () => (
  <View className="flex flex-1 justify-center items-center bg-slate-800">
    <BackButton backLink="/subpages/Universal%20Nav" />
    <View className="flex flex-col w-full max-w-[500px] px-4">
      <TextInput placeholder="Type something..." />
    </View>
  </View>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default FormsScreen
