/*
Sample form schema:
{
  username: { type: text, validation: validationFunc, props: {}, ...reduxFormFieldProps },
  password: { type: date, validation: validationFunc, props: {}, ...reduxFormFieldProps }
}

We should extend this schema as needed to take advantage of all the redux-form features.
Docs URL: http://redux-form.com/6.8.0/docs/api/Field.md/
*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  reduxForm,
  Field,
  formValues,
  isInvalid,
  submit,
  destroy
} from 'redux-form'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

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
 * @returns {array} - An array of field react elements.
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
 * @returns {object} - The form react element.
 */
function form(UIKitAndStore, formName, schema, reduxFormOptions) {
  const fields = createFields(UIKitAndStore, formName, schema)
  const Form = ({ formClassName, fieldsClassName, disabled }) => (
    <form className={formClassName}>
      <fieldset className="Form-fieldset" disabled={disabled}>
        <div
          className={fieldsClassName}
          style={{ display: 'flex', flexFlow: 'row wrap' }}
        >
          {fields}
        </div>
      </fieldset>
    </form>
  )

  Form.propTypes = {
    // Modifiers
    formClassName: PropTypes.string,
    fieldsClassName: PropTypes.string,
    disabled: PropTypes.bool
  }

  Form.defaultProps = {
    // Modifiers
    formClassName: '',
    fieldsClassName: '',
    disabled: false
  }

  return {
    Form: reduxForm({ form: formName, ...reduxFormOptions })(Form),
    isInvalid: isInvalid(formName),
    submit: () => submit(formName)
  }
}

/**
 * Generate a redux wizard form from a schema.
 * @param {object} UIKitAndStore - An object with a map of field types to react components and the redux store.
 * @param {string} formName - The name of the form.
 * @param {object} schema  - The schema to use.
 * @param {object} reduxFormOptions - Optional options object for `redux-form`.
 * @returns {object} - The form react element.
 */
function wizardForm(UIKitAndStore, formName, schema, reduxFormOptions) {
  const pages = objMap(schema, pageSchema =>
    form(UIKitAndStore, formName, pageSchema, {
      ...reduxFormOptions,
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true
    })
  )
  const lastPageIndex = pages.length - 1

  class WizardForm extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        page: 0
      }

      const { backHandlerRef } = this.props
      if (backHandlerRef) backHandlerRef(this.previousPage)

      this.onPageChange()
    }

    componentWillUnmount() {
      const { destroy } = this.props
      destroy()
    }

    onPageChange = formData => {
      const { onPageChange } = this.props
      const { page } = this.state
      if (onPageChange)
        onPageChange(
          {
            currentPage: page,
            hasPrevPage: page !== 0,
            hasNextPage: page !== pages.length - 1,
            totalPages: pages.length
          },
          formData
        )
    }

    previousPage = () => {
      const { page } = this.state
      const nextPage = page > 0 ? page - 1 : page
      this.setState(
        {
          page: nextPage
        },
        this.onPageChange
      )
    }

    nextPage = formData => {
      const { page } = this.state
      const nextPage = page < lastPageIndex ? page + 1 : page
      this.setState(
        {
          page: nextPage
        },
        () => this.onPageChange(formData)
      )
    }

    handleSubmit = formData => {
      const { onSubmit } = this.props
      onSubmit(formData)
    }

    render() {
      const { className, disabled } = this.props
      const { page } = this.state
      const key = page
      const { Form } = pages[key]
      return (
        <div className={className}>
          <ReactCSSTransitionGroup
            transitionName="carousel"
            transitionEnterTimeout={800}
            transitionLeave={false}
          >
            <div key={key} style={{ position: 'relative' }}>
              <Form
                disabled={disabled}
                onSubmit={
                  page === lastPageIndex ? this.handleSubmit : this.nextPage
                }
              />
            </div>
          </ReactCSSTransitionGroup>
        </div>
      )
    }
  }

  WizardForm.propTypes = {
    // Redux Form
    onSubmit: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,

    // Handlers
    onPageChange: PropTypes.func,

    // Handler Refs
    backHandlerRef: PropTypes.func,

    // Modifiers
    className: PropTypes.string,
    disabled: PropTypes.bool
  }

  WizardForm.defaultProps = {
    // Handlers
    onPageChange: null,

    // Get Handlers
    backHandlerRef: null,

    // Modifiers
    className: '',
    disabled: false
  }

  return {
    Form: connect(null, { destroy: () => destroy(formName) })(WizardForm),
    isInvalid: isInvalid(formName),
    submit: () => submit(formName)
  }
}

/**
 * Creates a form generator function that uses the passed in UIKit to render fields.
 * @export default createFormGenerator
 * @param {object} UIKit - A map of field types to react components.
 * @param {object} store - The redux store.
 * @returns {object} - An object with a form generator function and a wizard form generator function.
 */
export default function createFormGenerator(UIKit, store) {
  return {
    form: (...args) => form({ UIKit, store }, ...args),
    wizardForm: (...args) => wizardForm({ UIKit, store }, ...args)
  }
}
