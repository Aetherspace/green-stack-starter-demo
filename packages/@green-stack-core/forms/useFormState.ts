import { useState, useMemo, useEffect } from 'react'
import { z } from '@green-stack/schemas'
import { isEmpty } from '../utils/commonUtils'

/** --- useFormState() ------------------------------------------------------------------------- */
/** -i- Returns a set of form management tools to handle form state, including validation, errors and even the required props to add to inputs */
export const useFormState = <
    S extends z.ZodRawShape,
    T extends z.infer<z.ZodObject<S>> = z.infer<z.ZodObject<S>>,
    K extends keyof z.infer<z.ZodObject<S>> = keyof z.infer<z.ZodObject<S>>,
    E extends Partial<Record<K, string[]>> = Partial<Record<K, string[]>>
>(options: {
    schema: z.ZodObject<S>,
    initialValues?: Partial<T>,
    validateOnBlur?: boolean,
    validateOnChange?: boolean,
}) => {
    // Props
    const { schema, validateOnBlur, validateOnChange } = options
    const initialValues = (options.initialValues || {}) as T

    // Initial
    const initialState = useMemo(() => {
        return schema.applyDefaults(initialValues) as T
    }, [schema, options.initialValues])

    // State
    const [values, setValues] = useState<T>(initialState)
    const [errors, updateErrors] = useState<E>({} as E)

    // -- Memos --

    const isDefaultState = useMemo(() => {
        return JSON.stringify(values) === JSON.stringify(initialState)
    }, [values, initialState])

    // -- Validation --

    const validate = (showErrors = true) => {
        const validationResult = schema.safeParse(values)
        const validationError = validationResult.error
        if (showErrors && validationError) {
            const zodIssues = validationError.issues.flat()
            const fieldErrors = zodIssues.reduce((acc, issue) => {
                const key = issue.path.join('.') as K
                const message = issue.message
                return { ...acc, [key]: [...(acc[key] || []), message] }
            }, {} as E)
            updateErrors(fieldErrors)
        }
        return validationResult.success
    }

    // -- Handlers --

    const handleChange = <KEY extends K>(key: KEY, value: T[KEY]) => {
        setValues((prev) => ({ ...prev, [key]: value }))
    }

    const resetForm = () => {
        setValues(initialState)
        updateErrors({} as E)
    }

    const clearForm = () => {
        setValues(schema.applyDefaults({}) as T)
        updateErrors({} as E)
    }

    const clearErrors = () => updateErrors({} as E)

    // -- Methods --

    const hasError = <KEY extends K>(key: KEY) => !isEmpty(errors[key])

    const getValue = <KEY extends K>(key: KEY) => values[key]

    const getErrors = <KEY extends K>(key: KEY) => errors[key] || ([] as string[])

    const getChangeHandler = <KEY extends K, VAL extends T[KEY]>(key: KEY) => {
        return (value: VAL) => handleChange(key, value)
    }

    // -- Connectors --

    const getInputProps = <KEY extends K>(key: KEY, ) => ({
        value: values[key],
        onChange: getChangeHandler(key),
        onBlur: () => validateOnBlur && validate(),
        onFocus: () => validateOnBlur && validate(),
        hasError: hasError(key),
    })

    const getTextInputProps = <KEY extends K>(key: KEY) => {
        const { onChange, ...inputProps } = getInputProps(key)
        return {
            ...inputProps,
            onChangeText: onChange,
        }
    }

    // -- Flags --

    const isValid = validate(false)
    const isUnsaved = !isDefaultState

    // -- Effects --

    useEffect(() => {
        if (validateOnChange) validate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(values)])

    // -- Return --

    return {
        /** -i- The current values of the form */
        values,
        /** -i- Sets the entire form state to the provided values */
        setValues,
        /** -i- Gets the form value for the provided field key */
        getValue,
        /** -i- Sets the form value for the provided field key */
        setValue: handleChange,
        /** -i- Sets the form value for the provided field key */
        handleChange,
        /** -i- Gets the change handler for the provided field key */
        getChangeHandler,
        /** -i- Validates the form state, sets errors if not, and returns whether it is valid or not */
        validate,
        /** -i- Whether the form is valid */
        isValid,
        /** -i- Whether the form is unsaved */
        isUnsaved,
        /** -i- Whether the form is in its default state */
        isDefaultState,
        /** -i- The current errors of the form */
        errors,
        /** -i- Sets the errors for the form */
        updateErrors,
        /** -i- Gets the errors for the provided field key */
        getErrors,
        /** -i- Whether the provided field key has an error */
        hasError,
        /** -i- Clears all errors until validated again */
        clearErrors,
        /** -i- Clears the form values, applying only the schema defaults */
        clearForm,
        /** -i- Resets the form to its original state using initialValues & schema defaults */
        resetForm,
        /** -i- The props to add to an input to manage its state */
        getInputProps,
        /** -i- The props to add to a text input to manage its state, uses `onTextChange` instead */
        getTextInputProps,
    }
}
