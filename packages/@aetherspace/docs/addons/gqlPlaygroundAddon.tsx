import { createElement } from 'react'
import { addons, types } from '@storybook/addons'

addons.register('/graphql', () => {
  addons.add('graphql-playground/tab', {
    type: types.TAB,
    title: 'GraphQL',
    route: ({ storyId }) => `/graphql/${storyId}`,
    match: ({ viewMode }) => viewMode === 'graphql',
    render: () => {
      if (process.env.NODE_ENV !== 'development') {
        return createElement('div', {}, process.env.NODE_ENV)
      }
      return createElement('iframe', {
        style: { width: '100%', height: '100%' },
        src: 'http://localhost:3000/api/graphql',
      })
    },
  })
})
