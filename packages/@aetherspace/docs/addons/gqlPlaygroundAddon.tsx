import { createElement } from 'react'
import { addons, types } from '@storybook/addons'

/* --- GraphQL Storybook Plugin ---------------------------------------------------------------- */

addons.register('/graphql', () => {
  addons.add('graphql-playground/tab', {
    type: types.TAB,
    title: 'GraphQL',
    route: ({ storyId }) => `/graphql/${storyId}`,
    match: ({ viewMode }) => viewMode === 'graphql',
    render: () => {
      let graphqlUrl = 'http://localhost:3000/api/graphql'
      const isDev = process.env.NODE_ENV === 'development'
      if (!isDev) graphqlUrl = `${process.env.STORYBOOK_BACKEND_URL}/api/graphql`
      return createElement('iframe', {
        style: { width: '100%', height: '100%' },
        src: graphqlUrl,
      })
    },
  })
})
