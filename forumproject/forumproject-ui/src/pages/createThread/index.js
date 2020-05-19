import React from 'react';
import { connect } from 'react-redux';
import { Field, Form as FinalForm } from 'react-final-form';

import { SubmitButton, Button, FormGroupButtons } from './style.js';
import {
  Input,
  FormGroup,
  Label,
  FormError,
  FormWrapper,
} from '../../components/styledForms';
import { ContainerDiv } from '../../components/styledDivs';
import { createThread } from '../../redux/actions';
import {
  required,
  minLength,
  maxLength,
  composeValidators,
} from '../../utils/validators';

class CreateThread extends React.Component {
  handleCreateThread = async (values) => {
    const category = Number(this.props.match.params.categoryId);
    const data = {
      title: values.title || '',
      subject: values.subject || '',
      category,
    };
    await this.props.createThread(data);

    const { errors } = this.props.threadsByCategory;
    if (errors) return errors;
  };

  handleCancel = () => {
    const { categoryId } = this.props.match.params;
    this.props.history.push(`/categories/${categoryId}`);
  };

  render() {
    const titleValidator = composeValidators(
      required,
      minLength(3),
      maxLength(100)
    );
    const subjectValidator = composeValidators(
      required,
      minLength(10),
      maxLength(2000)
    );

    return (
      <ContainerDiv>
        <h2>CreateThread</h2>

        <FinalForm onSubmit={this.handleCreateThread}>
          {({ handleSubmit, pristine, hasValidationErrors }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                <FormGroup>
                  <Label htmlFor="title">Title:</Label>
                  <Field name="title" validate={titleValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <Input
                          {...input}
                          placeholder="Add title"
                          maxLength="100"
                        />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="subject">Subject:</Label>
                  <Field name="subject" validate={subjectValidator}>
                    {({ input, meta: { touched, error, submitError } }) => (
                      <>
                        <textarea
                          {...input}
                          rows="3"
                          placeholder="Add subject"
                          maxLength="2000"
                        />
                        <FormError>
                          {touched && (error || submitError)}
                        </FormError>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroupButtons>
                  <SubmitButton
                    type="submit"
                    value="Create Thread"
                    color="greenOutline"
                    disabled={pristine || hasValidationErrors}
                  />
                  <Button onClick={this.handleCancel}>Cancel</Button>
                </FormGroupButtons>
              </FormWrapper>
            </form>
          )}
        </FinalForm>
      </ContainerDiv>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    threadsByCategory: state.threadsByCategory,
  };
};

export default connect(mapStateToProps, { createThread })(CreateThread);
