# Form Management in Aetherspace

One of our overall goals is to enable the use of **Zod schemas as the ultimate source of truth for your app's datastructure, validation and types.**  

_We've extended this concept to include form management as well:_

```tsx
import { useFormState } from 'aetherspace/forms'

// Define a Zod schema for your form state (or use an existing one)
const formStateSchema = aetherSchema('SomeFormState', {
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8),
  twoFactorCode: z.number().length(2),
})

// Create a set of form state utils to use in your components
const formState = useFormState({
    stateSchema: formStateSchema,
    initialValues: {
        username: '',
        email: '',
        password: '',
        twoFactorCode: 0,
    },
})
```

## Typed form state values

`formState.values` is typed according to the Zod schema you provided as `stateSchema`

```tsx
formState.values.username // string
formState.values.email // string
formState.values.password // string
formState.values.twoFactorCode // number
```

Alternatively, you can use `formState.getValue('some-key')` to get a specific value from the form state. The 'some-key' argument is any key in the Zod schema you provided as `stateSchema` and the available keys will he hinted by your IDE.

```tsx
formState.getValue('username') // string
//                   ?^  Hinted keys: 'username' | 'email' | 'password' | 'twoFactorCode'
```

Updating the formState values can similarly be done in two ways:

```tsx
// Update a single value in the form state by its hinted key
formState.handleChange('username', 'codinsonn.dev') // OK
formState.handleChange('twoFactorCode', 'some-string') // ERROR
```

```tsx
// Update multiple values in the form state by passing an object with keys and values
formState.setValues({
    username: 'codinsonn.dev', // OK
    email: 'thorr@codinsonn.dev', // OK
    password: '*******', // OK
    twoFactorCode: 'some-string', // ERROR: Type 'string' is not assignable to type 'number'
})
```

Typescript and your IDE will help you out with the available keys and allowed values through hints and error markings if you try to set a value that doesn't match the Zod schema.

## Form validation & error messages

The form state also includes a `formState.errors` object that contains any errors that have been found in the form state when validating it against the Zod schema.

To do that, you can call `formState.validate()`

```tsx
// Validate the form state against the Zod schema
// true if the form state is valid
// false if the form state is invalid -> sets the formState.errors object
if (formState.validate()) {
    // Do something...
}
```

```tsx
console.log(formState.errors) // { username: ['Required'], email: ['Invalid email'] }
```

```tsx
formState.hasError('username') // true
formState.getErrors('email') // ['Invalid email']
```

You can specify custom error messages on each validation step when defining your Zod schema, and even translate them using libraries like `i18next`:

```tsx
const formStateSchema = aetherSchema('SomeFormState', {
  username: z
    .string()
    .nonempty(i18n._('We need a username to associate with your account')),
  email: z
    .string()
    .email(i18n._('Please provide a valid email adress')),
  password: z
    .string()
    .min(8, i18n._('Password must be at least 8 characters long')),
  twoFactorCode: z
    .number()
    .length(2, i18n._('Two factor code must be 2 digits')),
})
```

> When dealing with complex state with e.g. nested objects, keep in mind that calling `formState.validate()`, the error messages will be flattened and only contain the error messages for the top level keys.

To update or clear the error messages manually, you can use the `formState.updateErrors()` functions:

```tsx
// e.g. Clear all error messages by passing an empty object or empty arrays
formState.updateErrors({
    username: [],
    email: [],
    password: [],
    twoFactorCode: [],
})
```

## Integrating with React components

You can integrate your formState for specific fields with React components by using the `formState.getInputProps()` function. This will return an object with the `value` and `onChange` props that you can pass to your component, as well as a `hasError` flag + `onBlur()` and `onFocus()` handlers.

```tsx
<TextInput {...formState.getInputProps('username')} />
```

vs. manually assigning everything:

```tsx
<TextInput
    value={formState.values.username}
    onChangeText={(value) => formState.handleChange('username', value)}
    onBlur={() => formState.validate()}
    hasError={formState.hasError('username')}
/>
```

## Resetting the form state

You can reset the form state to its initial values by calling `formState.resetForm()`, e.g.

```tsx
<Button onTouch={() => formState.resetForm()}>
    <Text>Reset form<Text>
</Button>
```

## Other formState helpers

`formState.isValid` - boolean, true if the form state is valid, false if it's invalid

`formState.isUnsaved` - boolean, true if the form state has been changed from its initial values, false if it hasn't

`formState.isDefaultState` - boolean, true if the form state is equal to its initial values, false if it isn't

`formState.transformValues()` - function, will transform the form state values according to the optional `transformValues` function you provided to `useFormState()`, or simply apply the schema defaults if you didn't provide one. Handy for e.g. converting values to a different format before submitting them to an API.

## Generating a form state for new resolvers (Recommended)

When using the `aether-resolver` generator, you can generate a form state for your new resolver automatically:

```bash
>>> Modify "aetherspace-green-stack-starter" using custom generators

? Where would you like to add this resolver? # features/app-core
? What will you name the resolver function? # updateSomeData
? Optional description: What will this data resolver do? # ...
? What else would you like to generate related to this resolver? # GraphQL resolver, *Typed formState hook*
? Is this a GraphQL query or mutation? # mutation
? What API path would you like to use for REST? # /api/app-core/update-some-data
? What should the form hook be called? # useSomeDataForm <-- *This is the form state hook you'll use in your components

Running 'collect-resolvers' script from '@aetherspace' workspace...
Running 'link-routes' script from '@aetherspace' workspace...
Opening files in VSCode...

>>> Changes made:
  • /features/app-core/schemas/UpdateSomeDataDataBridge.ts (add)
  • /features/app-core/resolvers/updateSomeData.ts (add)
  • /features/app-core/forms/useSomeDataForm.ts (add) # <-- *Import path for your form state hook
```

## Learn more about Aetherspace:

- [Zod & Single Sources of Truth](/packages/@aetherspace/schemas/README.md)
- [GraphQL and Data-Fetching](/packages/@aetherspace/navigation/AetherPage/README.md)
- [Styling your form & screen components with Tailwind](/packages/@aetherspace/styles/README.md)
