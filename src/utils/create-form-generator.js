/*
Sample form schema:
{
  username: { type: text, validation: validationFunc, props: {}, ...reduxFormFieldProps },
  password: { type: date, validation: validationFunc, props: {}, ...reduxFormFieldProps }
}

We should extend this schema as needed to take advantage of all the redux-form features.
Docs URL: http://redux-form.com/6.8.0/docs/api/Field.md/
*/
import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, formValues, isInvalid, submit } from 'redux-form'

import { objMap } from './functional'
import { camelToTitleCase } from './string'

// Validation Helpers
const validatorNamer = name => v =>
  typeof v('', {}) === 'function' ? v(name) : v

const combineValidators = validators => (...args) => {
  for (const validator of validators) {
    const error = validator(...args)
    if (error) return error
  }
  return undefined
}

const resolveValidate = (name, validate) => {
  const namer = validatorNamer(name)
  return combineValidators(validate.map(namer))
}

// Conditional Rendering Helpers
const visibleIf = (Component, valueKey) => {
  const isNegated = valueKey[0] === '!'
  const key = isNegated ? valueKey.slice(1) : valueKey

  const VisibleIf = ({ [key]: value, ...rest }) =>
    (isNegated ? !value : value) ? <Component {...rest} /> : null

  VisibleIf.propTypes = {
    // State
    [key]: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ])
  }

  VisibleIf.defaultProps = {
    // State
    [key]: false
  }

  return formValues(key)(VisibleIf)
}
const validateIf = (validate, valueKey) => (val, allVals, ...rest) => {
  const isNegated = valueKey[0] === '!'
  const key = isNegated ? valueKey.slice(1) : valueKey
  return (isNegated ? !allVals[key] : allVals[key])
    ? validate(val, allVals, ...rest)
    : undefined
}

/**
 * Generate fields for a `redux-form` from a schema.
 * @param {{UIKit: object, store: object}} - An object with a map of field types to react components and the redux store.
 * @param {string} formName - The name of the form.
 * @param {object} schema  - The schema to use.
 * @returns {object} - An array of field react elements.
 */
function createFields({ UIKit, store }, formName, schema) {
  return objMap(schema, (rawField, fieldKey) => {
    const name = camelToTitleCase(fieldKey)
    const field = {
      ...rawField,
      validate: rawField.validate
        ? resolveValidate(name, rawField.validate)
        : null,
      props: {
        ...rawField.props,
        placeholder: rawField.props ? rawField.props.placeholder : name
      }
    }
    let Component = UIKit[field.type]

    // Conditional rendering
    if (field.visibleIf) {
      Component = visibleIf(Component, field.visibleIf)
      field.validate =
        field.validate && validateIf(field.validate, field.visibleIf)
    }

    // Access form values
    if (field.formValues) Component = formValues(field.formValues)(Component)

    return (
      <Field
        key={`${formName}-${fieldKey}`}
        name={fieldKey}
        component={Component}
        validate={field.validate}
        props={{ style: { flex: 1 }, ...field.props }}
        {...field.reduxFormFieldProps}
      />
    )
  })
}

/**
 * Generate a redux form from a schema.
 * @param {object} UIKitAndStore - An object with a map of field types to react components and the redux store.
 * @param {string} formName - The name of the form.
 * @param {object} schema  - The schema to use.
 * @param {object} reduxFormOptions - Optional options object for `redux-form`.
 * @returns {object} - The generate form react element.
 */
function form(UIKitAndStore, formName, schema, reduxFormOptions) {
  const fields = createFields(UIKitAndStore, formName, schema)
  const Form = ({ containerClassName, className, disabled }) => (
    <form className={containerClassName}>
      <fieldset className="Form-fieldset" disabled={disabled}>
        <div
          className={className}
          style={{ display: 'flex', flexFlow: 'row wrap' }}
        >
          {fields}
        </div>
      </fieldset>
    </form>
  )

  Form.propTypes = {
    // Modifiers
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool
  }

  Form.defaultProps = {
    // Modifiers
    containerClassName: '',
    className: '',
    disabled: false
  }

  return {
    Form: reduxForm({ form: formName, ...reduxFormOptions })(Form),
    isInvalid: isInvalid(formName),
    submit: () => submit(formName)
  }
}

// T O D O: wizard form and form partials

/**
 * Creates a form generator function that uses the passed in UIKit to render fields.
 * @export default createFormGenerator
 * @param {object} UIKit - A map of field types to react components.
 * @param {object} store - The redux store.
 * @returns {function} - A form generator function.
 */
export default function createFormGenerator(UIKit, store) {
  return (...args) => form({ UIKit, store }, ...args)
}
