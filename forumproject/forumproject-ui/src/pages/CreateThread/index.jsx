import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';
import PropTypes from 'prop-types';

import { Input, FormGroup, Label, FormError, ContentWrapper } from 'layout';
import { createThread as createThread_ } from 'redux/actions';
import { titleValidator, subjectValidator } from 'utils/validators';
import { SubmitButton, Button, FormGroupButtons } from './style';

class CreateThread extends React.Component {
  handleCreateThread = async (values) => {
    const { createThread, match } = this.props;
    const category = Number(match.params.categoryId);
    const formValues = { ...values };
    const data = {
      title: formValues.title || '',
      subject: formValues.subject || '',
      category,
    };
    await createThread(data);

    const { threadsByCategory } = this.props;
    const { errors } = threadsByCategory;
    if (errors) return errors;
    return null;
  };

  handleCancel = () => {
    const { match, history } = this.props;
    const { categoryId } = match.params;
    history.push(`/categories/${categoryId}`);
  };

  render() {
    // a value to ensure form input id uniqueness
    const id = 'ct';
    return (
      <ContentWrapper>
        <h2>CreateThread</h2>

        <FinalForm onSubmit={this.handleCreateThread}>
          {({ handleSubmit, pristine, hasValidationErrors }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="title" validate={titleValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`title-${id}`}>Title:</Label>
                      <Input
                        {...input}
                        id={`title-${id}`}
                        placeholder="Add title"
                        maxLength="100"
                      />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <Field name="subject" validate={subjectValidator}>
                  {({ input, meta: { touched, error, submitError } }) => (
                    <FormGroup>
                      <Label htmlFor={`subject-${id}`}>Subject:</Label>
                      <textarea
                        {...input}
                        id={`subject-${id}`}
                        rows="3"
                        placeholder="Add subject"
                        maxLength="2000"
                      />
                      <FormError>{touched && (error || submitError)}</FormError>
                    </FormGroup>
                  )}
                </Field>
                <FormGroupButtons>
                  <SubmitButton
                    type="submit"
                    value="Create Thread"
                    color="greenOutline"
                    disabled={pristine || hasValidationErrors}
                  />
                  <Button onClick={this.handleCancel}>Cancel</Button>
                </FormGroupButtons>
              </div>
            </form>
          )}
        </FinalForm>
      </ContentWrapper>
    );
  }
}

CreateThread.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  threadsByCategory: PropTypes.shape({
    errors: PropTypes.shape({}),
  }).isRequired,
  createThread: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  threadsByCategory: state.threadsByCategory,
});

export default connect(mapStateToProps, { createThread: createThread_ })(
  CreateThread
);
