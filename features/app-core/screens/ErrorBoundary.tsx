/* eslint-disable react-native-a11y/has-valid-accessibility-descriptors */
import { H1 } from 'aetherspace/html-elements'
import { Pressable, Text, View } from 'aetherspace/primitives'
import React from 'react'

/* --- Types ----------------------------------------------------------------------------------- */

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

/* --- <ErrorBoundary/> ------------------------------------------------------------------------ */

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props)
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(/*error*/) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View tw="w-full h-full min-h-full min-w-full items-center justify-center">
          <H1 tw="mb-4">Hmm, something went wrong</H1>
          <Pressable
            role="button"
            tw="p-4 bg-secondary rounded-md text-primary"
            onPress={() => this.setState({ hasError: false })}
          >
            <Text>Try again?</Text>
          </Pressable>
        </View>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

/* --- Exports --------------------------------------------------------------------------------- */

export default ErrorBoundary
